<template>
  <div class="container">
    <Toast position="top-right" />
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

      <Button @click="handleSubmit" class="custom-button" :disabled="loading">
        <span v-if="loading">
          <i class="pi pi-spinner pi-spin"></i>
        </span>
        <span v-else>Login</span>
        <i v-if="!loading" class="pi pi-arrow-right icon-right"></i>
      </Button>

      <Divider />
      <p>Don't have an account <a href="/usertype">Create Account</a>.</p>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import Divider from "primevue/divider";
import InputValueField from "./InputValueField.vue";
import Validator from "@/helpers/Validators";
import UserServices from "@/services/User/User";
import Toast from 'primevue/toast';

export default {
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      loading: false,
    };
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
        this.loading = true;
        try {
          await UserServices.loginUser(this.email, this.password);
          this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Login successful!', life: 2000 });
          this.error = "";
          setTimeout(() => this.$router.push({ name: "Project" }), 2000);
        } catch (error) {
          let errorMessage = 'Login User Failed.';
          if (error.body.message) {
            errorMessage = error.body.message || errorMessage;
          }
          this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage,life: 2000 });
        } finally {
          this.loading = false;
        }
      }
    },
    validateInputs() {
      this.emailError = Validator.required(this.email)
        ? Validator.email(this.email)
          ? ""
          : "Invalid email."
        : "Email is required.";
      this.passwordError = Validator.required(this.password)
        ? ""
        : "Password is required.";
      return !(this.emailError || this.passwordError);
    },
  },
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

.custom-button i.pi-spinner {
  font-size: 20px;
  margin-right: 10px;
}

.icon-right {
  margin-left: auto;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>
