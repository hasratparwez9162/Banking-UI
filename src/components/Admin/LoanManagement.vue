<template>
  <div class="loan-management">
    <h3>Loan Management</h3>
    <table>
      <thead>
        <tr>
          <th>Loan Number</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Outstanding Balance</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loan in loans" :key="loan.loanNumber">
          <td>{{ loan.loanNumber }}</td>
          <td>{{ loan.loanType }}</td>
          <td>₹{{ loan.loanAmount }}</td>
          <td>₹{{ loan.remainingBalance }}</td>
          <td :class="loan.loanStatus.toLowerCase()">{{ loan.loanStatus }}</td>
          <td>
            <button @click="showRepayLoanForm = true" class="repay-button">
              Repay
            </button>
            <button @click="openLoanDetailsDialog(loan)" class="details-button">
              View Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <loan-details-dialog
      :isOpen="isDialogOpen"
      :loan="selectedLoan"
      @close="closeLoanDialog"
    ></loan-details-dialog>
    <button @click="showCreateLoanForm = true">Create New Loan</button>

    <!-- Create Loan Form Modal -->
    <div v-if="showCreateLoanForm" class="modal">
      <div class="modal-content">
        <span class="close" @click="showCreateLoanForm = false">&times;</span>
        <h4>Create New Loan</h4>
        <form @submit.prevent="submitCreateLoan">
          <div class="form-group">
            <label for="loanType">Loan Type:</label>
            <select v-model="newLoan.loanType" id="loanType" required>
              <option value="">Select Type</option>
              <option value="PERSONAL">Personal</option>
              <option value="HOME">Home</option>
              <option value="CAR">Car</option>
            </select>
          </div>
          <div class="form-group">
            <label for="loanAmount">Loan Amount (₹):</label>
            <input
              type="number"
              v-model="newLoan.loanAmount"
              id="loanAmount"
              min="1"
              required
            />
          </div>
          <button type="submit">Create Loan</button>
        </form>
      </div>
    </div>

    <!-- Repay Loan Form Modal -->
    <div v-if="showRepayLoanForm" class="modal">
      <div class="modal-content">
        <span class="close" @click="showRepayLoanForm = false">&times;</span>
        <h4>Repay Loan</h4>
        <form @submit.prevent="submitRepayLoan">
          <div class="form-group">
            <label for="loanNumber">Loan Number:</label>
            <input
              type="text"
              v-model="repayLoan.loanNumber"
              id="loanNumber"
              required
            />
          </div>
          <div class="form-group">
            <label for="repayAmount">Repayment Amount (₹):</label>
            <input
              type="number"
              v-model="repayLoan.amount"
              id="repayAmount"
              min="1"
              required
            />
          </div>
          <button type="submit">Repay Loan</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LoanDetailsDialog from "../LoanDetailsDialog.vue";
export default {
  name: "LoanManagement",
  components: {
    LoanDetailsDialog,
  },
  props: {
    loans: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showCreateLoanForm: false,
      showRepayLoanForm: false,
      newLoan: {
        loanType: "",
        loanAmount: null,
      },
      repayLoan: {
        loanNumber: "",
        amount: null,
      },
      isDialogOpen: false,
      selectedLoan: null,
    };
  },
  methods: {
    submitCreateLoan() {
      this.$emit("create-loan", this.newLoan);
      this.newLoan.loanType = "";
      this.newLoan.loanAmount = null;
      this.showCreateLoanForm = false;
    },
    submitRepayLoan() {
      this.$emit("repay-loan", this.repayLoan);
      this.repayLoan.loanNumber = "";
      this.repayLoan.amount = null;
      this.showRepayLoanForm = false;
    },
    openLoanDetailsDialog(loan) {
      this.selectedLoan = loan;
      this.isDialogOpen = true;
    },
    closeLoanDialog() {
      this.isDialogOpen = false;
    },
  },
};
</script>

<style scoped>
.loan-management {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.loan-management h3 {
  margin-bottom: 10px;
}
.loan-management table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}
.loan-management th,
.loan-management td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
.loan-management th {
  background-color: #f2f2f2;
}
.loan-management .active {
  color: #28a745;
}
.loan-management .closed {
  color: #dc3545;
}

.loan-management button {
  padding: 8px 16px;
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.loan-management button:hover {
  background-color: #0056b3;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}

.close {
  float: right;
  font-size: 24px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.modal-content button {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #218838;
}
</style>
