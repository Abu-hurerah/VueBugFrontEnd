<template lang="">
  <div>
    <Navigationbar></Navigationbar>
    <BugPageheader  @search-term="onSearchTerm" ></BugPageheader>
    <BugGridShow :projectId="projectId" :searchterm="onSearchTerm" ></BugGridShow>
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
      projectId: null,
      searchTerm: '',
    }
  },
  methods:{
    onSearchTerm(term) {
      this.searchTerm = term;
    }
  },
  created() {
    this.projectId = parseInt(this.$route.query.project_id);
    console.log("Bug View: ", this.projectId);
  }
}
</script>
