<template>
  <div class="dashboard-container">
    <h1>Employee Dashboard</h1>
    <hr />
    <CardRequests
      v-if="currentFeature === 'cardRequests'"
      @backToDashboard="goBack"
    />
    <!-- Feature Section: Account Opening Requests -->
    <div class="feature-section" v-if="currentFeature === 'accountRequests'">
      <div class="feature-card full-width">
        <button class="btn btn-back" @click="goBack">← Back</button>
        <h2>Account Opening Requests</h2>
        <div class="ag-grid-container">
          <!-- AG Grid Integration -->
          <div class="ag-theme-quartz" style="height: 400px; width: 100%">
            <ag-grid-vue
              style="width: 100%; height: 100%"
              :columnDefs="columnDefs"
              :rowData="updatedAccountRequests"
              :defaultColDef="defaultColDef"
              :gridOptions="gridOptions"
              :pagination="true"
              :paginationPageSize="10"
              @grid-ready="onGridReady"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Other Features Section -->
    <div class="feature-section" v-if="featureSection">
      <div class="feature-card">
        <h2>Account Requests</h2>
        <p>Manage all account opening requests from users.</p>
        <button class="btn btn-primary" @click="getAccountRequests">
          Fetch Account Requests
        </button>
      </div>
      <div class="feature-card">
        <h2>Card Requests</h2>
        <p>Manage user card applications, including debit and credit cards.</p>
        <button class="btn btn-primary" @click="viewCardRequests">
          Fetch Card Requests
        </button>
      </div>
      <div class="feature-card">
        <h2>Loan Requests</h2>
        <p>Approve or reject loan applications from users.</p>
        <button class="btn btn-primary" @click="setLoanRequests">
          Fetch Loan Requests
        </button>
      </div>

      <div class="feature-card">
        <h2>User Account Management</h2>
        <p>Perform operations like withdraw and credit balance.</p>
        <button class="btn btn-primary" @click="openManageAccountModal">
          Manage User Accounts
        </button>
      </div>
    </div>

    <!-- Modals for Approvals, Withdraw, etc. -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <account-request-details
          :details="selectedRequest"
          @close="cancelAction"
          @action="handleApproveOrReject"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import { AgGridVue } from "ag-grid-vue3"; // Import AgGridVue
import "ag-grid-community/styles/ag-grid.css"; // Core Grid CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Quartz theme CSS
import AccountRequestDetails from "./AccountRequestDetails.vue";
import CustomRenderComponent from "../CustomRenderComponent.vue";
import CardRequests from "./CardsRequests.vue";

export default {
  name: "EmployeeDashboard",
  components: {
    AgGridVue, // Register AgGridVue component
    AccountRequestDetails,
    CustomRenderComponent, // Register your custom cell renderer
    CardRequests,
  },
  data() {
    return {
      showModal: false,
      selectedRequest: null,
      accountRequests: [], // Initialize accountRequests
      currentFeature: null, // Track the current feature
      featureSection: true,
      columnDefs: [
        { field: "applicationId", headerName: "Application No." },
        {
          headerName: "Name",
          valueGetter: (params) => {
            return `${params.data.firstName} ${params.data.lastName}`;
          },
        },
        { field: "email", headerName: "Email" },
        { field: "gender", headerName: "Gender" },
        { field: "phoneNumber", headerName: "Phone" },
        { field: "isActive", headerName: "Status" },
        {
          headerName: "Actions",
          cellRenderer: "CustomRenderComponent", // Correct usage of the cellRenderer
        },
      ],

      gridOptions: {
        context: {
          componentParent: this, // Pass Vue component context
        },
        frameworkComponents: {
          CustomRenderComponent, // Register the component in the grid
        },
      },
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true,
      },
      gridApi: null,
    };
  },
  computed: {
    updatedAccountRequests() {
      return [...this.accountRequests];
    },
  },
  methods: {
    async getAccountRequests() {
      console.log("Fetching account requests");
      const token = this.$store.getters.token;
      const response = await fetch(
        "http://127.0.0.1:8080/users/inactive-rejected",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // check for unauthorized access
      if (response.status === 401) {
        this.$store.dispatch("logout");
        alert("Session expired. Please login again.");
        this.$router.push("/login");
      }
      const data = await response.json();
      this.accountRequests = data;
      this.currentFeature = "accountRequests";
      this.featureSection = false;
    },
    viewCardRequests() {
      this.currentFeature = "cardRequests";
      this.featureSection = false;
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
    },
    viewDetails(request) {
      this.selectedRequest = request;
      this.showModal = true;
      this.featureSection = false;
    },
    cancelAction() {
      this.showModal = false;
      this.featureSection = false;
    },
    goBack() {
      this.currentFeature = null;
      this.accountRequests = [];
      this.featureSection = true;
    },
    handleApproveOrReject() {
      console.log("Approve or Reject logic here");
      this.getAccountRequests(); // Refresh the account requests after approval or rejection
    },
  },
};
</script>

<style scoped>
/* Main Container */
.dashboard-container {
  text-align: center;
  margin: 50px auto;
  margin-top: 60px;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  padding-top: 22px;
  margin-bottom: 0;
  text-align: center;
}

.feature-section {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 30px;
}

.feature-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 19%;
  text-align: center;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.full-width {
  width: 100%;
}

.feature-card h2 {
  font-size: 1.5rem;
  color: #2980b9;
  margin-bottom: 10px;
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #3498db;
  color: #fff;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #2ecc71;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #27ae60;
}

.btn-back {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  color: #3498db;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.btn-back:hover {
  text-decoration: underline;
}

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 78px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.modal-actions {
  margin-top: 20px;
}

.modal-actions .btn {
  margin: 0 10px;
}
.ag-grid-container {
  height: 100px !important;
}
</style>
