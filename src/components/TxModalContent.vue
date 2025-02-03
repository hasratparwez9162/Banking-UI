<template>
  <div
    role="dialog"
    aria-labelledby="transaction-header"
    aria-modal="true"
    class="modal-dialog modal-lg"
    style="
      display: flex;
      flex-direction: column;
      pointer-events: auto;

      margin: 0px;
    "
  >
    <div class="modal-content">
      <div class="modal-header bg-light justify-content-between p-2">
        <h5 id="transaction-header" class="modal-title">Transaction Details</h5>
        <button
          type="button"
          class="btn-close"
          @click="closeDialog"
          aria-label="Close"
        ></button>
      </div>

      <div class="modal-body p-2">
        <div
          class="d-flex align-items-center justify-content-center gap-3 mb-4"
        >
          <span class="text-center" :class="status">{{
            transactionMessage
          }}</span>
        </div>

        <ul class="list-unstyled">
          <li class="d-flex justify-content-between mb-2">
            <span>Transaction Id:</span>
            <span class="fw-bold">{{ transaction.reference }}</span>
          </li>
          <!-- <li class="d-flex justify-content-between mb-2">
            <span>Balance:</span>
            <span class="fw-bold">{{
              transaction.balanceAfterTransaction
            }}</span>
          </li> -->
          <li class="d-flex justify-content-between mb-2">
            <span>Bank Account:</span>
            <span class="fw-bold">{{ transaction.name }}</span>
          </li>

          <li class="d-flex justify-content-between mb-2">
            <span>Amount:</span>
            <span class="fw-bold">{{ transaction.formattedAmount }} INR</span>
          </li>
        </ul>

        <div class="d-flex justify-content-center gap-4 flex-wrap">
          <button class="btn btn-outline-primary" @click="downloadPDF">
            <i class="bi bi-download"></i> Download PDF
          </button>
          <button class="btn btn-outline-primary" @click="printPDF">
            <i class="bi bi-printer"></i> Print PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transaction: Object,
  },
  computed: {
    maskedCardNumber() {
      return this.transaction.cardNumber.replace(/\d(?=\d{4})/g, "*");
    },
    transactionMessage() {
      switch (this.transaction.status) {
        case "SUCCESS":
          return "Payment Successful";
        case "FAILED":
          return "Payment Failed";
        case "PENDING":
          return "Payment is Pending";
        default:
          return "Unknown Payment Status";
      }
    },
    status() {
      if (this.transaction.status === "SUCCESS") {
        return "green";
      } else if (this.transaction.status === "FAILED") {
        return "red";
      } else if (this.transaction.status === "PENDING") {
        return "yellow";
      } else {
        return "gray";
      }
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    downloadPDF() {
      // Add logic for PDF download
    },
    printPDF() {
      window.print();
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
.red {
  color: red;
}
.yellow {
  color: yellow;
}
.green {
  color: green;
}
</style>
