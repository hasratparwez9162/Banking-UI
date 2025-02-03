<template>
  <div v-if="isDialogOpen" class="dialog">
    <div class="card">
      <h3 class="headline">Loan Details</h3>
      <div class="card-content">
        <div class="loan-details">
          <div class="loan-info">
            <div><strong>Loan Number:</strong> {{ loan.loanNumber }}</div>
            <div><strong>Principal Amount:</strong> ₹{{ loan.loanAmount }}</div>
            <div><strong>Status:</strong> {{ loan.status }}</div>
          </div>
          <div class="loan-info">
            <div><strong>Loan Type:</strong> {{ loan.loanType }}</div>
            <div><strong>Interest Rate:</strong> {{ loan.interestRate }}%</div>
            <div><strong>Tenure:</strong> {{ loan.months }} months</div>
          </div>
          <div class="loan-info">
            <div>
              <strong>Remaining Balance:</strong> ₹{{ loan.remainingBalance }}
            </div>
          </div>
        </div>

        <!-- EMI Breakdown using ag-Grid -->
        <h4>EMI Breakdown</h4>
        <ag-grid-vue
          class="ag-theme-quartz"
          style="width: 100%; height: 300px"
          :columnDefs="columnDefs"
          :rowData="emiBreakdown"
          :defaultColDef="defaultColDef"
        ></ag-grid-vue>
      </div>

      <div class="card-actions">
        <button @click="closeDialog">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-theme-quartz.css";

export default {
  components: {
    AgGridVue, // Register AgGridVue component
  },
  props: {
    loan: {
      type: Object,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isDialogOpen: false,
      emiBreakdown: [], // EMI breakdown to be calculated
      columnDefs: [
        // Column definitions for ag-Grid
        { headerName: "Due Date", field: "dueDate", width: 265 }, // Automatically generate month numbers
        { headerName: "EMI Amount", field: "amount", width: 265 },
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
      },
    };
  },
  watch: {
    isOpen(val) {
      this.isDialogOpen = val;
      if (val) {
        this.calculateEMIBreakdown(); // Calculate EMI breakdown when the dialog opens
      }
    },
  },
  methods: {
    closeDialog() {
      this.isDialogOpen = false;
      this.$emit("close"); // Emit a 'close' event to parent
    },
    calculateEMIBreakdown() {
      const principal = this.loan.loanAmount;
      const rate = this.loan.interestRate / 12 / 100; // Monthly interest rate
      const tenure = this.loan.months;
      const endDate = new Date(this.loan.endDate); // Parse the end date

      // EMI Calculation formula
      const emiAmount =
        (principal * rate * Math.pow(1 + rate, tenure)) /
        (Math.pow(1 + rate, tenure) - 1);

      this.emiBreakdown = [];

      // Generate EMI breakdown with due dates based on the end date
      for (let i = tenure; i >= 1; i--) {
        const dueDate = new Date(endDate);
        dueDate.setMonth(dueDate.getMonth() - (tenure - i)); // Calculate due date backward from the end date

        this.emiBreakdown.unshift({
          amount: emiAmount.toFixed(2), // Format to two decimal places
          dueDate: dueDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        });
      }
    },
  },
};
</script>

<style scoped>
/* Basic styling for dialog box */
.dialog {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  display: block;
  margin: auto;
  max-width: 600px;
}

.headline {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.loan-details {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Space between columns */
  flex-direction: column;
}

.loan-info {
  flex: 1; /* Flex-grow to fill space equally */
  background-color: #f9f9f9; /* Light background for sections */
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
