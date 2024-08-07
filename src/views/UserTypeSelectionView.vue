<template>
  <div>
    <!-- <Navigationbar></Navigationbar> -->
    <UserTypeSelectionMenu></UserTypeSelectionMenu>
    <UserTypeBackground></UserTypeBackground>
    
  </div>
</template>

<script>
// import Navigationbar from "@/components/Navigationbar.vue";
import UserTypeBackground from "@/components/UserTypeBackground.vue";
import UserTypeSelectionMenu from "@/components/UserTypeSelectionMenu.vue";

export default {
  components: {
    UserTypeSelectionMenu,
    UserTypeBackground,
    // Navigationbar,
  },
  name: "UserTypeSelection",
  methods: {
    
  },
};
</script>

<style scoped></style>
