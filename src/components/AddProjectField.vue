<template>
  <div class="create-account">
    <h2>ADD NEW PROJECT</h2>
    <hr />
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="projectName">Project Name</label>
        <input
          type="text"
          id="projectName"
          v-model="projectName"
          placeholder="Enter project name"
        />
        <span v-if="errors.projectName" class="error">{{ errors.projectName }}</span>
      </div>

      <div class="form-group">
        <label for="projectDesc">Project Description</label>
        <input
          type="text"
          id="projectDesc"
          v-model="projectDesc"
          placeholder="Enter project description"
        />
        <span v-if="errors.projectDesc" class="error">{{ errors.projectDesc }}</span>
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <input
          type="file"
          id="image"
          @change="onFileChange"
          accept="image/*"
        />
        <span v-if="errors.image" class="error">{{ errors.image }}</span>
      </div>

      <div class="form-group">
        <label for="assignedQa">Assign QA</label>
        <input
          type="number"
          id="assignedQa"
          v-model="assignedQa"
          placeholder="Enter QA ID"
        />
        <span v-if="errors.assignedQa" class="error">{{ errors.assignedQa }}</span>
      </div>

      <div class="form-group">
        <label for="assignedDev">Assign Developer</label>
        <input
          type="number"
          id="assignedDev"
          v-model="assignedDev"
          placeholder="Enter Developer ID"
        />
        <span v-if="errors.assignedDev" class="error">{{ errors.assignedDev }}</span>
      </div>

      <hr />

      <button type="submit" class="btn btn-primary">Create Project</button>
    </form>
  </div>
</template>

<script>
import ProjectServices from "@/services/Project/Project";

export default {
  data() {
    return {
      projectName: "",
      projectDesc: "",
      image: null,
      assignedQa: "",
      assignedDev: "",
      errors: {},
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.projectName) {
        this.errors.projectName = "Project Name is required.";
      } else if (this.projectName.length > 255) {
        this.errors.projectName = "Project Name must be less than 255 characters.";
      }

      if (!this.projectDesc) {
        this.errors.projectDesc = "Project Description is required.";
      }

      if (!this.assignedQa) {
        this.errors.assignedQa = "Assign QA is required.";
      }

      if (!this.assignedDev) {
        this.errors.assignedDev = "Assign Developer is required.";
      }

      return Object.keys(this.errors).length === 0;
    },
    onFileChange(event) {
      this.image = event.target.files[0];
    },
    async submitForm() {
      if (this.validateForm()) {
        try {
          const projectData = {
            name: this.projectName,
            description: this.projectDesc,
            dev_ids: [parseInt(this.assignedDev)], 
            qa_ids: [parseInt(this.assignedQa)], 
          };
          console.log("Before Calling the API", projectData);
          const response = await ProjectServices.createProject(projectData);
          console.log("Project created successfully:", response);
          alert("Project Created Successfully");

          this.resetForm();
        } catch (error) {
          console.error("Failed to create project:", error);
        }
      }
    },
    resetForm() {
      this.projectName = "";
      this.projectDesc = "";
      this.image = null;
      this.assignedQa = "";
      this.assignedDev = "";
      this.errors = {};
    },
  },
};
</script>

<style scoped>
.create-account {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

hr {
  margin: 1.5rem 0;
  border: 0;
  height: 1px;
  background: #e0e0e0;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

input[type="text"],
input[type="number"],
input[type="file"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="file"]:focus {
  border-color: #007bff;
  outline: none;
}

.error {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
}

.btn {
  padding: 0.75rem 1.5rem;
  color: #fff;
  background-color: #8eabca;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn:active {
  transform: scale(0.98);
}

input[type="text"]::placeholder,
input[type="number"]::placeholder,
input[type="file"]::placeholder {
  color: #aaa;
}

.create-account {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
