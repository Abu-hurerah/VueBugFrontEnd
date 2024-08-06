<template>
  <div>
    <!-- <Navigationbar></Navigationbar> -->
    <UserTypeRightScreen></UserTypeRightScreen>
    <UserTypeLeftScreen></UserTypeLeftScreen>
    
  </div>
</template>

<script>
// import Navigationbar from "@/components/Navigationbar.vue";
import UserTypeLeftScreen from "@/components/UserTypeLeftScreen.vue";
import UserTypeRightScreen from "@/components/UserTypeRightScreen.vue";

export default {
  components: {
    UserTypeRightScreen,
    UserTypeLeftScreen,
    // Navigationbar,
  },
  name: "UserTypeSelection",
  methods: {
    
  },
};
</script>

<style scoped></style>
