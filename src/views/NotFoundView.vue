<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>We're sorry, the page you requested could not be found. Please go back to the homepage or contact us.</p>
      <router-link to="/">Go Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  