<template>
  <div v-if="!isLoading">
    <div class="mx-3 mt-4">
      <!-- Account Balance Section -->
      <div class="card mt-3">
        <div class="card-body">
          <div class="row justify-content-between align-items-center">
            <div class="col-md-2">
              <div class="account-balance">₹{{ totalBalance }}</div>
              <div>Available Balance</div>
            </div>
            <div class="col-md-2 text-end btn-center">
              <button class="btn btn-primary" @click="onWithdraw">
                Send Money
              </button>
            </div>
          </div>
          <hr />

          <!-- Account Info Section -->
          <div class="row">
            <div class="col-6 col-md-3">
              <div class="strong">Name</div>
              <div>{{ user?.firstName || "" }} {{ user?.lastName }}</div>
            </div>
            <div class="col-6 col-md-2">
              <div>Account Number</div>
              <div>{{ accounts[0]?.accountNumber }}</div>
            </div>
            <div class="col-6 col-md-2">
              <div>Currency</div>
              <div>INR</div>
            </div>
            <div class="col-6 col-md-3">
              <div>Accounts Balance</div>
              <div>₹{{ totalBalance }}</div>
            </div>
            <div class="col-6 col-md-2">
              <div>Deposits</div>
              <div>₹{{ accounts[0]?.deposits || "0.00" }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <ul class="nav nav-tabs mt-4">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'accounts' }"
            @click="activeTab = 'accounts'"
            href="#"
            >Savings / Current account</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'transactions' }"
            @click="changeTab('transactions')"
            href="#"
            >Recent Transaction</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'cards' }"
            @click="activeTab = 'cards'"
            href="#"
            >Cards</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'loans' }"
            @click="activeTab = 'loans'"
            href="#"
            >Loans</a
          >
        </li>
      </ul>

      <!-- Account Summary Table -->
      <div class="card mt-4" v-if="activeTab === 'accounts'">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th>Account#</th>
                  <th>Account Type</th>
                  <th>Balance</th>
                  <th>Withdrawable</th>
                  <th>Currency</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="account in accounts" :key="account.accountNumber">
                  <td class="highlight">
                    {{ user?.firstName }} {{ user?.lastName }}
                  </td>
                  <td>{{ account.accountNumber }}</td>
                  <td>{{ account.accountType }}</td>
                  <td>₹{{ account.balance.toFixed(2) }}</td>
                  <td>₹{{ account.balance.toFixed(2) }}</td>
                  <td>INR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Withdraw Money Dialog -->
    <div v-if="showWithdrawDialog" class="dialog-container">
      <div class="dialog-card">
        <div class="dialog-header">Send Money</div>

        <div class="dialog-body">
          <form @submit.prevent="submitWithdraw">
            <div class="form-group">
              <label for="fromAccount">From Account </label>
              <input
                id="fromAccount"
                v-model="withdrawForm.fromAccount"
                type="text"
                disabled
              />
            </div>
            <!--To  Account Number -->
            <div class="form-group">
              <label for="toAccount">To Account (Beneficiary)</label>
              <input
                id="toAccount"
                v-model="withdrawForm.toAccount"
                type="text"
                required
              />
            </div>

            <!-- Amount -->
            <div class="form-group">
              <label for="amount">Amount (₹)</label>
              <input
                id="amount"
                v-model="withdrawForm.amount"
                type="number"
                min="1"
                required
              />
            </div>
          </form>
        </div>

        <div class="dialog-footer">
          <button @click="submitWithdraw" class="btn-submit">Submit</button>
          <button @click="closeWithdrawDialog" class="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="activeTab === 'transactions'"
      class="card mt-4 mx-3 ag-grid-custom-height"
    >
      <div class="summary-header mb-3">
        <h4 class="mt-3">Recent Transactions</h4>
      </div>

      <div
        v-if="sortedTransactions.length === 0"
        class="alert alert-info card mx-3"
      >
        No transactions available.
      </div>

      <div v-else>
        <div class="table-responsive">
          <div class="ag-grid-container">
            <ag-grid-vue
              class="ag-theme-quartz w-100"
              :columnDefs="colDefs"
              :rowData="sortedTransactions"
              :defaultColDef="defaultColDef"
              :pagination="true"
              :paginationPageSize="10"
              :paginationPageSizeSelector="[10, 20, 50, 100]"
              style="height: 400px"
            >
            </ag-grid-vue>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'cards'" class="card mt-4 mx-3">
      <div v-if="true">
        <div class="table-responsive mt-4">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Card Number</th>
                <th>Card Holder</th>
                <th>Card Type</th>
                <th>Credit Limit (₹)</th>
                <th>Available Limit (₹)</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="card in cards" :key="card.id">
                <td>{{ card.cardNumber }}</td>
                <td>{{ card.cardHolderName }}</td>
                <td>{{ card.cardType }}</td>
                <td>{{ card.creditLimit }}</td>
                <td>{{ card.availableLimit }}</td>
                <td>{{ card.expiryDate }}</td>
                <td :class="statusClass(card.status)">{{ card.status }}</td>
                <td class="actions">
                  <button
                    @click="blockCard(card.id)"
                    class="block-button"
                    v-if="card.status == 'ACTIVE'"
                  >
                    Block Request</button
                  ><button
                    @click="unblockCard(card.id)"
                    class="unblock-button"
                    v-if="card.status == 'BLOCKED'"
                  >
                    UnBlock Request
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="apply-button" @click="openApplyCardDialog">
          Apply for a new Card
        </button>
      </div>

      <!-- If no cards, offer to apply for one -->
      <div v-else>
        <div class="no-data">
          <p>You currently have no cards.</p>
          <button class="apply-button" @click="openApplyCardDialog">
            Apply for a Card
          </button>
        </div>
      </div>
    </div>

    <div v-if="showApplyCardDialog" class="dialog-container">
      <div class="dialog-card">
        <div class="dialog-header">Issue Credit/Debit Cards</div>

        <div class="dialog-body">
          <form @submit.prevent="cardIssue">
            <div class="form-group">
              <label for="cardHolderName">Card Holder </label>
              <input
                id="cardHolderName"
                v-model="cardApplicationForm.cardHolderName"
                type="text"
                disabled
              />
            </div>
            <div class="form-group">
              <label for="cardType">Card Type</label>
              <select id="cardType" v-model="cardApplicationForm.cardType">
                <option value="DEBIT">Debit Card</option>
                <option value="CREDIT">Credit Card</option>
              </select>
            </div>
          </form>
        </div>

        <div class="dialog-footer">
          <button @click="cardIssue" class="btn-submit">Submit</button>
          <button @click="closeApplyCardDialog" class="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'loans'" class="card mt-4 mx-3">
      <div v-if="loans.length > 0">
        <div class="table-responsive mt-4">
          <table class="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Loan Number</th>
                <th>Loan Type</th>
                <th>Amount (₹)</th>
                <th>Outstanding Balance (₹)</th>
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
                <td :class="statusClass(loan.status)">{{ loan.loanStatus }}</td>
                <td class="actions">
                  <button @click="payLoan(loan.loanNumber)" class="pay-button">
                    Pay
                  </button>
                  <button @click="openLoanDialog(loan)" class="details-button">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <loan-details-dialog
          :isOpen="isDialogOpen"
          :loan="selectedLoan"
          @close="closeLoanDialog"
        ></loan-details-dialog>

        <button class="apply-button" @click="openApplyLoanDialog">
          Apply for a New Loan
        </button>
      </div>
      <div v-else>
        <div class="no-data">
          <p>You currently have no loans.</p>
          <button class="apply-button" @click="openApplyLoanDialog">
            Apply for a Loan
          </button>
        </div>
      </div>
    </div>
    <!-- Apply Loan Dialog -->
    <div v-if="showApplyLoanDialog" class="dialog-container">
      <div class="dialog-card">
        <div class="dialog-header">Apply for a Loan</div>
        <div class="dialog-body">
          <form @submit.prevent="applyLoan">
            <div class="form-group">
              <label for="loanType">Loan Type</label>
              <select v-model="loanForm.type" id="loanType" required>
                <option value="personal">Personal Loan</option>
                <option value="home">Home Loan</option>
                <option value="car">Car Loan</option>
              </select>
            </div>
            <div class="form-group">
              <label for="loanAmount">Loan Amount (₹)</label>
              <input
                type="number"
                id="loanAmount"
                v-model="loanForm.amount"
                min="1"
                required
              />
            </div>
          </form>
        </div>
        <div class="dialog-footer">
          <button @click="submitLoanApplication" class="btn-submit">
            Apply
          </button>
          <button @click="closeLoanDialog" class="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "ag-grid-community/styles/ag-grid.css";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-theme-quartz.css";
