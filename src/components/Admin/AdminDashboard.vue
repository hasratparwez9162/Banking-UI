<template>
  <div class="admin-container">
    <!-- Admin Details Section -->
    <div class="admin-details" v-if="user">
      <div>
        <h3>Welcome, {{ user.firstName }} {{ user.lastName }}</h3>
      </div>

      <!-- Add more admin-specific details as needed -->
    </div>

    <!-- Search Section -->
    <div class="search-section">
      <h2>Manage Users</h2>
      <form @submit.prevent="searchUser">
        <input
          type="text"
          v-model.trim="searchAccountNumber"
          placeholder="Enter User Account Number"
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>

    <!-- User Management Section -->
    <div v-if="Currentuser" class="user-details-section">
      <user-details :user="Currentuser" />
      <account-management
        :accounts="Currentuser.accounts"
        @create-account="createAccount"
      />
      <card-management :cards="Currentuser.cards" @issue-card="issueCard" />
      <loan-management
        :loans="Currentuser.loans"
        @create-loan="createLoan"
        @repay-loan="repayLoan"
      />
    </div>

    <!-- No User Found Message -->
    <div v-else-if="searched" class="no-user">
      <p>No user found with account number "{{ searchAccountNumber }}".</p>
    </div>
  </div>
</template>

<script>
import UserDetails from "./UserDetails.vue";
import CardManagement from "./CardManagement.vue";
import LoanManagement from "./LoanManagement.vue";
import AccountManagement from "./AccountManagement.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AdminDashboard",
  components: {
    UserDetails,
    CardManagement,
    LoanManagement,
    AccountManagement,
  },
  data() {
    return {
      searchAccountNumber: "",
      Currentuser: null,
      searched: false,
    };
  },
  computed: {
    ...mapGetters(["isAdmin", "user"]),
  },
  methods: {
    ...mapActions([
      "adminSearchUser",
      "adminIssueCard",
      "adminCreateLoan",
      "adminRepayLoan",
      "adminCreateAccount",
    ]),

    async searchUser() {
      try {
        const response = await this.adminSearchUser(this.searchAccountNumber);
        if (response.reDirectToLogin) {
          this.$router.push("/login");
        } else if (response) {
          this.Currentuser = response;
        } else {
          this.Currentuser = null;
        }
        this.searched = true;
      } catch (error) {
        console.error("Error searching user:", error);
        alert("An error occurred while searching for the user.");
      }
    },

    async issueCard(cardData) {
      try {
        await this.adminIssueCard({
          accountNumber: this.searchAccountNumber,
          ...cardData,
        });
        alert("Card issued successfully!");
        this.searchUser(); // Refresh user data
      } catch (error) {
        console.error("Error issuing card:", error);
        alert("Failed to issue card.");
      }
    },

    async createLoan(loanData) {
      try {
        await this.adminCreateLoan({
          accountNumber: this.searchAccountNumber,
          ...loanData,
        });
        alert("Loan created successfully!");
        this.searchUser(); // Refresh user data
      } catch (error) {
        console.error("Error creating loan:", error);
        alert("Failed to create loan.");
      }
    },

    async repayLoan(loanData) {
      try {
        await this.adminRepayLoan({
          accountNumber: this.searchAccountNumber,
          ...loanData,
        });
        alert("Loan repaid successfully!");
        this.searchUser(); // Refresh user data
      } catch (error) {
        console.error("Error repaying loan:", error);
        alert("Failed to repay loan.");
      }
    },

    async createAccount(accountData) {
      try {
        await this.adminCreateAccount({ userId: this.user.id, ...accountData });
        alert("Account created successfully!");
        this.searchUser(); // Refresh user data
      } catch (error) {
        console.error("Error creating account:", error);
        alert("Failed to create account.");
      }
    },
  },
};
</script>

<style scoped>
.admin-container {
  padding: 20px;
}
.admin-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-section {
  margin-bottom: 30px;
}

.search-section form {
  display: flex;
  gap: 10px;
}

.search-section input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
}

.search-section button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
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

.no-user {
  color: red;
  font-weight: bold;
}
</style>
