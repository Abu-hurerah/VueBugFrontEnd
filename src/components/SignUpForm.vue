<template>
  <div class="container">
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
        <!-- Icon using CSS class for alignment -->
        <i class="pi pi-arrow-right" style="margin-left: 5px;"></i>
      </Button>
      <Divider />
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p>Already have an account? <a href="/login">Login to your Account</a>.</p>    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import Divider from 'primevue/divider';
import InputValueField from "./InputValueField.vue";
import UserServices from "@/services/User/User";
import Validator from "@/helpers/Validators";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      userType: "",  // This will now hold the userType passed from the query
      error: "",
      successMessage: "",
      nameError: "",
      emailError: "",
      passwordError: "",
    };
  },
  mounted() {
    if (this.$route.query.userType) {
      console.log("USER TYPE: ",this.$route.query.userType)
      this.userType = this.$route.query.userType;
    }
  },
  components: {
    InputValueField,
    Button,
    Divider,
  },
  methods: {
    async handleSubmit() {
      console.log(this.email, this.name, this.userType, this.password); 
      if (this.validateInputs()) {
        try {
          const response = await UserServices.createUser(
            this.name,
            this.userType,  // Use the userType obtained from the query
            this.email,
            this.password
          );
          this.successMessage = "Signup successful!";
          console.log(response);
          this.error = "";
          setTimeout(() => this.$router.push({ name: "login" }), 2000);
        } catch (error) {
          this.error =
            error.response && error.response.data.message
            ? error.response.data.message
            : "Signup failed due to server error.";
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
Button {
  background-color: #2f67e0;
  width: 40%;
  height: 70px;
  padding: 17px;
  border: #fff;
  border-radius: 10%;
  border-color: #141414;
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
