<template>
  <div>
    <Toast position="top-right" />
    <div v-if="bugs.length == 0" class="no-bugs-message">
      <h2>NO BUGS</h2>
    </div>
    <div class="data-table-container" v-if="bugs.length > 0">
      <DataTable
        :value="bugs"
        class="p-datatable-bugs"
      >
        <Column field="title" header="Bug Details"></Column>
        <Column field="status" header="Status">
          <template #body="slotProps">
            <span :class="statusClass(slotProps.data.status)">
              {{ slotProps.data.status }}
            </span>
          </template>
        </Column>
        <Column field="reported_by" header="Reported By"></Column>
        <Column field="assigned_to" header="Assigned To"></Column>
        <Column field="type" header="Type"></Column>
        <Column field="avatar" header="Avatar">
          <template #body="">
            <img src="@/assets/Images/avatarstatic2.png" alt="Avatar" class="avatar" />
          </template>
        </Column>
        <Column header="Action" :styles="{ 'min-width': '8rem' }">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
      <Paginator
         v-if="bugs.length > 0"
        :rows="perPage"
        :totalRecords="totalItemsCount"
        @page="onPageChange"
      ></Paginator>
    </div>
    <Dialog
      :visible.sync="StateDialog"
      :style="{ width: '450px' }"
      header="Edit Bug"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label>Bug Title</label>
        <div class="bug-title-display">{{ editBug.title }}</div>
      </div>
      <div class="field">
        <label for="statusDropdown">Change Status</label>
        <Dropdown
          id="statusDropdown"
          v-model="editBug.status"
          :options="statuses"
          optionLabel="label"
          optionValue="value"
          class="p-inputtext-lg"
        />
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveEdit"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import BugsServices from "@/services/bugs/bugs"; // Assuming you have this service
import Toast from 'primevue/toast';
import Paginator from "primevue/paginator/Paginator";
import urlParamsMixins from "@/helpers/urlParamsMixins"; // Ensure mixin is imported

export default {
  components: {
    DataTable, Column, Button, Dialog, Dropdown, Toast, Paginator
  },
  mixins: [urlParamsMixins],
  props: {
    projectId: String,
  },
  data() {
    return {
      bugs: [],
      currentPage: 1,
      totalItemsCount: 0,
      perPage: 10,
      searchterm: "",
      errorMessage: "",
      sortOrder: "",
      StateDialog: false,
      editBug: {
        id: null,
        title: "",
        status: "",
      },
      statuses: [
        { label: "New", value: "new" },
        { label: "Started", value: "started" },
        { label: "Resolved", value: "resolved" },
        { label: "Completed", value: "completed" },
      ],
    };
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler() {
        this.fetchListData();
      }
    }
  },
  methods: {
    statusClass(status) {
      return `status-${status.toLowerCase()}`;
    },
    editProduct(bug) {
      this.editBug.id = bug.bug_id;
      this.editBug.status = bug.status
      this.editBug.title = bug.title
      this.StateDialog = true;
    },
    hideDialog() {
      this.StateDialog = false;
    },
    async saveEdit() {
      try {
        await BugsServices.updateBug(this.editBug.id, this.editBug.status);
        this.StateDialog = false;
        this.fetchBugs();
        this.$toast.add({severity:'success', summary:'Success', detail:'Bug updated successfully', life: 3000}); 
      } catch (error) {
        console.error("Failed to update bug:", error);
        this.$toast.add({severity:'error', summary:'Error', detail:'Failed to update bug', life: 3000});
      }
    },
    fetchListData() {
      const { page = 1, sort, search } = this.$route.query;
      this.currentPage = parseInt(page);
      this.sortOrder = sort;
      this.searchterm = search;
      this.fetchBugs();
    },
    async fetchBugs() {
      try {
        let response
        if(this.searchterm){
          response = await BugsServices.getBugsByProjectId(
          this.projectId,
          this.currentPage,
          this.perPage,
          this.sortOrder,
          this.searchterm
          
        );
        }else{
          response = await BugsServices.getBugsByProjectId(
          this.projectId,
          this.currentPage,
          this.perPage,
          this.sortOrder)
        }
        if (response.data && response.data.length > 0) {
          this.bugs = response.data;
          this.totalItemsCount = response.totalItems;

          this.errorMessage = "";
        } else {
          this.errorMessage = response.message || "No Matching Bugs Found";
          this.bugs = [];
          this.totalItemsCount = 0;
        }
      } catch (error) {
        this.$toast.add({severity:'error', summary:'Error', detail:'Error fetching bugs', life: 3000});
        this.errorMessage = "Failed to fetch bugs. Please try again.";
        this.bugs = [];
      }
    },
    onPageChange(event) {
      this.updateUrlParams({ page: event.page + 1 });
      this.fetchBugs()
    }
  },
  mounted() {
    this.fetchBugs();
  },
  created() {
  },
};
</script>
<style scoped>
.data-table-container {
  max-width: 90%;
  margin: 20px auto;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  border-right: 1px solid #eee;
}

.status-new {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.status-started {
  background-color: rgb(226, 226, 88);
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
}

.status-completed,
.status-resolved {
  background-color: rgb(100, 206, 100);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

:deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}

:deep(.p-datatable.p-datatable-bugs) {
  .p-datatable-header {
    color: #007bff;
    background-color: #f4f4f4;
    font-weight: bold;
  }
  :deep(.p-datatable.p-datatable-bugs .p-datatable-thead > tr > th) {
    background-color: #f4f4f4;
    color: #007bff;
    font-weight: bold;
    padding: 10px;
    text-align: left;
  }
  .p-paginator {
    padding: 1rem;
  }

  .p-datatable-thead > tr > th {
    text-align: left;
  }

  .p-datatable-tbody > tr > td {
    cursor: auto;
  }
}

.avatar {
  width: 40px; /* Adjust size as needed */
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.custom-button .pi {
  color: #000;
}

.no-bugs-message {
  text-align: center;
  font-size: 24px;
  color: #666;
  padding: 20px;
  margin-top: 10%;
}
.bug-title-display {
  padding: 8px;
  background-color: #f4f4f4; /* Light grey background for distinction */
  border-radius: 4px; /* Rounded corners */
  font-weight: bold; /* Make the font bold */
  color: #333; /* Dark text color for better readability */
  margin-top: 5px; /* Margin to space it from the label */
}
</style>
