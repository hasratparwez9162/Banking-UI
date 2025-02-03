<template>
  <div class="box mb-4 xxl:mb-6 custom-card" style="max-width: 385px">
    <div
      class="pb-4 lg:mb-6 lg:pb-6 d-flex justify-content-between align-items-center"
    >
      <h4 class="h4">Details</h4>
      <div class="dropdown">
        <button
          class="btn btn-outline-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ cardType }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <a class="dropdown-item" href="#" @click="selectCardType('Visa')"
              >Visa</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click="selectCardType('Mastercard')"
              >Mastercard</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click="selectCardType('Payoneer')"
              >Payoneer</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="mb-4 lg:mb-6 lg:pb-6 flex-column">
      <div
        class="custom-bg-primary p-4 lg:px-6 lg:py-5 rounded text-white position-relative overflow-hidden mb-3 lg:mb-8"
      >
        <div
          class="d-flex justify-content-between align-items-start mb-3 sm:mb-4 lg:mb-8"
        >
          <div>
            <img
              src="@/assets/name_logo.png"
              width="95"
              height="25"
              alt="mastercard icon"
              class="float-start"
            />
            <!-- <p class="text-xs mb-1">Current Balance</p>
            <h4 class="h4">{{ currentBalance }} USD</h4> -->
          </div>
          <img :src="cardImage" width="65" height="22" alt="card icon" />
        </div>
        <div class="mb-5">
          <img
            src="@/assets/Chip.png"
            width="45"
            height="45"
            alt="mastercard icon"
            class="float-start rounded-3"
          />
          <p class="fw-bold fs-4 mt-5">3254 5410 5650 5460</p>
        </div>
        <div class="rounded-circle secondary-background"></div>
        <div class="d-flex justify-content-between align-items-end mt-1">
          <div>
            <p class="mb-0">{{ cardHolderName }}</p>
          </div>
          <div style="z-index: 1">
            <p class="text-dark mb-0">{{ expirationDate }}</p>
          </div>
        </div>
      </div>

      <ul class="list-unstyled">
        <li class="d-flex justify-content-between py-2">
          <span>Card Type:</span>
          <span class="fw-medium">{{ cardType }}</span>
        </li>
        <li class="d-flex justify-content-between py-2">
          <span>Card Holder:</span>
          <span class="fw-medium">Felecia Brown</span>
        </li>
        <li class="d-flex justify-content-between py-2">
          <span>Expires:</span>
          <span class="fw-medium">12/27</span>
        </li>
        <li class="d-flex justify-content-between py-2">
          <span>Card Number:</span>
          <span class="fw-medium">3254 5410 5650 5460</span>
        </li>
        <li class="d-flex justify-content-between py-2">
          <span>Total Balance:</span>
          <span class="fw-medium">99,225.54 INR</span>
        </li>
        <li class="d-flex justify-content-between py-2">
          <span>Total Debt:</span>
          <span class="fw-medium">9,545.22 INR</span>
        </li>
      </ul>
      <hr class="text-secondary" />
    </div>

    <div>
      <ul class="list-unstyled">
        <li class="d-flex justify-content-between align-items-center mb-2">
          <span class="d-flex gap-2 align-items-center"
            ><span class="custom-text-primary">•</span
            ><span class="fw-semibold">Download Statement</span></span
          >
          <button
            class="btn custom-bg-primary w-9 h-9 rounded-circle p-0 custom-size"
          >
            <i class="text-lg text-white bi bi-download"></i>
          </button>
        </li>
        <li class="d-flex justify-content-between align-items-center mb-2">
          <span class="d-flex gap-2 align-items-center"
            ><span class="custom-text-primary">•</span
            ><span class="fw-semibold">Change Pin</span></span
          >
          <button
            class="btn custom-bg-primary w-9 h-9 rounded-circle p-0 custom-size"
          >
            <i class="text-lg text-white bi bi-pencil-square"></i>
          </button>
        </li>
        <li class="d-flex justify-content-between align-items-center mb-2">
          <span class="d-flex gap-2 align-items-center"
            ><span class="custom-text-primary">•</span
            ><span class="fw-semibold">Block Card</span></span
          >
          <button
            class="btn custom-bg-primary w-9 h-9 rounded-circle p-0 custom-size"
          >
            <i class="text-lg text-white bi bi-ban"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardDetails",
  data() {
    return {
      cardType: "Visa",
      cardImage: require("@/assets/visa-sm.png"),
      currentBalance: "80,700.00",
      cardHolderName: "Felecia Brown",
      expirationDate: "12/27",
      cardNumber: "325 541 565 546",
      totalBalance: "99,225.54",
      totalDebt: "9,545.22",
    };
  },
  methods: {
    selectCardType(type) {
      this.cardType = type;
      this.cardImage = require(`@/assets/${type.toLowerCase()}-sm.png`);
    },
  },
};
</script>

<style scoped>
/* Add any custom styling here if needed */
.custom-size {
  height: 2.25rem;
  width: 2.25rem;
}
.secondary-background {
  width: 250px;
  background-color: #ffc861;
  height: 250px;
  position: absolute;
  top: 56%;
  left: 65%;
  z-index: 0;
}
.custom-bg-primary {
  background-color: #0e777e !important;
}
</style>
