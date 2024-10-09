<template>
  <div class="container">
    <div class="header">Banking Accounts</div>

    <!-- Balance Card Section -->
    <div class="balance-card" v-if="user">
      <div class="button-group">
        <div>
          <div class="balance">
            ₹{{ totalBalance }}<span style="font-size: 24px"></span>
          </div>
          <div class="balance-subtext">Available Balance</div>
        </div>

        <button class="withdraw-button" @click="onWithdraw">Send Money</button>
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

      <div class="horizontal-line"></div>
      <div class="account-details">
        <div>
          Name<br /><span class="highlight"
            >{{ user.firstName }} {{ user.lastName }}</span
          >
        </div>
        <div>Account Number<br />{{ accounts[0]?.accountNumber }}</div>
        <div>Currency<br />INR</div>
        <div>Accounts balance<br />₹{{ totalBalance }}</div>
        <div>Deposits<br />₹{{ accounts[0]?.deposits || "0.00" }}</div>
      </div>
    </div>

    <div class="tabs">
      <div
        class="tab"
        :class="{ active: activeTab === 'accounts' }"
        @click="changeTab('accounts')"
      >
        Savings / Current account
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'transactions' }"
        @click="changeTab('transactions')"
      >
        Recent Transaction
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'cards' }"
        @click="changeTab('cards')"
      >
        Cards
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'loans' }"
        @click="changeTab('loans')"
      >
        Loans
      </div>
    </div>

    <div v-if="activeTab === 'accounts'" class="summary-card">
      <div class="summary-header">Savings / Current Account Summary</div>
      <table class="summary-table">
        <tr>
          <th>Account Name</th>
          <th>Account#</th>
          <th>Account Type</th>
          <th>Balance</th>
          <th>Withdrawable</th>
          <th>Currency</th>
        </tr>
        <tr v-for="account in accounts" :key="account.accountNumber">
          <td class="highlight">{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ account.accountNumber }}</td>
          <td>{{ account.accountType }}</td>
          <td class="left-align">₹{{ account.balance.toFixed(2) }}</td>
          <td class="left-align">₹{{ account.balance.toFixed(2) }}</td>
          <td>INR</td>
        </tr>
      </table>
    </div>

    <div v-if="activeTab === 'transactions'" class="summary-card">
      <div class="summary-header">Recent Transactions</div>
      <div v-if="sortedTransactions.length === 0" class="no-data">
        No transactions available.
      </div>
      <ag-grid-vue
        v-else
        style="width: 100%; height: 100%"
        :class="themeClass"
        :columnDefs="colDefs"
        :rowData="sortedTransactions"
        :defaultColDef="defaultColDef"
        :pagination="true"
        :paginationPageSize="10"
      >
      </ag-grid-vue>
    </div>

    <!-- Add similar sections for Cards and Loans if needed -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "ag-grid-community/styles/ag-grid.css";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-theme-quartz.css";

export default {
  name: "TheDashboard",
  components: {
    AgGridVue,
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
    };
  },
  methods: {
    ...mapActions(["fetchUserData", "fetchTransactions", "fetchAccounts"]), // Map Vuex actions

    changeTab(tab) {
      this.activeTab = tab;
      const token = this.$store.getters.token; // Get token from Vuex store
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;

      if (tab === "transactions" && this.user && this.accounts.length > 0) {
        const accountNumber = this.accounts[0].accountNumber;
        this.fetchTransactions({ token, accountNumber });
        this.fetchAccounts({ token, userId });
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
    onWithdraw() {
      this.withdrawForm.fromAccount = this.accounts[0].accountNumber;
      this.showWithdrawDialog = true;
    },
    closeWithdrawDialog() {
      this.showWithdrawDialog = false;
    },
  },
  computed: {
    ...mapGetters([
      "user", // Access the user data
      "accounts", // Access the accounts data
      "loans", // Access the loans data if needed
      "cards", // Access the cards data if needed
      "transactions", // Access the transactions data
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
  },
  created() {
    const token = this.$store.getters.token;
    const email = this.$store.getters.email;

    if (token && email) {
      this.fetchUserData({ token, email }).then(() => {
        if (this.accounts.length > 0) {
          const accountNumber = this.accounts[0].accountNumber;
          this.fetchTransactions({ token, accountNumber });
        }
      });
    }
  },
};
</script>

<style scoped>
.summary-card {
  display: flex;
  flex-direction: column;
  height: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.ag-theme-quartz .ag-root-wrapper-body.ag-layout-normal {
  height: 100% !important; /* Ensure height is 100% */
  min-height: 0 !important;
  flex: 1 1 auto !important;
}

.ag-theme-quartz {
  height: 100%;
  width: 100%;
}
.container {
  width: 98%;
  margin: 20px auto;
  position: relative;
  top: 48.9px;
  overflow-x: auto; /* Enable horizontal scrolling */
  white-space: nowrap;
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
.summary-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.summary-table {
  width: 100%;
  border-collapse: collapse;
}
.summary-table th,
.summary-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
.summary-table th {
  background-color: #f4f9ff;
  font-weight: normal;
  color: #666;
  text-align: center;
}
.summary-table td {
  color: #333;
  text-align: center;
}
.summary-table .highlight {
  color: #007bff;
}
.summary-table {
  text-align: right;
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
  height: 58%;
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

.form-group input {
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
@media (max-width: 768px) {
  .balance-card {
    width: 176%;
  }
  .summary-card {
    width: 183%;
  }
}
</style>