import LoanDetailsDialog from "./LoanDetailsDialog.vue";

export default {
  name: "TheDashboard",
  components: {
    AgGridVue,
    LoanDetailsDialog,
  },

  data() {
    return {
      activeTab: "accounts", // Default to accounts tab
      colDefs: [
        { headerName: "Type", field: "type" },

        {
          headerName: "Amount",
          field: "amount",
          valueFormatter: this.currencyFormatter,
        },
        {
          headerName: "Balance After",
          field: "balanceAfterTransaction",
          valueFormatter: this.currencyFormatter,
        },
        {
          headerName: "Timestamp",
          field: "timestamp",
          valueFormatter: this.timestampFormatter,
        },
      ],
      defaultColDef: {
        flex: 1,
        sortable: true,
        filter: true,
      },
      themeClass: "ag-theme-quartz", // Define grid theme
      loading: false,

      showWithdrawDialog: false,
      withdrawForm: {
        fromAccount: "",
        toAccount: "",
        amount: null,
      },
      showApplyCardDialog: false,
      cardApplicationForm: {
        cardType: "",
        cardHolderName: "",
      },
      showApplyLoanDialog: false,
      loanForm: {
        type: "",
        amount: "",
        tenureMonths: null,
      },
      isDialogOpen: false,
      selectedLoan: null,
    };
  },
  methods: {
    ...mapActions([
      "fetchUserData",
      "fetchTransactions",
      "fetchAccounts",
      "addCard",
    ]), // Map Vuex actions

    changeTab(tab) {
      this.activeTab = tab;
      const token = this.$store.getters.token; // Get token from Vuex store
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user.email;

      if (tab === "transactions" && this.user && this.accounts.length > 0) {
        const accountNumber = this.accounts[0].accountNumber;
        this.fetchTransactions({ token, accountNumber });
        this.fetchUserData({ token, email });
      }
    },

    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
    // Formatter for currency values
    currencyFormatter(params) {
      return `₹${Number(params.value).toLocaleString()}`;
    },

    // Formatter for timestamp values
    timestampFormatter(params) {
      const date = new Date(params.value);
      return date.toLocaleString(); // Customize format as needed
    },
    statusClass(status) {
      return status;
    },
    async blockCard(id) {
      const token = this.$store.getters.token;
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user.email;
      const response = await fetch(
        `http://localhost:8080/cards/${id}/request-block`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const responceData = await response.json();
      console.log(responceData);
      this.fetchUserData({ token, email });
      alert("Card blocked Request sent successfully.");
    },
    async unblockCard(id) {
      console.log(id);
      const token = this.$store.getters.token;
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user.email;
      const response = await fetch(
        `http://localhost:8080/cards/${id}/request-unblock`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const responceData = await response.json();
      console.log(responceData);
      this.fetchUserData({ token, email });
      alert("Card unblocked Request sent successfully.");
    },
    async submitAddMoney() {
      const token = this.$store.getters.token;
      const AddMoneyRequest = {
        accountNumber: this.AddMoneyForm.account,
        amount: parseFloat(this.AddMoneyForm.amount),
        type: "CREDIT",
      };
      try {
        const responce = await fetch(
          "http://localhost:8080/account/transaction",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(AddMoneyRequest),
          }
        );
        if (!responce.ok) {
          const errorData = responce.text();
          throw new Error(errorData);
        }
        const data = await responce.text();
        console.log("Transaction successful:", data);
        alert("Successfully transferred money!");
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;
        this.fetchAccounts({ token, userId });
        this.showAddMoneyDialog = false;
      } catch (error) {
        console.log(error);
        alert("Facing some internal issue try after sometime ..");
      }
    },
    async submitWithdraw() {
      const token = this.$store.getters.token;

      // Prepare the transaction request body
      const transactionRequestBody = {
        fromAccount: this.withdrawForm.fromAccount,
        toAccount: this.withdrawForm.toAccount,
        amount: parseFloat(this.withdrawForm.amount),
      };

      try {
        // Call the single API for the entire transaction
        const response = await fetch(
          "http://localhost:8080/account/transactions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transactionRequestBody),
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData);
        }

        const data = await response.text();
        console.log("Transaction successful:", data);
        alert("Successfully transferred money!");

        // Fetch updated account data after the transaction
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;
        this.fetchAccounts({ token, userId });
        //clear form Data
        this.toAccount = "";
        this.amount = null;
        // Optionally, close the dialog and reset the form
        this.closeWithdrawDialog();
      } catch (error) {
        console.error("Error during transaction:", error);
        alert(error.message); // Show the error in an alert
      }
    },
    async cardIssue() {
      const token = this.$store.getters.token;
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user.email;
      const RequestBody = {
        cardHolderName: this.cardApplicationForm.cardHolderName,
        cardType: this.cardApplicationForm.cardType,
        userId: user.id,
      };

      try {
        console.log(RequestBody);
        const response = await fetch("http://localhost:8080/cards/request", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(RequestBody),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData);
        }
        //const card = await response.json();

        this.fetchUserData({ token, email });
        alert("Successfully issue the card !!");
        this.showApplyCardDialog = false;
      } catch (error) {
        console.error("Error during transaction:", error);
        alert(error.message);
      }
    },
    onWithdraw() {
      this.withdrawForm.fromAccount = this.accounts[0].accountNumber;
      this.showWithdrawDialog = true;
    },
    closeWithdrawDialog() {
      this.showWithdrawDialog = false;
    },

    openApplyCardDialog() {
      this.cardApplicationForm.cardHolderName = this.accounts[0].userName;
      this.showApplyCardDialog = true;
    },
    closeApplyCardDialog() {
      this.showApplyCardDialog = false;
    },
    openLoanDialog(loan) {
      this.selectedLoan = loan;
      console.log(this.selectedLoan);
      this.isDialogOpen = true;
    },
    closeLoanDialog() {
      this.isDialogOpen = false;
    },
    payLoan(loanNumber) {
      console.log("Paying loan:", loanNumber);
      this.$router.push("/underdevelopment");
    },
  },
  computed: {
    ...mapGetters([
      "user", // Access the user data
      "accounts", // Access the accounts data
      "loans", // Access the loans data if needed
      "cards", // Access the cards data if needed
      "transactions", // Access the transactions data
      "isAdmin",
      "isLoading",
    ]),

    totalBalance() {
      return this.accounts
        .reduce((total, account) => total + parseFloat(account.balance), 0)
        .toFixed(2);
    },
    sortedTransactions() {
      return [...this.transactions].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    },
    updatedCards() {
      return [...this.cards];
    },
  },
};
</script>

