<template>
  <div class="projects">
    <Navigationbar></Navigationbar>
    <ProjectHeaders
      @search-term="onSearchTerm"
      @sort-by="onSortBy"
    ></ProjectHeaders>
    <div v-if="errorMessage" class="no-projects-message">
      <p>{{ errorMessage }}</p>
    </div>
    <ProjectCards v-if="projects.length > 0" :projects="projects" />
    <Paginator
      v-if="projects.length > 0"
      :rows="perPage"
      :totalRecords="totalItemsCount"
      @page="onPageChange"
    ></Paginator>
  </div>
</template>

<script>
import Navigationbar from "@/components/NavigationCompbar.vue";
import ProjectCards from "@/components/ProjectCards.vue";
import ProjectHeaders from "@/components/ProjectHeaders.vue";
import ProjectServices from "../services/Project/Project";
import Paginator from "primevue/paginator/Paginator";
import urlParamsMixins from "@/helpers/urlParamsMixins";

export default {
  components: {
    ProjectCards,
    ProjectHeaders,
    Paginator,
    Navigationbar,
  },
  mixins: [urlParamsMixins],
  data() {
    return {
      projects: [],
      currentPage: 1,
      totalItemsCount: 0,
      perPage: 6,
      searchTerm: "",
      sortOrder: "",
      errorMessage: "No Projects", // Add an error message state
    };
  },
  // created() {
  //   this.fetchProjects();
  // },
  methods: {
    fetchListData() {
      const { page = 1, sort, search } = this.$route.query;
      this.currentPage = parseInt(page);  // Ensure currentPage is synced with URL
      this.sortOrder = sort;
      this.searchTerm = search;
      this.fetchProjects();
    },
    async fetchProjects() {
      try {
        let response;
        if (this.searchTerm) {
          response = await ProjectServices.getAllProjects(
            this.currentPage,
            this.perPage,
            this.sortOrder,
            this.searchTerm // Pass the search term
          );
        } else {
          response = await ProjectServices.getAllProjects(
            this.currentPage,
            this.perPage,
            this.sortOrder
          );
        }

        if (response.data.length > 0) {
          this.projects = response.data.map((project) => ({
            id: project.project_id,
            title: project.name,
            description: "This is the dummy description for " + project.name,
            manager_id: project.manager_id,
          }));
          this.totalItemsCount = response.totalItems;
          this.errorMessage = ""; // Clear error message if projects are found
          await this.appendTaskDataToProjects();
        } else {
          this.errorMessage = response.message || "No matching Project Found";
          this.projects = [];
          this.totalItemsCount = 0;
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        this.errorMessage = "Failed to fetch projects. Please try again.";
        this.projects = [];
      }
    },
    async appendTaskDataToProjects() {
      const projectsWithTasks = await Promise.all(this.projects.map(async project => {
        const taskData = await ProjectServices.Totaltaskbydone(project.id);
        return {
          ...project,
          totalTasks: taskData.totalBugs || 0,
          completedTasks: taskData.completedOrResolvedBugs || 0
        };
      }));
      this.projects = projectsWithTasks;
    },
    onSearchTerm(searchTerm) {
      this.searchTerm = searchTerm;
      this.updateUrlParams({ search: searchTerm || undefined, page: 1 }); // Remove search from URL if empty
      this.fetchProjects();
    },
    onSortBy(sortOrder) {
      this.sortOrder = sortOrder;
      this.updateUrlParams({ sort: sortOrder, page: 1 });
      this.fetchProjects();
    },
    onPageChange(event) {
      this.currentPage = event.page + 1; // Update current page
      this.updateUrlParams({ page: this.currentPage });
      this.fetchProjects();
    }
  },
};
</script>

<style scoped>
.projects {
  background-color: rgb(253, 252, 252);
}

.no-projects-message {
  text-align: center;
  font-size: 24px;
  color: #666;
  padding: 20px;
  margin-top: 20%;
}
</style>
