export default {
    methods: {
      updateUrlParams(params) {
        this.$router.push({
          name: this.$route.name,
          query: { ...this.$route.query, ...params }
        }).catch(err => {console.log(err)});
      },
      fetchListData() {
        console.log("Fetching data with params:", this.$route.query);
      }
    },
    watch: {
      '$route.query': {
        immediate: true,
        handler() {
          this.fetchListData();
        }
      }
    },
    created() {
      this.fetchListData();
    }
  };
  