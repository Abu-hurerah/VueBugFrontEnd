<template>
  <div>
    <Paginator :rows="rows" :totalRecords="totalItemsCount" @page="onPageChange"></Paginator>
  </div>
</template>

<script>
import Paginator from 'primevue/paginator';

export default {
  components: {
    Paginator,
  },
  props: {
    rows: Number,
    totalItemsCount: Number,
  },
  methods: {
    onPageChange(event) {
      this.$emit('page', event);
    }
  }
};
</script>
