<template>
  <div>
    <h2>JOIN US</h2>
    <p>To begin this journey, tell us what type of account you’d be opening.</p>
    <UserTypeButton
      iconClass="pi-cog"
      title="Manager"
      description="Signup as a manager to manage the tasks and bugs"
      @click="navigateToSignup"
    ></UserTypeButton>

    <UserTypeButton
      iconClass="pi-users"
      title="Developer"
      description="Signup as a Developer to Resolve the bugs"
      @click="navigateToSignup"
    ></UserTypeButton>

    <UserTypeButton
      iconClass="pi-check-circle"
      title="QA"
      description="Signup as a QA to Test the Code and Resolve it"
      @click="navigateToSignup"
    ></UserTypeButton>
  </div>
</template>

<script>
import UserTypeButton from "../components/UserTypeButton.vue";

export default {
  components: {
    UserTypeButton,
  },
  methods: {
    navigateToSignup(userType) {
      this.$router.push({ name: "signup", query: { userType } });
    },
  },
};
</script>

<style scoped>
div{
    width: 550px; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: rgb(254, 255, 255);
    outline-color: #007DFA;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.04);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 220px;
}
h2 p{
    text-align: left;
    padding-bottom: 120px;
    font-family: 'Inter', sans-serif; 
    font-weight: 600; 
    font-size: 32px;
    letter-spacing: -0.02em; 

}
</style>
