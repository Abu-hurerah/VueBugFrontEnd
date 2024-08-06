<template>
  <header class="header">
    <div class="navbar">
      <a href="/" class="logo">
        <img src="@/assets/Images/headerlogo.png" alt="ManageBug" />
      </a>
      <nav class="navbar__menu">
        <router-link to="/Project" class="navbar__link"
          ><i class="pi pi-align-justify"></i> Projects</router-link
        >
        <router-link to="/Task" class="navbar__link"
          ><i class="pi pi-check-square"></i> Tasks</router-link
        >
        <router-link to="/" class="navbar__link"
          ><i class="pi pi-cog"></i> Manage</router-link
        >
        <router-link to="/" class="navbar__link"
          ><i class="pi pi-users"></i> Users</router-link
        >
      </nav>
      <div class="right-section">
        <i class="pi pi-bell"></i>
        <i class="pi pi-envelope"></i>
        <img
          src="@/assets/Images/avatar.png"
          alt="Profile"
          class="profile-icon"
        />
        <p>{{ userdata }}</p>

        <Button type="button" @click="toggle" class="custom-button">
          <span class="pi pi-chevron-down"></span>
        </Button>
                <Menu ref="menu" :model="items" :popup="true" />
      </div>
    </div>
  </header>
</template>

<script>
import Menu from "primevue/menu";
import Utilities from "@/helpers/Utilites";
export default {
  components: {
    Menu,
  },
  data() {
    return {
      selectedItem: null,
      items: [
        {
          items: [
            { label: "Profile", icon: "pi pi-fw pi-plus", command: () => {} },
            { label: "Sign Out", icon: "pi pi-fw pi-power-off", to: "/" }
          ],
        }
      ],

      userdata: null, // assuming userdata is fetched and set here
    };
  },
  methods: {
    viewProfile() {
      console.log("Viewing profile...");
    },
    signOut() {
      this.$router.push("/");
    },
    itemClicked(item) {
      this.selectedItem = item;
      item.command();
    },
    toggleDropdown() {
      // Method to toggle dropdown, if needed
    },
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  },
  created() {
    this.userdata = Utilities.getuserInfo();
    this.userdata = this.userdata.substring(0, 3).toUpperCase();
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .logo {
      margin-right: auto;
    }

    .navbar__menu {
      display: flex;
      justify-content: center;
      align-items: center;
      .navbar__link {
        margin: 0 20px;
        display: flex;
        align-items: center;
        color: #333;
        font-size: 16px;
        text-decoration: none;
        &:hover {
          color: #555;
        }
        i {
          margin-right: 8px;
        }
      }
    }

    .right-section {
      display: flex;
      align-items: center;
      margin-left: auto;
      gap: 15px;
      .pi {
        font-size: 20px;
        cursor: pointer;
        padding-left: 25px;
      }
      .profile-icon {
        width: 40px;
        height: 40px;
        border-radius: 70%;
        margin-left: 40px;
        margin-right: 20px;
      }
    }
  }
}

.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
  background: none; /* Make the button background transparent */
  border: none; /* Remove any borders */
  padding: 0; /* Remove padding */
  cursor: pointer; /* Make sure it still looks clickable */
}

.custom-button .pi {
  color: #000; /* Set icon color, adjust as needed */
}
</style>
