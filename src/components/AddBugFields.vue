<template>
  <div class="create-bug">
    <Toast position="top-right" />

    <div class="form-header">
      <div class="form-group small-width">
        <label for="assignTo" class="form-label">Assign to</label>
        <Dropdown
          id="assignTo"
          v-model="assignedTo"
          :options="userOptions"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a user"
          class="p-inputtext-lg select-box"
        />
        <span v-if="errors.assignedTo" class="error">{{ errors.assignedTo }}</span>
      </div>
      <div class="form-group small-width">
        <label for="bugType" class="form-label">Type of Bug</label>
        <Dropdown
          id="bugType"
          v-model="type"
          :options="bugTypes"
          optionLabel="label"
          optionValue="value"
          placeholder="Select bug type"
          class="p-inputtext-lg select-box"
        />
      </div>
      <div class="form-group small-width">
        <label for="deadline" class="form-label">Add due date</label>
        <Calendar
          id="deadline"
          v-model="deadline"
          dateFormat="yy-mm-dd"
          class="p-inputtext-lg date-picker"
          showIcon
        />
        <span v-if="errors.deadline" class="error">{{ errors.deadline }}</span>
      </div>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-group full-width">
        <label for="title" class="form-label">Add title here</label>
        <InputText
          id="title"
          v-model="title"
          placeholder="Enter bug title"
          class="p-inputtext-lg title-input"
        />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>
      <div class="form-group full-width">
        <label for="description" class="form-label">Bug details</label>
        <Textarea
          id="description"
          v-model="description"
          placeholder="Enter bug description"
          rows="5"
          class="p-inputtext-lg description-input"
        />
        <span v-if="errors.description" class="error">{{ errors.description }}</span>
      </div>
      <div class="form-group file-upload full-width">
        <label for="fileUpload" class="form-label">Upload file</label>
        <input
          type="file"
          id="fileUpload"
          @change="onFileChange"
          class="file-input"
        />
        <span class="file-label">Drop any file here or <a href="#">browse</a></span>
      </div>
      <div class="form-actions">
        <Button
          type="submit"
          label="Add"
          class="p-button-primary p-button-lg btn"
        />
      </div>
    </form>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import BugsServices from "@/services/bugs/bugs";
import UserServices from "@/services/User/User";
import Toast from 'primevue/toast';

export default {
  components: {
    Dropdown,
    Calendar,
    InputText,
    Textarea,
    Button,
    Toast
  },
  data() {
    return {
      title: "",
      description: "",
      deadline: "",
      type: "bug",
      status: "new",
      assignedTo: "",
      errors: {},
      users: [],
      userOptions: [],
      bugTypes: [
        { label: "Bug", value: "bug" },
        { label: "Feature", value: "feature" }
      ],
    };
  },
  props: {
    projectId: String,
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await UserServices.getAllUsers("developer");
        this.users = response; 
        this.userOptions = this.users.map(user => ({
          id: user.user_id,
          name: user.name, 
        }));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async submitForm() {
      if (this.validateForm()) {
        try {
          const newBug = {
            project_id: this.projectId,
            title: this.title,
            description: this.description,
            deadline: this.deadline,
            type: this.type,
            status: this.status,
            assigned_to: this.assignedTo,
          };
          await BugsServices.createBug(newBug);
        } catch (error) {
          console.error("Error creating bug:", error);
        }
      }
    },
    validateForm() {
      this.errors = {};
      if (!this.title) {
        this.errors.title = 'Title is required.';
      }
      if (!this.description) {
        this.errors.description = 'Description is required.';
      }
      if (!this.assignedTo) {
        this.errors.assignedTo = 'Assignment is required.';
      }
      if (!this.deadline) {
        this.errors.deadline = 'Deadline is required.';
      }
      return Object.keys(this.errors).length === 0;
    },
    onFileChange(event) {
      event.target.files[0];
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.create-bug {
  background-color: #fff;
  font-family: "Arial", sans-serif;
  border-radius: 10px;
  padding: 30px;
  max-width: 700px;
  margin: auto;
}

.form-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group.small-width {
  width: 48%;
}

.form-group.full-width {
  width: 100%;
}

.form-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.select-box,
.date-picker,
.title-input,
.description-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.file-upload {
  text-align: center;
  border: 2px dashed #ccc;
  border-radius: 4px;
  padding: 20px;
  position: relative;
  cursor: pointer;
  margin-bottom: 20px;
}

.file-input {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.file-label {
  color: #007bff;
}

.file-label a {
  text-decoration: underline;
  color: #8ab0d8;
}

.form-actions {
  text-align: right;
}

.btn {
  padding: 10px 20px;
  background-color: #729ac5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.btn:active {
  background-color: #5c8fc5;
  transform: translateY(2px);
}

.error {
  color: #d9534f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .form-header {
    flex-direction: column;
  }

  .form-group.small-width,
  .form-group.full-width {
    width: 100%;
  }
}
.error {
  color: red;
  font-size: 0.875em;
}
.select-box, .date-picker, .title-input, .description-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
