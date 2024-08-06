<template lang="">
    <div>
        <Button class="custom-button" label="+ Add New Bugs" icon="pi pi-plus" @click="openModal"> + Add New Task</Button>
                <Dialog header="Add New Bugs" :visible.sync="displayModal" :containerStyle="{width: '50vw'}" :modal="true">
            <AddBugFields></AddBugFields>
        </Dialog>
    </div>
</template>
<script>
import Dialog from 'primevue/dialog';
import AddBugFields from './AddBugFields.vue';
export default {
    components:{
        Dialog,
        AddBugFields
    },
    data(){
        return {
            displayModal: false,

        }
    },methods:{
        openModal() {
            console.log("Open Modal")
            this.displayModal = true;
        },
    }
}
</script>
<style scoped>
.custom-button {
    background-color: #2a60d4; /* Blue shade similar to the button in the image */
    color: #fff; /* White text */
    padding: 12px 20px; /* Padding around text and icon */
    font-family: 'Inter', sans-serif; /* Font family */
    font-size: 16px; /* Text size */
    font-weight: bold; /* Bold text */
    border: none; /* No border */
    border-radius: 6px; /* Rounded corners */
    display: flex; /* Flexbox for alignment */
    align-items: center; /* Vertical center alignment */
    justify-content: center; /* Center alignment of content */
    gap: 10px; /* Space between icon and text */
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.custom-button:hover {
    background-color: #829ab1; /* Darker shade of blue on hover */
}

.pi {
    margin-right: 0.5em; /* Space between the icon and the label */
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>