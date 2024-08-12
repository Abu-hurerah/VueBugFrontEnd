<template>
  <div class="container">
    <Toast position="top-right" />
    <div class="form-wrapper">
      <h2>Sign Up</h2>
      <p>Please fill your information below</p>
      <InputValueField
        v-model="name"
        type="text"
        label="Name"
        iconClass="pi-user"
        :class="{ 'is-invalid': nameError }"
      />
      <span v-if="nameError" class="error-message">{{ nameError }}</span>
      <InputValueField
        v-model="number"
        type="number"
        label="Phone Number"
        iconClass="pi-phone"
      />
      <InputValueField
        v-model="email"
        label="Email Address"
        type="email"
        iconClass="pi-envelope"
        :class="{ 'is-invalid': emailError }"
      />
      <span v-if="emailError" class="error-message">{{ emailError }}</span>
      <InputValueField
        v-model="password"
        label="Password"
        type="password"
        iconClass="pi-lock"
        :class="{ 'is-invalid': passwordError }"
      />
      <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
      <Button @click="handleSubmit" class="custom-button">
        <span>Sign Up</span>
        <i class="pi pi-arrow-right" style="margin-left: 5px;"></i>
      </Button>
      <Divider />
      <p>Already have an account? <a href="/">Login to your Account</a>.</p>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import Divider from 'primevue/divider';
import InputValueField from "./InputValueField.vue";
import UserServices from "@/services/User/User";
import Validator from "@/helpers/Validators";
import Toast from 'primevue/toast';

export default {
  data() {
    return {
      name: "",
      number: null,
      email: "",
      password: "",
      userType: "",
      error: "",
      successMessage: "",
      nameError: "",
      emailError: "",
      passwordError: "",
    };
  },
  mounted() {
    if (this.$route.query.userType) {
      this.userType = this.$route.query.userType;
    }
  },
  components: {
    InputValueField,
    Button,
    Divider,
    Toast,
  },
  methods: {
    async handleSubmit() {
      if (this.validateInputs()) {
        try {
          await UserServices.createUser(
            this.name,
            this.userType,
            this.email,
            this.password
          );
          this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Signup successful!', life: 2000 });
          this.successMessage = "Signup successful!";
          this.error = "";
          setTimeout(() => this.$router.push({ name: "login" }), 2000);
        } catch (error) {
          let errorMessage = 'Sign Up failed.';
          if (error.body.message) {
            errorMessage = error.body.message || errorMessage;
          }
          this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage,life: 2000 });
        }
      }
    },
    validateInputs() {
      this.nameError = Validator.required(this.name) ? (Validator.isValidName(this.name) ? "" : "Invalid Name.") : "Name is Required.";
      this.emailError = Validator.required(this.email) ? (Validator.email(this.email) ? "" : "Invalid email.") : "Email is required.";
      this.passwordError = Validator.required(this.password) ? "" : "Password is required.";
      return !(this.nameError || this.emailError || this.passwordError);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: right;
  min-height: 100vh;
  padding: 20px;
  margin-right: 14%;
}

.form-wrapper {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: #fff;
}

h2 {
  color: black;
}
.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
.success-message {
  color: green;
  font-size: 1rem;
  margin-top: 1rem;
}
.is-invalid {
  border-color: red;
}
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 40px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
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

.custom-button i {
  font-size: 20px;
}
</style>
