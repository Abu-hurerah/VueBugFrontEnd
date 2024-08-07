<template>
  <Button class="user-type-button" @click="handleClick">
    <i :class="['pi', iconClass]" style="font-size: 2rem; color: black"></i>
    <div class="content">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </Button>
</template>

<script>
import Button from "primevue/button";
export default {
  components: {
    Button,
  },
  name: "UserTypeButton",
  props: {
    iconClass: String,
    title: String,
    description: String,
  },
  methods: {
    handleClick() {
      this.$emit('click', this.title);
    }
  },
};
</script>
<style scoped>
.user-type-button {
    display: flex;
    width: 550px; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: rgb(254, 255, 255);
    outline-color: #007DFA;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.04);
}

.user-type-button:hover {
    background-color: rgb(54, 130, 155);
    outline-color: #007DFA;
}

.user-type-button::selection {
    background-color: blue;
    color: white; 
}

h2{
    color: black;
    text-align: left;
    padding-left: 10%;
}
p{
    color: darkgray;
    text-align: left;
    padding-left: 10%;
}

</style>