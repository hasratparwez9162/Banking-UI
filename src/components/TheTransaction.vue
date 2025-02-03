<template>
  <div class="latest-transactions custom-card">
    <div
      v-if="header"
      class="d-flex justify-content-between align-items-center"
    >
      <h5>Latest Transactions</h5>
      <a
        class="text-primary-300 flex items-center gap-2 font-medium text-decoration-none"
        href="#"
        @click.prevent="viewAll"
      >
        View All
      </a>
    </div>
    <!-- Search Field -->
    <div v-if="enableSearch" class="mb-3">
      <div
        class="d-flex flex-wrap align-items-center gap-4 justify-content-end"
      >
        <!-- Search Form -->
        <div
          class="d-flex align-items-center border rounded-pill p-1 w-100 search-form custom-bg-primary-5"
          style="max-width: 319px"
        >
          <input
            type="text"
            class="form-control border-0 rounded-pill px-3 py-1 search"
            placeholder="Search"
            style="background-color: transparent"
            v-model="searchQuery"
          />
          <button
            class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
            type="submit"
            style="width: 2.5rem"
          >
            <i class="bi bi-search"></i>
          </button>
        </div>

        <!-- Sort By Dropdown -->
        <div class="d-flex align-items-center gap-3">
          <span>Filter By:</span>
          <div class="dropdown">
            <button
              class="btn btn-light d-flex align-items-center gap-2 border rounded-pill px-3 py-1 custom-bg-primary-5"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>{{ selectedFilter }}</span>
              <i class="bi bi-chevron-down"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end duration-300">
              <li
                v-for="option in filterOptions"
                :key="option"
                :class="{ active: selectedFilter === option }"
              >
                <!-- Using @click to set the selected filter when clicked -->
                <a class="dropdown-item" href="#" @click="setFilter(option)">{{
                  option
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div
      class="d-flex align-items-center justify-content-between custom-header mb-2"
    >
      <div class="text-center py-3 sortable w-20">To/From</div>
      <div class="text-start sortable w-12" @click="sortBy('amount')">
        Amount <i :class="getSortIcon('amount')"></i>
      </div>
      <div class="text-start pl-0 sortable w-15" @click="sortBy('date')">
        Date & Time <i :class="getSortIcon('date')"></i>
      </div>

      <div class="text-start w-15" style="margin-right: 45px">Status</div>
      <!-- View Details Button -->
      <div class="text-start w-17" v-if="viewDetails">Action</div>
    </div>

    <!-- Transactions -->
    <div v-for="transaction in paginatedTransactions" :key="transaction.id">
      <TransactionCard :transaction="transaction" :viewDetails="viewDetails" />
    </div>

    <!-- Pagination -->
    <div v-if="pagination">
      <div class="pagination-container">
        <small
          >Showing {{ startIndex + 1 }}–{{ endIndex }} from
          {{ filteredTransactions.length }} data</small
        >
        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{ disabled: currentPage === 1 }"
              @click="goToPage(currentPage - 1)"
            >
              <a class="page-link"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li
              class="page-item"
              v-for="page in totalPages"
              :key="page"
              :class="{ active: currentPage === page }"
              @click="goToPage(page)"
            >
              <a class="page-link">{{ page }}</a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
              @click="goToPage(currentPage + 1)"
            >
              <a class="page-link"><i class="bi bi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionCard from "./TransactionCard.vue";
import { mapGetters } from "vuex";
export default {
  name: "LatestTransactions",
  components: {
    TransactionCard,
  },
  props: {
    itemsPerPage: {
      type: Number,
      default: 5,
    },
    enableSearch: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    viewDetails: {
      type: Boolean,
      default: false,
    },
    header: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      transaction: [],
      searchQuery: "",
      currentPage: 1,
      sortKey: "",
      sortAsc: true,
      selectedFilter: "Last 1 Year", // Default filter option
      filterOptions: ["Last 7 Days", "Last 1 Month", "Last 1 Year"],
    };
  },
  computed: {
    ...mapGetters([
      "transactions", // Access the transactions data
      "isAdmin",
    ]),
    // Filtered transactions based on search, date, and sorting
    filteredTransactions() {
      let filtered = this.transaction;

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter((transaction) =>
          Object.values(transaction).join(" ").toLowerCase().includes(query)
        );
      }

      // Apply date filter
      const now = new Date();
      if (this.selectedFilter === "Last 7 Days") {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7); // Filter for the last 7 days
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.rawDate);
          return transactionDate >= sevenDaysAgo;
        });
      } else if (this.selectedFilter === "Last 1 Month") {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1); // Filter for the last 1 month
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.rawDate);
          return transactionDate >= oneMonthAgo;
        });
      } else if (this.selectedFilter === "Last 1 Year") {
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(now.getFullYear() - 1); // Filter for the last 1 year
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.rawDate);
          return transactionDate >= oneYearAgo;
        });
      }

      // Apply sorting
      if (this.sortKey) {
        filtered.sort((a, b) => {
          const aVal = a[this.sortKey];
          const bVal = b[this.sortKey];
          if (aVal < bVal) return this.sortAsc ? -1 : 1;
          if (aVal > bVal) return this.sortAsc ? 1 : -1;
          return 0;
        });
      }

      return filtered;
    },

    // Total pages based on filtered transactions and items per page
    totalPages() {
      // We are using the filteredTransactions here, and ensure it's recalculated when the data or filters change
      const filtered = this.filteredTransactions;
      return Math.ceil(filtered.length / this.itemsPerPage);
    },

    // Start index for pagination
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },

    // End index for pagination
    endIndex() {
      return Math.min(
        this.startIndex + this.itemsPerPage,
        this.filteredTransactions.length
      );
    },

    // Paginated transactions
    paginatedTransactions() {
      return this.filteredTransactions.slice(this.startIndex, this.endIndex);
    },
  },

  methods: {
    viewAll() {
      this.$emit("viewAll");
    },
    goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    setFilter(filter) {
      this.selectedFilter = filter;
    },

    sortBy(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }

      if (key === "amount") {
        this.transactions.sort((a, b) => {
          const aVal = a.rawAmount;
          const bVal = b.rawAmount;
          return this.sortAsc ? aVal - bVal : bVal - aVal;
        });
      } else if (key === "date") {
        this.transactions.sort((a, b) => {
          const aVal = a.rawDate;
          const bVal = b.rawDate;
          return this.sortAsc ? aVal - bVal : bVal - aVal;
        });
      } else {
        this.transactions.sort((a, b) => {
          const aVal = a[key];
          const bVal = b[key];
          if (aVal < bVal) return this.sortAsc ? -1 : 1;
          if (aVal > bVal) return this.sortAsc ? 1 : -1;
          return 0;
        });
      }
    },
    getSortIcon(column) {
      if (this.sortKey === column) {
        return this.sortAsc ? "bi bi-arrow-up" : "bi bi-arrow-down";
      }
      return "bi bi-arrow-down-up"; // Default icon for unsorted columns
    },
    // Helper function to format date
    formatDate(isoString) {
      const dateObj = new Date(isoString);
      return dateObj.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },

    // Helper function to format time
    formatTime(isoString) {
      const dateObj = new Date(isoString);
      return dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    },

    // Helper function to format amount with commas
    formatAmount(amount) {
      return amount.toLocaleString("en-US", { minimumFractionDigits: 2 });
    },
  },
  async created() {
    // Fetch transactions from localStorage and transform
    this.user = this.$store.state.user;
    if (this.user) {
      const accounts = this.$store.state.accounts;
      const accountNumber = accounts[0].accountNumber;
      const token = this.$store.getters.token;
      await this.$store.dispatch("fetchTransactions", {
        token,
        accountNumber,
      });
    }
    const transactions = this.transactions;
    if (this.transactions) {
      console.log("trasaction on mount", transactions);
      try {
        console.log("parse json", transactions);
        if (Array.isArray(transactions)) {
          this.transaction = transactions
            .sort(
              (a, b) =>
                new Date(b.transactionTime) - new Date(a.transactionTime)
            )
            .map((transaction) => ({
              name: transaction.toAccount,
              type: transaction.transactionType,
              rawAmount: transaction.amount, // Raw value for sorting
              formattedAmount: this.formatAmount(transaction.amount), // Formatted value for display
              rawDate: new Date(transaction.transactionTime), // Raw value for sorting
              formattedDate: this.formatDate(transaction.transactionTime), // Formatted value for display
              time: this.formatTime(transaction.transactionTime),
              date: this.formatDate(transaction.transactionTime),
              status: transaction.status,
              reference: transaction.reference,
            }));
        }
        console.log("After Map Transaction", this.transaction);
      } catch (error) {
        console.error("Error parsing transactions from localStorage:", error);
      }
    }
  },
};
</script>

<style scoped>
/* Add styles for sortable headers */
.sortable {
  cursor: pointer;
}
.sortable span {
  margin-left: 5px;
}
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.pagination {
  list-style: none;
  display: flex;
  gap: 5px;
}
.custom-header {
  background-color: #20b75730;
  border-radius: 0.5rem;
}
.duration-300 {
  transition-duration: 0.3s;
}
.search:focus {
  box-shadow: none;
}
.search-form {
  border-color: #20b757 !important;
}
.w-12 {
  width: 12% !important;
}
.w-17 {
  width: 17% !important;
}
</style>
