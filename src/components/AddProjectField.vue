<template>
  <div class="create-account">
    <form @submit.prevent="submitForm">
      <div class="form-content">
        <div class="form-left">
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
        </div>

        <div class="form-right">
          <div class="form-group image-upload">
            <label for="imageUpload" class="upload-label">
              <input
                type="file"
                id="imageUpload"
                @change="onFileChange"
                accept="image/*"
              />
              <span>Upload project photo</span>
            </label>
            <span v-if="errors.image" class="error">{{ errors.image }}</span>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Add</button>
        <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import ProjectServices from '@/services/Project/Project';
export default {
  data() {
    return {
      projectName: "",
      projectDesc: "",
      
      image: null,
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
            desc: this.projectDesc,
          };
          await ProjectServices.createProject(projectData);
          this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Project Created Successful!', life: 2000 });
          this.resetForm();
        } catch (error) {
          let errorMessage = 'Project Creation failed.';
          if (error.body.message) {
            errorMessage = error.body.message || errorMessage;
          }
          this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage,life: 2000 });
        }
      }
    },
    resetForm() {
      this.projectName = "";
      this.projectDesc = "";
      this.image = null;
      this.errors = {};
    },
  },
};
</script>

<style scoped>
.create-account {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: left;
}

hr {
  margin: 1.5rem 0;
  border: 0;
  height: 1px;
  background: #e0e0e0;
}

.form-content {
  display: flex;
  justify-content: space-between;
}

.form-left,
.form-right {
  width: 48%;
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
input[type="file"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
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

.form-actions {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.image-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  height: 100%;
}

.upload-label {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.upload-label span {
  font-size: 16px;
  color: #777;
}

input[type="file"] {
  display: none;
}
</style>
