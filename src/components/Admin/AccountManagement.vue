<template>
  <div class="account-management">
    <h3>Account Management</h3>
    <table>
      <thead>
        <tr>
          <th>Account Number</th>
          <th>Type</th>
          <th>Balance</th>
          <th>Currency</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in accounts" :key="account.accountNumber">
          <td>{{ account.accountNumber }}</td>
          <td>{{ account.accountType }}</td>
          <td>₹{{ account.balance.toFixed(2) }}</td>
          <td>INR</td>
          <td>
            <button
              class="withdraw-button"
              @click="OpenWithdrawMonetDialog(account.accountNumber)"
            >
              Withdraw
            </button>
            <button
              class="withdraw-button"
              @click="onAddMoney(account.accountNumber)"
            >
              Deposit
            </button>
          </td>
        </tr>
      </tbody>
      <div v-if="showAddMoneyDialog" class="dialog-container">
        <div class="dialog-card">
          <div class="dialog-header">Add Money</div>

          <div class="dialog-body">
            <form @submit.prevent="submitAddMoney">
              <div class="form-group">
                <label for="Account">To User Account</label>
                <input
                  id="Account"
                  v-model="AddMoneyForm.account"
                  type="text"
                  required
                  disabled
                />
              </div>

              <!-- Amount -->
              <div class="form-group">
                <label for="amount">Amount (₹)</label>
                <input
                  id="amount"
                  v-model.trim="AddMoneyForm.amount"
                  type="number"
                  min="1"
                  required
                />
              </div>
            </form>
          </div>

          <div class="dialog-footer">
            <button @click="submitAddMoney" class="btn-submit">
              Add Money
            </button>
            <button @click="closeAddmoneyDialog" class="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div v-if="showWidhrawMoneyDialog" class="dialog-container">
        <div class="dialog-card">
          <div class="dialog-header">Widhraw Money</div>

          <div class="dialog-body">
            <form @submit.prevent="submitWithdrawMoney">
              <!--To Admin  Account Number -->
              <div class="form-group">
                <label for="Account">To User Account</label>
                <input
                  id="Account"
                  v-model="WidhrawForm.account"
                  type="text"
                  required
                  disabled
                />
              </div>

              <!-- Amount -->
              <div class="form-group">
                <label for="amount">Amount (₹)</label>
                <input
                  id="amount"
                  v-model.trim="WidhrawForm.amount"
                  type="number"
                  min="1"
                  required
                />
              </div>
            </form>
          </div>

          <div class="dialog-footer">
            <button @click="submitWithdrawMoney" class="btn-submit">
              Widhraw
            </button>
            <button @click="closeWidhrawDialog" class="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </table>

    <button @click="showCreateAccountForm = true">Create New Account</button>

    <!-- Create Account Form Modal -->
    <div v-if="showCreateAccountForm" class="modal">
      <div class="modal-content">
        <span class="close" @click="showCreateAccountForm = false"
          >&times;</span
        >
        <h4>Create New Account</h4>
        <form @submit.prevent="submitCreateAccount">
          <div class="form-group">
            <label for="accountType">Account Type:</label>
            <select v-model="newAccount.accountType" id="accountType" required>
              <option value="">Select Type</option>
              <option value="SAVINGS">Savings</option>
              <option value="CURRENT">Current</option>
            </select>
          </div>
          <div class="form-group">
            <label for="initialDeposit">Initial Deposit (₹):</label>
            <input
              type="number"
              v-model="newAccount.initialDeposit"
              id="initialDeposit"
              min="0"
              required
            />
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountManagement",
  props: {
    accounts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showAddMoneyDialog: false,
      AddMoneyForm: {
        account: "",
        amount: null,
      },
      showWidhrawMoneyDialog: false,
      WidhrawForm: {
        account: "",
        amount: null,
      },
      showCreateAccountForm: false,
      newAccount: {
        accountType: "",
        initialDeposit: null,
      },
    };
  },
  methods: {
    submitCreateAccount() {
      this.$emit("create-account", this.newAccount);
      this.newAccount.accountType = "";
      this.newAccount.initialDeposit = null;
      this.showCreateAccountForm = false;
    },
    onAddMoney(accountNumber) {
      this.AddMoneyForm.account = accountNumber;
      this.showAddMoneyDialog = true;
    },
    closeAddmoneyDialog() {
      this.showAddMoneyDialog = false;
    },
    OpenWithdrawMonetDialog(accountNumber) {
      this.WidhrawForm.account = accountNumber;
      this.showWidhrawMoneyDialog = true;
    },
    closeWidhrawDialog() {
      this.showWidhrawMoneyDialog = false;
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
        const accountToUpdate = this.accounts.find(
          (account) => account.accountNumber === this.AddMoneyForm.account
        );
        if (accountToUpdate) {
          accountToUpdate.balance += parseFloat(this.AddMoneyForm.amount); // Add the amount to the existing balance
        }

        this.showAddMoneyDialog = false;
      } catch (error) {
        console.log(error);
        alert("Facing some internal issue try after sometime ..");
      }
    },
    async submitWithdrawMoney() {
      const token = this.$store.getters.token;
      const WithdrawMoneyRequest = {
        accountNumber: this.WidhrawForm.account,
        amount: parseFloat(this.WidhrawForm.amount),
        type: "WITHDRAW",
      };
      try {
        const response = await fetch(
          "http://localhost:8080/account/transaction",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(WithdrawMoneyRequest),
          }
        );
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData);
        }
        const data = await response.text();
        console.log("Transaction successful:", data);
        alert("Successfully withdrawn money!");
        const accountToUpdate = this.accounts.find(
          (account) => account.accountNumber === this.WidhrawForm.account
        );
        if (accountToUpdate) {
          accountToUpdate.balance -= parseFloat(this.WidhrawForm.amount); // Subtract the amount from the existing balance
        }

        this.showWidhrawMoneyDialog = false;
      } catch (error) {
        console.log(error);
        alert("Facing some internal issue, try after some time ..");
      }
    },
  },
};
</script>

<style scoped>
.account-management {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.account-management h3 {
  margin-bottom: 10px;
}
.account-management table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}
.account-management th,
.account-management td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
.account-management th {
  background-color: #f2f2f2;
}

.account-management button {
  padding: 8px 16px;
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.account-management button:hover {
  background-color: #138496;
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
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #138496;
}
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
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn-cancel {
  background-color: #ff4d4d !important;
  color: white !important;
  border: none !important;
  border-radius: 5px !important;
  padding: 10px 20px !important;
  font-size: 16px !important;
  cursor: pointer !important;
  transition: background-color 0.3s ease !important;
}

.btn-cancel:hover {
  background-color: #ff1a1a !important;
}
.btn-submit {
  background-color: #4caf50 !important;
  color: white !important;
  border: none !important;
  border-radius: 5px !important;
  padding: 10px 20px !important;
  font-size: 16px !important;
  cursor: pointer !important;
  transition: background-color 0.3s ease !important;
}

.btn-submit:hover {
  background-color: #45a049 !important; /* Darker green on hover */
}
@media (max-width: 768px) {
  .dialog-card {
    width: 90%;
  }
}
</style>
