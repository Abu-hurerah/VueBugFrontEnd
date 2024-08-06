<template>
  <div>
    <UserTypeLeftScreen></UserTypeLeftScreen>

    <SignUpForm></SignUpForm>

  </div>
</template>

<script>
import SignUpForm from "@/components/SignUpForm.vue";
import UserTypeLeftScreen from "@/components/UserTypeLeftScreen.vue";
import UserServices from "@/services/User/User";

export default {
  components: {
    UserTypeLeftScreen,
    SignUpForm,
  },
  data() {
    return {
      name: "",
      userType: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async CreateUser() {
      try {
        const response = await UserServices.createUser(
          this.name,
          this.userType,
          this.email,
          this.password
        );
        console.log("Signup success:", response.data);
        this.$router.push({ name: "home" });
        this.error = "";
      } catch (error) {
        console.error("Failed to sign up:", error);
        // Handle specific error message from API or default to a generic server error message
        this.error =
          error.response && error.response.data.message
            ? error.response.data.message
            : "Signup failed due to server error.";
      }
    },
    goToLogin() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    "Helvetica Neue", sans-serif;
}

#lefty {
  position: absolute;
  right: 65%;
  top: 0;
  width: 35%;
  height: 100%;
}

.login-form {
  flex: 1;
  padding: 100px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-top: 15%;
  position: relative;
  z-index: 1;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group img.icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}

#create {
  color: #0056b3;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
}
</style>
