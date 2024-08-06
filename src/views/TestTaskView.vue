<template>
  <div class="projects">
    <Navigationbar></Navigationbar>
    <ProjectHeaders
      @search-term="onSearchTerm"
      @sort-by="onSortBy"
    ></ProjectHeaders>
    <ProjectCards :projects="projects" />
    <Paginator
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

export default {
  components: {
    ProjectCards,
    ProjectHeaders,
    Paginator,
    Navigationbar,
  },
  data() {
    return {
      projects: [],
      currentPage: 1,
      totalItemsCount: 0,
      perPage: 6,
      searchTerm: "",
      sortOrder: "",
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        console.log("Fetching projects...");
        let response;
        if (this.searchTerm) {
          response = await ProjectServices.getProjectsByName(
            this.searchTerm,
          );
        } else {
          response = await ProjectServices.getAllProjects(
            this.currentPage,
            this.perPage,
            this.sortOrder
          );
        }
        if (response.data) {
          this.projects = response.data.map((project) => ({
            id: project.project_id,
            title: project.name,
            description: "This is the dummy description for " + project.name,
            manager_id: project.manager_id,
          }));
          this.totalItemsCount = response.totalItems;
          await this.appendTaskDataToProjects();
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
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
      console.log("Projects with tasks data:", this.projects);
    },
    onSearchTerm(searchTerm) {
      this.searchTerm = searchTerm;
      this.fetchProjects();
    },
    onSortBy(sortOrder) {
      this.sortOrder = sortOrder;
      this.fetchProjects();
    },
    onPageChange(event) {
      this.currentPage = event.page + 1; // Adjust page count (+1 if API is zero-indexed)
      this.fetchProjects(); // Fetch projects whenever page changes
    }
  },
};
</script>


<style scoped>
.projects {
  background-color: rgb(253, 252, 252);
}
</style>
