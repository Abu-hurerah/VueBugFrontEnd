<template>
  <div class="data-table-container">
    <DataTable
      :value="bugs"
      class="p-datatable-bugs"
      :paginator="true"
      :rows="10"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[10]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
      <Column field="avatar" header="Avatar">
        <template #body="">
          <img
            src="@/assets/Images/avatarstatic2.png"
            alt="Avatar"
            class="avatar"
          />
        </template>
      </Column>
      <Column header="Actions" style="width: 10rem">
        <template #body="slotProps">
          <Button
            type="button"
            @click="toggleMenu(slotProps.data.bug_id)"
            class="custom-button"
          >
            <span class="pi pi-ellipsis-v"></span>
          </Button>
          <Menu
            :model="createMenuItems(slotProps.data)"
            :popup="true"
            :visible.sync="visibleMenu[slotProps.data.bug_id]"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Menu from "primevue/menu";
import BugsServices from "@/services/bugs/bugs";

export default {
  components: {
    DataTable,
    Column,
    Button,
    Menu,
  },
  props: {
    projectId: Number,
    searchterm: String,
  },
  data() {
    return {
      bugs: [],
      currentPage: 1,
      totalItemsCount: 0,
      perPage: 10,
      sortOrder: "ASC",
      errorMessage: "", // Add an error message state
      visibleMenu: {},
    };
  },
  watch: {
    searchterm() {
      this.fetchBugs();
    },
    projectId() {
      this.fetchBugs();
    },
    currentPage() {
      this.fetchBugs();
    }
  },
  methods: {
    statusClass(status) {
      return `status-${status.toLowerCase()}`;
    },
    toggleMenu(bugId) {
      this.$set(this.visibleMenu, bugId, !this.visibleMenu[bugId]);
    },
    updateState(bug, newStatus) {
      bug.status = newStatus;
      this.visibleMenu[bug.bug_id] = false; // Hide the menu
      console.log(`Updated bug ${bug.bug_id} to status ${newStatus}`);
    },
    createMenuItems(bug) {
      const statusOptions = ["New", "Started", "Completed", "Resolved"];
      const statusItems = statusOptions.map((status) => ({
        label: `Set Status to ${status}`,
        icon: "pi pi-fw pi-plus",
        command: () => this.updateState(bug, status.toLowerCase()),
      }));

      return [
        {
          items: [
            ...statusItems,
            {
              label: "Delete",
              icon: "pi pi-fw pi-power-off",
              command: () => this.deleteBug(bug),
            },
          ],
        },
      ];
    },
    async fetchBugs() {
      try {
        const response = await BugsServices.getBugsByProjectId(
          this.projectId,
          this.currentPage,
          this.perPage,
          this.sortOrder,
          this.searchterm // Pass the search term
        );

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
        console.error("Error fetching bugs:", error);
        this.errorMessage = "Failed to fetch bugs. Please try again.";
        this.bugs = [];
      }
    },
    deleteBug(bug) {
      console.log("Deleting bug:", bug);
      this.bugs = this.bugs.filter((b) => b.bug_id !== bug.b.bug_id);
    },
  },
  mounted() {
    this.fetchBugs();
    console.log(this.searchterm);
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
</style>
