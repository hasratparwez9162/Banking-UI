<template>
  <div class="transaction-card d-flex align-items-center">
    <div :class="`icon me-3 ${iconClass}`">
      <i :class="icon"></i>
    </div>
    <div class="flex-grow-1">
      <div class="d-flex justify-content-between align-items-center">
        <div class="w-20 text-start">
          <h6 class="mb-0">{{ transaction.name }}</h6>
          <small class="text-muted">{{ formatStatus(transaction.type) }}</small>
        </div>
        <div class="text-start w-20">
          <h4 class="mb-0">₹{{ transaction.formattedAmount }}</h4>
        </div>
        <div class="text-start w-20">
          <h6 class="mb-0">{{ transaction.date }}</h6>
          <small class="text-muted">{{ transaction.time }}</small>
        </div>
        <div class="text-start w-20" style="margin-left: 19px">
          <h6 :class="`status ${statusClass}`">{{ transaction.status }}</h6>
        </div>
        <!-- View Details Button -->
        <div class="text-start ms-3 w-20" v-if="viewDetails">
          <button
            class="btn btn-primary btn-sm"
            @click="openDetails(transaction)"
          >
            View Details
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <BaseModel :isOpen="isModalOpen" @close="closeModal" :maxWidth="'400px'">
      <TxModalContent :transaction="transactionData" @close="closeModal" />
    </BaseModel>
  </div>
</template>

<script>
import BaseModel from "./BaseModel.vue";
import TxModalContent from "./TxModalContent.vue";

export default {
  name: "TransactionCard",
  components: {
    BaseModel,
    TxModalContent,
  },
  props: {
    transaction: {
      type: Object,
      required: true,
    },
    viewDetails: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isModalOpen: false,
      transactionData: "",
    };
  },
  computed: {
    iconClass() {
      if (this.transaction.status === "PENDING") {
        return "icon-yellow"; // Pending status → Yellow
      }
      if (this.transaction.status === "FAILED") {
        return "icon-gray"; // Failed status → Gray
      }
      return this.transaction.type === "CREDIT" ? "icon-green" : "icon-red";
    },
    icon() {
      if (this.transaction.status === "PENDING") {
        return "bi bi-clock"; // Pending status → Clock icon
      }
      if (this.transaction.status === "FAILED") {
        return "bi bi-x-circle"; // Failed status → X-circle icon
      }
      return this.transaction.type === "CREDIT"
        ? "bi bi-arrow-down-left" // Credit → Arrow-up-right icon
        : "bi bi-arrow-up-right"; // Withdrawal or others → Arrow-down-left icon
    },

    statusClass() {
      return this.transaction.status.toLowerCase();
    },
  },
  methods: {
    openDetails(transaction) {
      this.transactionData = transaction;
      this.isModalOpen = true; // Open modal
    },
    closeModal() {
      this.isModalOpen = false; // Close modal
    },
    formatStatus(status) {
      return status.replace(/_/g, " ");
    },
  },
};
</script>

<style scoped>
.transaction-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}
.icon-red {
  background-color: #ff4d4f;
}
.icon-green {
  background-color: #52c41a;
}
.icon-gray {
  background-color: #8c8c8c;
}
.status {
  font-weight: bold;
  text-transform: capitalize;
}
.status.completed {
  color: #52c41a;
}
.status.canceled {
  color: #ff4d4f;
}
.status.pending {
  color: #8c8c8c;
}
.transaction-card:hover {
  background-color: #20b7570d;
}
</style>
