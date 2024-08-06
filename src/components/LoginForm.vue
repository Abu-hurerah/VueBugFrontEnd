<template>
  <div class="container">
    <div class="form-wrapper">
      <h2>Login</h2>
      <p>Please fill your information below</p>
      <InputValueField
        v-model="email"
        label="Email Address"
        type="email"
        iconClass="pi-envelope"
      />
      <span v-if="emailError" class="error-message">{{ emailError }}</span>
      <InputValueField
        v-model="password"
        label="Password"
        type="password"
        iconClass="pi-lock"
      />
      <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
      <Button @click="handleSubmit" class="custom-button">
        <span>Login</span>
        <!-- Icon using CSS class for alignment -->
        <i class="pi pi-arrow-right" style="margin-left: 5px;"></i>
      </Button>      <Divider />
      <p>Don't have an account <a href="/signup">Create Accoount</a>.</p>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import Divider from 'primevue/divider';
import InputValueField from "./InputValueField.vue";
import Validator from "@/helpers/Validators";
import UserServices from "@/services/User/User";
export default {
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: ""
    };
  },
  components: {
    InputValueField,
    Button,
    Divider
  },
  methods: {
    async handleSubmit() {
      if (this.validateInputs()) {
        try {
          const response = await UserServices.loginUser(
            this.email,
            this.password
          );
          this.successMessage = "Signup successful!";
          console.log(response)
          this.error = "";
          setTimeout(() => this.$router.push({ name: "Project" }), 2000);
        } catch (error) {
          this.error =
            error.response && error.response.data.message
            ? error.response.data.message
            : "Signup failed due to server error.";
        }
      }
    },
    validateInputs() {
      this.emailError = Validator.required(this.email) ? (Validator.email(this.email) ? "" : "Invalid email.") : "Email is required.";
      this.passwordError = Validator.required(this.password) ? "" : "Password is required.";
      return !(this.emailError || this.passwordError);
    },
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: right;
  min-height: 100vh;
  padding-right: 220px;
}

.form-wrapper {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: #fff;
}

h2 p {
  color: black;
  padding-bottom: 20px;
  font-family: inter;
  font-size: 20px;
  font-weight: bold;
}

Button {
  background-color: #2f67e0;
  width: 33%; 
  height: 70px;
  padding: 17px;
  border: none;
  border-radius: 10px; 
  text-align: left;
  font-family: inter;
  font-size: 20px;
  font-weight: bold;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
.custom-button {
  display: flex;
  align-items: left;
  justify-content: left;
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px; 
}

.custom-button i {
  font-size: 20px; 
  justify-content: right;
  align-items: right;

}

</style>
