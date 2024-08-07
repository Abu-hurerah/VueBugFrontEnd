<template>
    <div class="image-container">
        <img src="../assets/Images/coverleft.jpeg" alt="Image" width="250" />
    </div>
</template>

<script>
export default {
    name: 'UserTypeLeftScreen'
}
</script>

<style scoped>
.image-container {
    position: absolute; 
    left: 40%; 
    transform: translateX(-80%); 
    width: 50%; 
    height: 100%; 
    overflow: hidden; 
}

.image-container img {
    width: 100%; 
    height: auto; 
}

</style>