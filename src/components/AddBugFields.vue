<template>
  <div class="create-bug">
    <h2>Create New Bug</h2>
    <hr />
    <form @submit.prevent="submitForm">
      <!-- Project ID (hidden if not meant to be changed by users) -->
      <div class="form-group">
        <label for="title">Project ID</label>
        <input type="text" id="title" v-model="project_id" placeholder="Enter Project ID">
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div><div class="form-group">
        <label for="title">Reported By</label>
        <input type="text" id="title" v-model="reported_by" placeholder="Reported by">
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>
      <div class="form-group">
        <label for="title">Bug Title</label>
        <input type="text" id="title" v-model="title" placeholder="Enter bug title">
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>

      <div class="form-group">
        <label for="description">Bug Description</label>
        <textarea id="description" v-model="description" placeholder="Enter bug description"></textarea>
        <span v-if="errors.description" class="error">{{ errors.description }}</span>
      </div>

      <div class="form-group">
        <label for="deadline">Deadline</label>
        <input type="date" id="deadline" v-model="deadline">
        <span v-if="errors.deadline" class="error">{{ errors.deadline }}</span>
      </div>

      <div class="form-group">
        <label for="type">Bug Type</label>
        <select id="type" v-model="type">
          <option value="feature">Feature</option>
          <option value="bug">Bug</option>
        </select>
        <span v-if="errors.type" class="error">{{ errors.type }}</span>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="status">
          <option value="new">New</option>
          <option value="started">Started</option>
          <option value="completed">Completed</option>
          <option value="resolved">Resolved</option>
        </select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>
      </div>

      <div class="form-group">
        <label for="assignedTo">Assign To</label>
        <input type="number" id="assignedTo" v-model="assignedTo" placeholder="Enter assignee ID">
        <span v-if="errors.assignedTo" class="error">{{ errors.assignedTo }}</span>
      </div>

      <hr />
      <button type="submit" class="btn btn-primary">Create Bug</button>
    </form>
  </div>
</template>

<script>
import BugsServices from '@/services/bugs/bugs'; // Adjust this path to your service file

export default {
  data() {
    return {
      project_id: null, // Set this from a global state or prop
      reported_by: null, // Set this based on the logged-in user
      title: '',
      description: '',
      deadline: '',
      type: 'bug',
      status: 'new',
      assignedTo: '',
      errors: {},
    };
  },
  methods: {
    async submitForm() {
      if (this.validateForm()) {
        try {
          const newBug = {
            project_id: this.project_id,
            reported_by: this.reported_by,
            title: this.title,
            description: this.description,
            deadline: this.deadline,
            type: this.type,
            status: this.status,
            assignedTo: this.assignedTo,
          };
          await BugsServices.createBug(newBug);
          // Reset form
          Object.keys(newBug).forEach(key => this[key] = key in newBug ? '' : this[key]);
          alert('Bug created successfully!');
        } catch (error) {
          console.error('Error creating bug:', error);
          alert('Failed to create bug. Please try again.');
        }
      }
    },
    validateForm() {
      this.errors = {};
      // Add validation checks here and update errors object accordingly
      return Object.keys(this.errors).length === 0;
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
</style>

<style scoped>
.create-bug {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

h2 {
  color: #28527a;
  text-align: center;
}

hr {
  border: none;
  height: 1px;
  background-color: #dcdcdc;
  margin: 20px 0;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="number"],
input[type="date"],
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="date"]:focus,
textarea:focus,
select:focus {
  border-color: #28527a;
  outline: none;
}

.error {
  color: #d9534f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.btn {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #007bff;
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

textarea {
  height: 120px;
  resize: vertical;
}

select {
  background-color: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .create-bug {
    padding: 15px;
    margin: 20px;
  }
}

@media (max-width: 480px) {
  .btn {
    padding: 10px;
  }
}
</style>
