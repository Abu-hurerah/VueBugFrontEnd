<template lang="">
    <div>
        <Button label="Show" icon="pi-plus" @click="openModal"> +Add New Project</Button>
        <Dialog header="Add New Project" :visible.sync="displayModal" :containerStyle="{width: '50vw'}" :modal="true">
            <AddProjectField></AddProjectField>
        </Dialog>
    </div>
</template>
<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button/Button';
import AddProjectField from './AddProjectField.vue';
export default {
    components:{
        Dialog,
        AddProjectField,
        Button
    },
    data(){
        return {
            displayModal: false,

        }
    },methods:{
        openModal() {
            this.displayModal = true;
        },
    }
}
</script>
<style scoped>
Button {
    background-color: rgb(36, 36, 196);
    width: 110%;
    height: 53px;
    padding: 10px;
    border: #fff;
    border-color: #141414;
    text-align: center;
    justify-content: center;
    font-family: inter;
    font-size: 20px;
    font-weight: bold;
  }
.p-button {
    margin: 0 .5rem 0 0;
    min-width: 10rem;
}

p {
    margin: 0;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>