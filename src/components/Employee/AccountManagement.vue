<template>
  <div class="container-fluid card shadow">
    <!-- Back Button -->

    <div class="col-md-12 d-flex align-items-center">
      <button class="btn btn-back" @click="goBack">← Back</button>
      <!-- Search User -->
      <div class="col-md-11 d-flex justify-content-center">
        <div>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              v-model="searchQuery"
              placeholder="Enter user ID"
            />
            <button class="btn btn-primary" @click="searchUser">Search</button>
          </div>
        </div>
      </div>
      <hr />
    </div>

    <!-- Display User Details -->
    <section v-if="user" class="p-3">
      <h3 class="h5 text-start">User Details</h3>

      <div class="d-flex justify-content-around align-items-center mb-3">
        <!-- Profile Picture -->
        <div class="text-center">
          <img
            v-if="user.picturePath"
            :src="user.picturePath"
            alt="Profile Picture"
            class="profile-picture img-thumbnail"
            style="max-width: 160px"
          />
          <p v-else class="text-muted">No Profile Picture Available</p>
        </div>

        <!-- Basic Information -->
        <div class="ml-4 text-start">
          <p><strong>Application No.:</strong> {{ user.applicationId }}</p>
          <p v-if="accounts.length">
            <strong>Account No.: </strong> {{ accounts[0].accountNumber }}
          </p>
          <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Gender:</strong> {{ user.gender }}</p>
          <p><strong>Phone:</strong> {{ user.phoneNumber }}</p>
          <p>
            <strong>Address:</strong> {{ user.address }}, {{ user.city }},
            {{ user.state }}
          </p>
          <p>
            <strong>ID Proof:</strong>
            <a
              :href="user.idProofPath"
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          </p>
        </div>
      </div>
      <hr />
    </section>

    <!-- Manage Accounts -->
    <section v-if="accounts.length" class="p-3 text-start">
      <h2 class="h5">Manage Accounts</h2>
      <div class="mb-3">
        <label for="select-ac">Select Account*</label>
        <select
          class="form-select"
          style="width: 33%"
          v-model="selectedAccount"
        >
          <option
            id="select-ac"
            v-for="account in accounts"
            :key="account.id"
            :value="account"
          >
            {{ account.accountNumber }} (Balance: {{ account.balance }})
          </option>
        </select>
      </div>

      <div>
        <button
          :disabled="selectedAccount == null"
          class="btn btn-primary me-2"
          @click="onAddMoney(selectedAccount.accountNumber)"
        >
          Deposit
        </button>
        <button
          :disabled="selectedAccount == null"
          class="btn btn-primary"
          @click="OpenWithdrawMonetDialog(selectedAccount.accountNumber)"
        >
          Withdraw
        </button>
      </div>
      <hr />
    </section>

    <!-- Manage Cards -->
    <!-- <section v-if="cards.length" class="p-3">
      <h2 class="h5 text-start">Manage Cards</h2>
      <ul class="list-group">
        <li v-for="card in cards" :key="card.cardId" class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <span>
              {{ card.cardNumber }} - {{ card.cardType }} ({{ card.status }})
            </span>
            <div>
              <button
                class="btn btn-warning btn-sm me-2"
                @click="blockCard(card)"
              >
                Block
              </button>
              <button class="btn btn-success btn-sm" @click="unblockCard(card)">
                Unblock
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section> -->
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
          <button @click="submitAddMoney" class="btn btn-success btn-sm">
            Add Money
          </button>
          <button @click="closeAddmoneyDialog" class="btn btn-warning btn-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div v-if="showWidhrawMoneyDialog" class="dialog-container">
      <div class="dialog-card">
        <div class="dialog-header">Widhraw Money</div>
        <p class="alert">{{ message }}</p>

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
          <button @click="submitWithdrawMoney" class="btn btn-success btn-sm">
            Widhraw
          </button>
          <button @click="closeWidhrawDialog" class="btn btn-warning btn-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Manage Loans -->
    <!-- <section v-if="loans.length" class="mb-4 p-3">
      <h2 class="h5">Manage Loans</h2>
      <ul class="list-group">
        <li v-for="loan in loans" :key="loan.id" class="list-group-item">
          <strong>Loan Type:</strong> {{ loan.loanType }} |
          <strong>Amount:</strong> {{ loan.loanAmount }} |
          <strong>Status:</strong> {{ loan.loanStatus }}
        </li>
      </ul>
    </section> -->
  </div>
</template>

<script>
export default {
  name: "AccountManagement",
  data() {
    return {
      message: "",
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
      searchQuery: "",
      user: null,
      accounts: [],
      cards: [],
      loans: [],
      selectedAccount: null,
      transactionAmount: null,
    };
  },
  computed: {
    token() {
      return this.$store.getters.token; // Retrieve the employee's token
    },
  },
  methods: {
    async searchUser() {
      try {
        const response = await fetch(
          `http://localhost:8080/users/user/${this.searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          this.user = data; // Assign full user data
          this.accounts = data.accounts; // Extract accounts from user data
          this.cards = data.cards; // Extract cards from user data
          this.loans = data.loans; // Extract loans from user data
        } else {
          throw new Error("User not found.");
        }
      } catch (error) {
        alert(error.message);
      }
    },
    onAddMoney(accountNumber) {
      this.AddMoneyForm.account = accountNumber;
      this.showAddMoneyDialog = true;
    },
    OpenWithdrawMonetDialog(accountNumber) {
      this.WidhrawForm.account = accountNumber;
      this.showWidhrawMoneyDialog = true;
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
        //alert("Successfully withdrawn money!");
        this.message = "Successfully withdrawn money!";
        const accountToUpdate = this.accounts.find(
          (account) => account.accountNumber === this.WidhrawForm.account
        );
        if (accountToUpdate) {
          accountToUpdate.balance -= parseFloat(this.WidhrawForm.amount); // Subtract the amount from the existing balance
        }

        this.WidhrawForm.amount = null;
      } catch (error) {
        console.log(error);
        alert("Facing some internal issue, try after some time ..");
      }
    },
    closeWidhrawDialog() {
      this.showWidhrawMoneyDialog = false;
    },
    closeAddmoneyDialog() {
      this.showAddMoneyDialog = false;
    },
    goBack() {
      this.$emit("backToDashboard"); // Emit event to go back
    },
    blockCard(card) {
      card.status = "Blocked"; // Example action; should call API in production
    },

    unblockCard(card) {
      card.status = "Active"; // Example action; should call API in production
    },
  },
};
</script>

<style scoped>
.account-management {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1,
h2 {
  color: #2c3e50;
}
input,
button,
select {
  margin: 5px;
}
.btn-back {
  background-color: transparent;
  color: #3498db;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.btn-back:hover {
  text-decoration: underline;
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
</style>
