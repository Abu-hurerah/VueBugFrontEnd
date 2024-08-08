<template>
  <div>
    <Toast position="top-right" />
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
        <AddBugModal v-if="userdata === 'QA'" :projectId="projectId" >Add New Bugs</AddBugModal>
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
        <div v-if="userdata === 'MANAGER'">
          <Button class="custom-button" icon="pi pi-plus" @click="openModal">
            Assign
          </Button>
          <Dialog
            header="Assign QA/DEV"
            :visible.sync="displayModal"
            :containerStyle="{ width: '50vw' }"
            :modal="true"
            class="custom-dialog"
          >
            <div class="dialog-content">
              <label for="Assign QA" class="form-label">Assign QA</label>
              <Dropdown
                v-model="qa_assign"
                :options="userOptionsQA"
                optionLabel="name"
                optionValue="id"
                placeholder="Select a user"
                class="p-inputtext-lg select-box"
              />
              <label for="Assign QA" class="form-label">Assign DEV</label>
              <Dropdown
                v-model="dev_assign"
                :options="userOptionsDev"
                optionLabel="name"
                optionValue="id"
                placeholder="Select a user"
                class="p-inputtext-lg select-box"
              />
              <Button
                class="assign-submit"
                icon="pi pi-plus"
                @click="submitAssignment"
              >
                Submit
              </Button>
            </div>
          </Dialog>
        </div>
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
import Dialog from "primevue/dialog/Dialog";
import Dropdown from "primevue/dropdown/Dropdown";
import UserServices from "@/services/User/User";
import Toast from "primevue/toast";
import ProjectServices from "@/services/Project/Project";
export default {
  components: {
    Button,
    AddBugModal,
    Divider,
    Dialog,
    Dropdown,
    Toast,
  },
  props: {
    projectId: String,
  },
  created() {
    this.userdata = Utilities.getuserInfo();
    this.userdata = this.userdata.toUpperCase();
    this.fetchUsers();
    console.log("Project ID INside Header: ",this.projectId)
  },
  data() {
    return {
      searchTerm: "",
      sortBy: null,
      userdata: null,
      displayModal: false,
      users: [],
      userOptionsQA: [],
      userOptionsDev: [],
      qa_assign: "",
      dev_assign: "",
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const QA_API_RESPONSE = await UserServices.getAllUsers("QA");
        this.users = QA_API_RESPONSE;
        this.userOptionsQA = this.users.map((user) => ({
          id: user.user_id,
          name: user.name, // Add name to display in the dropdown
        }));

        const DEV_API_RESPONSE = await UserServices.getAllUsers("developer");
        this.users = DEV_API_RESPONSE;
        this.userOptionsDev = this.users.map((user) => ({
          id: user.user_id,
          name: user.name,
        }));
      } catch (error) {
        console.error("Error fetching users:", error);
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error fetching users.",
          life: 2000,
        });
      }
    },
    emitSearchTerm() {
      this.$emit("search-term", this.searchTerm);
    },
    openModal() {
      console.log("Open Modal");
      this.displayModal = true;
    },
    async submitAssignment() {
      if (!this.projectId) {
        console.error("Project ID is missing.");
        this.$toast.add({
          severity: "warn",
          summary: "Warning",
          detail: "Project ID is missing.",
          life: 1500,
        });
        return;
      }

      // Create an array to hold API requests
      const apiRequests = [];

      // Check if QA user is selected and create API request if true
      if (this.qa_assign) {
        const qaAssignmentData = {
          project_id: this.projectId,
          user_id: this.qa_assign,
        };
        console.log("API REQUEST PUSH ASSIGN")
        apiRequests.push(ProjectServices.AssignQA_Dev(qaAssignmentData));
      }

      // Check if DEV user is selected and create API request if true
      if (this.dev_assign) {
        const devAssignmentData = {
          project_id: this.projectId,
          user_id: this.dev_assign,
        };
        apiRequests.push(ProjectServices.AssignQA_Dev(devAssignmentData));
      }

      // Execute all API requests in parallel
      try {
        await Promise.all(apiRequests);
        console.log("Users assigned successfully");
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Users assigned successfully.",
          life: 1500,
        });
        this.displayModal = false; // Close the modal after successful submission
      } catch (error) {
        console.error("Error assigning users to project:", error);
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error assigning users to project.",
          life: 1500,
        });
      }
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
  color: #ffffff;
}

.right-section .p-button:hover {
  border-color: #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.custom-button {
  width: 100%;
  background-color: #d3c440;
  color: #111010;
  padding: 12px 20px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.custom-button:hover {
  background-color: #ced19c;
}

.pi {
  margin-right: 0.5em;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.select-box {
  width: 100%;
  padding: 10px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;
}
.Assign-dialog {
  background-color: #fff;
  font-family: "Arial", sans-serif;
  border-radius: 10px;
  padding: 30px;
  max-width: 700px;
  margin: auto;
}

.dialog-content {
  padding: 20px; /* Add padding if needed for spacing */
  display: flex;
  flex-direction: column;
  justify-content: space-around; /* This helps distribute space evenly */
  height: 80%;
}

.assign-submit {
  width: 20%;
  background-color: #d3c440;
  color: #111010;
  padding: 12px 20px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  margin-top: 10px;
}
label {
  padding-top: 20px;
}
</style>