<style scoped>
.ag-grid-custom-height {
  height: 500px;
}

.ag-root-wrapper-body.ag-layout-normal.ag-focus-managed {
  height: 100% !important; /* Ensure height is 100% */
  min-height: 0 !important;
  flex: 1 1 auto !important;
}
.account-balance {
  font-size: 2rem;
  font-weight: bold;
}

.summary-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
}

.header {
  font-size: 32px;
  font-weight: bold;
  margin: 20px 0px;
  text-align: left;
}
.button-group {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}

.credit-button,
.withdraw-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;
  max-height: 47px;
}

.credit-button:hover,
.withdraw-button:hover {
  background-color: #0056b3;
}
.balance-card,
.summary-card {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.balance {
  font-size: 48px;
  font-weight: bold;
  color: #333;
  text-align: left;
}
.balance-subtext {
  font-size: 16px;
  color: #666;
  text-align: left;
}
.horizontal-line {
  border-top: 1px solid #ddd;
  margin: 20px 0;
}
.account-details {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}
.account-details div {
  margin-right: 20px;
}
.tabs {
  display: flex;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
}
.tab {
  padding: 10px 20px;
  cursor: pointer;
  color: #666;
}
.tab.active {
  border-bottom: 2px solid #007bff;
  color: #007bff;
}

.left-align {
  text-align: left;
}
.dialog-container {
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
.dialog-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  display: block;

  margin: auto;
  max-width: 400px;
}

.dialog-header {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  color: #0909a7;
}

.dialog-body {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
}

.form-group input,
.form-group select {
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dialog-footer {
  text-align: center;
}

.btn-submit {
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-cancel {
  padding: 8px 16px;
  background-color: #ccc;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.status-active {
  color: green;
  font-weight: bold;
}
.status-closed {
  color: red;
  font-weight: bold;
}
.no-data {
  text-align: center;
  color: #999;
  margin-top: 20px;
}
.apply-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}
.apply-button:hover {
  background-color: #218838;
}
/* Status Styles */
.ACTIVE {
  color: #28a745 !important;
  font-weight: bold;
}

.BLOCKED {
  color: #dc3545 !important;
  font-weight: bold;
}

.EXPIRED {
  color: #6c757d !important;
  font-weight: bold;
}

.ACTIVE::before {
  content: "✔️ ";
}

.BLOCKED::before {
  content: "❌ ";
}

.EXPIRED::before {
  content: "⚠️ ";
}
.actions button {
  padding: 6px 12px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

/* Block button styling */
.actions .block-button {
  background-color: red;
  color: white;
}

.actions .block-button:hover {
  background-color: darkred;
}

/* Unblock button styling */
.actions .unblock-button {
  background-color: green;
  color: white;
}

.actions .unblock-button:hover {
  background-color: darkgreen;
}
@media (max-width: 768px) {
  .balance-card {
    width: 176%;
  }
  .summary-card {
    width: 183%;
  }
  .dialog-card {
    width: 90%; /* Adjust width for smaller screens */
  }
  .btn-center {
    text-align: center !important;
  }
}
@media (max-width: 600px) {
  .summary-card {
    padding: 10px; /* Adjust padding for mobile view */
    margin-bottom: 10px; /* Adjust margin for mobile view */
  }

  .ag-grid-custom-height {
    height: auto; /* Adjust height for mobile view */
  }

  .ag-root-wrapper-body.ag-layout-normal.ag-focus-managed {
    height: auto !important; /* Adjust height for mobile view */
  }
}
</style>
