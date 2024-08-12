<template>
  <div>
    <Dropdown class="dropdown"
      :options="Type"
      optionLabel="name"
      placeholder="Select Usertype"
      v-model="selectedType"
      @change="updateUserType"
    />
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
  components: {
    Dropdown,
  },
  props: {
    value: {
    
    }
  },
  data() {
    return {
      selectedType: this.value,
      Type: [
        { name: "Sign Out", code: "" },
        { name: "Developer", code: "Developer" },
        { name: "QA", code: "QA" },
      ],
    };
  },
  watch: {
    value(newValue) {
      this.selectedType = newValue;
    }
  },
  methods: {
    updateUserType() {
      this.$emit('update:userType', this.selectedType);
    }
  },
};
</script>

<style scoped>
.dropdown {
    display: flex;
    align-items: center;
    height: 70px;
    border-radius: 12px;
    border: 2px solid #3170c2;
    background-color: #f9f9f9;
    width: 102%;
    margin-bottom: 6px;  
    background-color: rgb(240, 235, 235);  
}
</style>
