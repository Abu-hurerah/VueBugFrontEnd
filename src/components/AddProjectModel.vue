<template>
    <div>
      <Button class="custom-button" label="Add New Project" icon="pi pi-plus" @click="openModal" />
      <Dialog header="Add New Project" :visible.sync="displayModal" :style="{ width: '50vw' }" modal>
        <AddProjectField @close="displayModal = false" />
      </Dialog>
    </div>
  </template>
  
  <script>
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import AddProjectField from './AddProjectField.vue';
  
  export default {
    components: {
      Dialog,
      AddProjectField,
      Button,
    },
    data() {
      return {
        displayModal: false,
      };
    },
    methods: {
      openModal() {
        this.displayModal = true;
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-button {
    background-color: #2a60d4; /* Blue shade similar to the button in the image */
    color: #fff; /* White text */
    padding: 12px 20px; /* Padding around text and icon */
    font-family: 'Inter', sans-serif; /* Font family */
    font-size: 16px; /* Text size */
    font-weight: bold; /* Bold text */
    border: none; /* No border */
    border-radius: 6px; /* Rounded corners */
    display: flex; /* Flexbox for alignment */
    align-items: center; /* Vertical center alignment */
    justify-content: center; /* Center alignment of content */
    gap: 10px; /* Space between icon and text */
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s; /* Smooth transition for hover effect */
  }
  
  .custom-button:hover {
    background-color: #829ab1; /* Darker shade of blue on hover */
  }
  </style>
  