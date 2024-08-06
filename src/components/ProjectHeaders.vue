<template>
  <div
    class="header-section bg-white flex justify-between px-20 py-10 items-center"
  >
    <div class="left-section flex flex-col items-start">
      <h1 class="text-xl text-gray-800 font-bold">Projects</h1>
      <p class="text-gray-600">Hi DeVisnext, welcome to ManageBug</p>
    </div>
    <div class="middle-section flex items-center">
      <div class="search-container">
        <i class="pi pi-search"></i>
        <input
          type="text"
          class="search-input"
          placeholder="Search for Projects here"
          v-model="searchTerm"
          @input="emitSearchTerm"
        />
      </div>
      <AddProjectModel v-if="userdata === 'MANAGER'" class="ml-4"
        >Add New Project</AddProjectModel
      >
    </div>
    <div class="right-section flex items-center space-x-4">
      <div class="dropdown-container">
        <Dropdown
          v-model="sortBy"
          :options="sortOptions"
          placeholder="Sort by"
          class="custom-dropdown"
          optionLabel="label"
          optionValue="value"
          @change="onSortChange"
        />
      </div>
      <div class="dropdown-container">
        <Dropdown
          v-model="projectFilter"
          :options="filterOptions"
          placeholder="My Project"
          class="custom-dropdown"
          optionLabel="label"
          optionValue="value"
          @change="onFilterChange"
        />
      </div>
      <div class="refresh-container" @click="refreshProjects">
        <a class="logo">
          <img src="@/assets/Images/refresh.png" alt="ManageBug" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import AddProjectModel from "./AddProjectModel.vue";
import Utilities from "@/helpers/Utilites";

export default {
  components: {
    Dropdown,
    AddProjectModel,
  },
  data() {
    return {
      searchTerm: "",
      sortBy: null,
      projectFilter: null,
      sortOptions: [
        { label: "Date", value: "date" },
        { label: "A-Z", value: "ASC" },
        { label: "Z-A", value: "DESC" },
      ],
      filterOptions: [
        { label: "All Projects", value: "all" },
        { label: "My Projects", value: "mine" },
      ],
      userdata: "",
    };
  },
  created(){
      this.userdata = Utilities.getuserInfo()
      this.userdata = this.userdata.toUpperCase()
  },
  methods: {
    emitSearchTerm() {
      this.$emit("search-term", this.searchTerm);
    },
    onSortChange() {
      this.$emit("sort-by", this.sortBy);
    },
    onFilterChange() {
      console.log("Filtering projects:", this.projectFilter);
    },
    refreshProjects() {
      console.log("Projects refreshed");
      this.fetchProjects(); // Call fetchProjects to refresh the data
    }
  },
};
</script>

<style scoped>
.header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 20px;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 8px;
}

.left-section {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.left-section h1 {
  margin: 0 0 4px 0;
  font-size: 1.25rem;
  font-weight: bold;
  color: #343a40;
}

.left-section p {
  color: #6c757d;
  margin: 0;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #75a0d8;
  padding: 8px 15px;
}

.search-container .pi-search {
  color: #cbd5e0;
  margin-right: 8px;
}

.search-input {
  flex-grow: 1;
  border: none;
  outline: blue;
  background: transparent;
  color: #4a5568;
  font-size: 16px;
  height: 36px;
  padding: 4px 6px;
}

.search-input::placeholder {
  color: #a0aec0;
}

.right-section .dropdown-container {
  margin-left: 10px;
}

.right-section .refresh-container {
  margin-left: 15px;
  background-color: rgb(46, 116, 207);
  padding: 10px;
  border-radius: 5px;
}

.text-gray-600 {
  color: #6c757d;
}

.text-gray-800 {
  color: #343a40;
}
</style>
