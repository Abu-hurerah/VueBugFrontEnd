<template>
  <div class="projects">
    <Navigationbar></Navigationbar>
    <BugPageheader @search-term="onSearchTerm" :projectId="projectId"></BugPageheader>
    <div v-if="errorMessage" class="no-projects-message">
      <p>{{ errorMessage }}</p>
    </div>
    <BugGridShow v-if="!errorMessage" :projectId="projectId" :searchterm="searchTerm"></BugGridShow>
  </div>
</template>

<script>
import BugGridShow from '@/components/BugGridShow.vue';
import BugPageheader from '@/components/BugPageheader.vue';
import Navigationbar from '@/components/NavigationCompbar.vue';

export default {
  components: {
    BugPageheader,
    BugGridShow,
    Navigationbar,
  },
  data() {
    return {
      searchTerm: "",
      errorMessage: ""
    };
  },
  props: {
    projectId: {
      type: String,
      required: true 
    }
  },
  methods: {
    onSearchTerm(searchTerm) {
      this.searchTerm = searchTerm;
      this.errorMessage = ""; 
    }
  },
  created() {
        console.log("Bug View: ", this.projectId);
  }
}
</script>

<style scoped>
.no-projects-message {
  text-align: center;
  font-size: 24px;
  color: #666;
  padding: 20px;
  margin-top: 20%;
}
</style>
