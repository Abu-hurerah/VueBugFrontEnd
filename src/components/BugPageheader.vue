<template>
  <div>
    <!-- Header Section -->
    <div class="bg-white flex items-center justify-between px-10 custom-margin">
      <!-- Left Section -->
      <div class="left-section flex items-center space-x-3">
        <h1 class="text-4xl font-bold text-gray-800">All Bugs Listing</h1>
        <Button
          class="bg-red-200 text-red-700 text-sm px-3 py-1 rounded-full border border-red-300 hover:bg-red-300 shadow"
        >
          Bugs
        </Button>
      </div>

      <!-- Right Section -->
      <div class="right-section flex items-center space-x-4">
        <Button
          icon="pi pi-cog"
          class="p-button-rounded p-button-text bg-white border border-gray-300 hover:shadow-md rounded-md text-gray-500"
        />
        <Button
          icon="pi pi-ellipsis-h"
          class="p-button-rounded p-button-text bg-white border border-gray-300 hover:shadow-md rounded-md text-gray-500"
        />
        <AddBugModal v-if="userdata === 'QA'">Add New Bugs</AddBugModal>
      </div>
    </div>

    <!-- Divider -->
    <div>
      <Divider></Divider>
    </div>

    <!-- Content Section -->
    <div class="content-section px-10">
      <!-- Search Section -->
      <div class="left-section-search">
        <div class="search-container">
          <i class="pi pi-search"></i>
          <input
            type="text"
            class="search-input"
            placeholder="Search for Bugs here"
            v-model="searchTerm"
            @input="emitSearchTerm"
          />
        </div>
      </div>

      <!-- Middle Section -->
      <div class="middle-section">
        <div class="heading-item">
          <h3 class="heading">Subtasks</h3>
          <i class="pi pi-angle-down icon"></i>
        </div>
        <div class="heading-item">
          <h3 class="heading">Assignees</h3>
          <i class="pi pi-users icon"></i>
        </div>
        <div class="heading-item">
          <h3 class="heading">Status</h3>
          <i class="pi pi-info-circle icon"></i>
        </div>
      </div>

      <!-- Right Section for Icons -->
      <div class="right-section flex items-center space-x-4">
        
        <Button
          class="p-button-rounded p-button-text bg-white border border-gray-300 hover:shadow-md rounded-md text-gray-500"
          icon="pi pi-bars"
        />
        <Button
          class="p-button-rounded p-button-text bg-white border border-gray-300 hover:shadow-md rounded-md text-gray-500"
          icon="pi pi-sort-alt"
        />
        
      </div>
    </div>

    <!-- Divider -->
    <div>
      <Divider></Divider>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import AddBugModal from "./AddBugModal.vue";
import Divider from "primevue/divider/Divider";
import Utilities from "@/helpers/Utilites";
export default {
  components: {
    Button,
    AddBugModal,
    Divider,
  },

  created() {
    this.userdata = Utilities.getuserInfo();
    this.userdata = this.userdata.toUpperCase();
  },
  data() {
    return {
      searchTerm: " ",
      sortBy: null,
      userdata: null,
    };
  },
  methods: {
    emitSearchTerm() {
      this.$emit("search-term", this.searchTerm);
    },
  },
};
</script>

<style scoped>
.content-section {
  display: flex;
}
.bg-white {
  background-color: #fff;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.space-x-3 {
  gap: 1rem;
}

.space-x-4 {
  gap: 1.5rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.font-bold {
  font-weight: bold;
}

.text-gray-800 {
  color: #333;
}

.bg-red-200 {
  background-color: #fed7d7;
}

.text-red-700 {
  color: #c53030;
}

.px-10 {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.rounded-full {
  border-radius: 9999px;
}

.border {
  border: 1px solid #ddd;
}

.hover\:bg-red-300:hover {
  background-color: #fbd38d;
}

.shadow {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.custom-margin {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%;
}

.p-button-rounded.p-button-text {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
}

.p-button-text:hover {
  border-color: #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #75a0d8;
  padding: 8px 15px;
  border-radius: 6px;
}

.search-container .pi-search {
  color: #cbd5e0;
  margin-right: 8px;
}

.search-input {
  flex-grow: 1;
  border: none;
  background: transparent;
  color: #4a5568;
  font-size: 16px;
  height: 36px;
  padding: 4px 6px;
}

.search-input::placeholder {
  color: #a0aec0;
}

.left-section-search {
  display: flex;
  align-items: start;
  margin-left: 5%;
  padding-right: 15%;
}

.middle-section {
  display: flex;
  justify-content: center; /* Center items horizontally */
  gap: 70px; /* Space between each heading item */
}
.heading-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  color: #555;
}

.pi {
  font-size: 1.2em;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 25%;
}

.right-section .p-button {
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
}

.right-section .p-button:hover {
  border-color: #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
