<template>
  <div class="loan-requests-container feature-card-cards w-100">
    <button class="btn btn-back" @click="goBack">← Back</button>
    <h1>Loan Requests</h1>

    <!-- Conditional rendering -->
    <div v-if="loanRequests && loanRequests.length > 0">
      <div class="ag-theme-quartz" style="height: 400px; width: 100%">
        <ag-grid-vue
          style="width: 100%; height: 100%"
          :columnDefs="columnDefs"
          :rowData="loanRequests"
          :defaultColDef="defaultColDef"
          :gridOptions="gridOptions"
          :pagination="true"
          :paginationPageSize="10"
          :paginationPageSizeSelector="[10, 20, 50, 100]"
          @grid-ready="onGridReady"
        />
      </div>
    </div>

    <!-- Fallback message -->
    <div v-else>
      <p>No Loan Requests available.</p>
    </div>
  </div>

  <LoanDetails
    :loanApplication="currentLoanRequest"
    @approve-loan="approveLoanRequest"
    @reject-loan="rejectLoanRequest"
    @close-details="closeDetails"
    v-if="currentLoanRequest"
  />
</template>

<script>
/* eslint-disable */
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomRenderComponent from "../CustomRenderComponent.vue";
import LoanDetails from "./LoanDetails.vue";

export default {
  name: "LoanRequests",
  components: {
    AgGridVue,
    CustomRenderComponent,
    LoanDetails,
  },
  data() {
    return {
      loanRequests: [],
      currentLoanRequest: null,
      comment: "",
      columnDefs: [
        { field: "applicationNumber", headerName: "Application No. " },
        {
          field: "applicantName",
          headerName: "Applicant Name",
        },
        { field: "loanType", headerName: "Loan Type" },
        { field: "loanAmount", headerName: "Loan Amount" },
        {
          field: "status",
          headerName: "Status",
          valueFormatter: (params) => {
            return params.value.replace(/_/g, " ");
          },
        },
        { field: "createdAtFormatted", headerName: "Request Date" },
        { field: "interestRate", headerName: "Interest Rate (%)" },
        {
          headerName: "Actions",
          cellRenderer: "CustomRenderComponent",
        },
      ],
      gridOptions: {
        context: {
          componentParent: this,
        },
        frameworkComponents: {
          CustomRenderComponent,
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
  methods: {
    async fetchLoanRequests() {
      const token = this.$store.getters.token;
      try {
        const response = await fetch("http://localhost:8080/loan/pending", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // If response status is 401, handle session expiration
        if (response.status === 401) {
          this.$store.dispatch("logout");
          this.$router.push("/login");
          alert("Session expired. Please login again.");
          return; // Exit the function if session is expired
        }

        // Check if response is successful (status 2xx)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Check if the response body is empty (no JSON to parse)
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          this.loanRequests = data.map((loan) => {
            // Format applicant name
            const applicantName = loan.info
              ? `${loan.info.firstName} ${loan.info.lastName}`
              : "";

            // Format the createdAt date
            const createdAt = loan.createdAt
              ? new Date(loan.createdAt).toLocaleDateString("en-US") // Format as MM/DD/YYYY
              : "";

            return { ...loan, applicantName, createdAtFormatted: createdAt };
          });
        } else {
          console.error("Unexpected response format", contentType);
        }
      } catch (error) {
        console.error("An error occurred while fetching loan requests:", error);
        alert("An error occurred. Please try again later.");
      }
    },
    viewDetails(request) {
      this.currentLoanRequest = request;
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
    },
    goBack() {
      this.$emit("backToDashboard");
    },
    closeDetails() {
      this.currentLoanRequest = null;
    },
    async approveLoanRequest(data) {
      const token = this.$store.getters.token;
      try {
        const response = await fetch(
          `http://localhost:8080/loan/approve/${data.id}?comment=${data.comment}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // body: JSON.stringify({
            //   comment: this.comment,
            // }),
          }
        );
        if (response.status === 401) {
          this.$store.dispatch("logout");
          alert("Session expired. Please login again.");
          this.$router.push("/login");
        } else if (response.ok) {
          const updatedRequests = this.loanRequests.map((loan) => {
            if (loan.id === this.currentLoanRequest.id) {
              return { ...loan, status: "APPROVED" };
            }
            return loan;
          });
          this.loanRequests = updatedRequests;
          this.closeDetails();
        } else {
          alert("Error approving loan request.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async rejectLoanRequest(data) {
      console.log(data);
      const token = this.$store.getters.token;
      try {
        const response = await fetch(
          `http://localhost:8080/loan/reject/${data.id}?comment=${data.comment}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // body: JSON.stringify({
            //   comment: data.comment,
            // }),
          }
        );
        if (response.status === 401) {
          this.$store.dispatch("logout");
          alert("Session expired. Please login again.");
          this.$router.push("/login");
        } else if (response.ok) {
          const updatedRequests = this.loanRequests.map((loan) => {
            if (loan.id === this.currentLoanRequest.id) {
              return { ...loan, status: "REJECTED" };
            }
            return loan;
          });
          this.loanRequests = updatedRequests;
          this.closeDetails();
        } else {
          alert("Error rejecting loan request.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
  mounted() {
    this.fetchLoanRequests(); // Fetch loan requests on component mount
  },
};
</script>

<style scoped>
.model {
  position: absolute;
  top: 78px;
  left: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.model-content {
  background-color: white;
  width: 80%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}
h1 {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 20px;
  text-align: center !important;
}
.btn-back {
  background-color: transparent;
  color: #3498db;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
}
.btn-back:hover {
  text-decoration: underline;
}
</style>
