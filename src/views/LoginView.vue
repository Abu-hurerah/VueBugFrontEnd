<template>
  <div>
    <Toast position="top-right" />
    <UserTypeLeftScreen></UserTypeLeftScreen>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import UserTypeLeftScreen from "@/components/UserTypeBackground.vue";
import LoginForm from "@/components/LoginForm.vue";
import Toast from 'primevue/toast';

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      message: ""
    };
  },
  created() {
    const redirectMessage = localStorage.getItem('redirectMessage');
    if (redirectMessage) {
      this.$toast.add({ severity: 'error', summary: 'Error', detail: redirectMessage, life: 2000 });
      localStorage.removeItem('redirectMessage'); // Clear the message after displaying it
    }
  },
  components: {
    UserTypeLeftScreen,
    LoginForm,
    Toast,
  },
  methods: {},
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

.form-group input {
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

#error {
  color: red;
  margin-top: 10px;
}

#dont {
  color: #4c4b4a;
}

#create {
  color: #0056b3;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
}
</style>
