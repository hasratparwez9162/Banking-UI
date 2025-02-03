<template>
  <div class="d-flex custom-container">
    <!-- Hamburger Icon -->
    <button
      class="hamburger-btn"
      @click="toggleSidebar"
      aria-label="Toggle Sidebar"
    >
      <i :class="isSidebarVisible ? 'bi bi-list' : 'bi bi-list'"></i>
    </button>
    <!-- Sidebar -->
    <div class="sidebar col-12 col-md-2 text-start mt-5">
      <a
        href="#"
        @click.prevent="setActiveSection('account-summary')"
        :class="{ active: activeSection === 'account-summary' }"
      >
        <i class="bi bi-house-door"></i> Account Summary
      </a>
      <a
        href="#"
        @click.prevent="setActiveSection('transactions')"
        :class="{ active: activeSection === 'transactions' }"
      >
        <i class="bi bi-arrow-repeat"></i> Transactions
      </a>
      <a
        href="#"
        @click.prevent="setActiveSection('fund-transfer')"
        :class="{ active: activeSection === 'fund-transfer' }"
      >
        <i class="bi bi-cash-coin"></i> Fund Transfer
      </a>
      <a
        href="#"
        @click.prevent="setActiveSection('add-beneficiary')"
        :class="{ active: activeSection === 'add-beneficiary' }"
      >
        <i class="bi bi-person-add"></i> Manage Beneficiary
      </a>
      <a
        href="#"
        @click.prevent="setActiveSection('cards')"
        :class="{ active: activeSection === 'cards' }"
      >
        <i class="bi bi-credit-card"></i> Cards
      </a>
      <a href="#" @click.prevent="setActiveSection('loans')">
        <font-awesome-icon :icon="['fas', 'hand-holding-usd']" /> Loans
      </a>
    </div>

    <!-- Content Area -->
    <div
      class="content col-12 col-md-10 mt-5 pt-5"
      :class="{ expanded: !isSidebarVisible }"
    >
      <div class="row gx-4 gx-xxl-3">
        <!-- Account Summary Section -->
        <div v-if="activeSection === 'account-summary'">
          <div id="account-summary">
            <div class="custom-card p-3">
              <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-center"
              >
                <div class="d-flex align-items-center">
                  <img
                    alt="User Image"
                    class="rounded-circle me-3"
                    height="100"
                    :src="user.picturePath"
                    width="100"
                  />
                  <div>
                    <h5>Account Holder</h5>
                    <p>{{ user.firstName }} {{ user.lastName }}</p>
                  </div>
                </div>
                <div>
                  <h5>Account Number</h5>

                  <!-- <p>
                    {{
                      user &&
                      user.accounts &&
                      user.accounts &&
                      user.accounts.length > 0 &&
                      user.accounts[0]
                        ? user.accounts[0].accountNumber
                        : "NA"
                    }}
                  </p> -->
                  <p>{{ accounts[0].accountNumber }}</p>
                </div>
                <div>
                  <h5>Branch</h5>
                  <p>{{ accounts[0].branch.branchName }}</p>
                </div>
                <div>
                  <h5>Account Balance</h5>
                  <p class="text-primary">{{ accounts[0].balance }} INR</p>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div
                class="d-flex flex-column align-items-start col-12 justify-content-start col-md-8"
              >
                <div class="col-12">
                  <div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <DebitCreditChart />
                    </div>
                  </div>
                </div>
                <div class="col-12 mt-3">
                  <div>
                    <LatestTransaction
                      :itemsPerPage="5"
                      :header="true"
                      @viewAll="setActiveSection('transactions')"
                    />
                  </div>
                </div>
              </div>
              <div
                class="d-flex flex-column align-items-start justify-content-start col-12 col-md-4"
              >
                <div class="col-12">
                  <QuickTransfer />
                </div>

                <div class="col-12 mt-3">
                  <div class="custom-card p-3">
                    <h5>Credit Cards</h5>
                    <div class="accordion" id="creditCardAccordion">
                      <div
                        v-for="(card, index) in creditCards"
                        :key="index"
                        class="accordion-item"
                      >
                        <h2 class="accordion-header" :id="'heading-' + index">
                          <button
                            aria-controls="'collapse-' + index"
                            aria-expanded="false"
                            class="accordion-button"
                            :data-bs-target="'#collapse-' + index"
                            data-bs-toggle="collapse"
                            type="button"
                          >
                            {{ card.name }}
                          </button>
                        </h2>
                        <div
                          :aria-labelledby="'heading-' + index"
                          class="accordion-collapse collapse"
                          :id="'collapse-' + index"
                          data-bs-parent="#creditCardAccordion"
                        >
                          <div class="accordion-body">
                            <p>Card Number: {{ card.cardNumber }}</p>
                            <p>Card Type: {{ card.cardType }}</p>
                            <p>
                              Last Statement Due:
                              <span class="text-danger"
                                >{{ card.dueAmount }} INR</span
                              >
                            </p>
                            <div class="d-flex justify-content-between">
                              <button
                                class="btn btn-primary"
                                @click="showCardDetails(card.name)"
                              >
                                More Details
                              </button>
                              <button
                                class="btn btn-success"
                                @click="payNow(card.name)"
                              >
                                Pay Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Transactions Section -->
        <div v-if="activeSection === 'transactions'">
          <!-- <h4>Transactions</h4> -->
          <LatestTransaction
            :enableSearch="true"
            :itemsPerPage="10"
            :pagination="true"
            :view-details="true"
          />
        </div>
        <!-- Fund Transfer Section -->

        <div v-if="activeSection === 'fund-transfer'">
          <FundTransfer />
        </div>

        <div v-if="activeSection === 'add-beneficiary'">
          <!-- <AddBeneficiary /> -->
          <ManageBeneficiary></ManageBeneficiary>
        </div>

        <!-- Cards Section -->
        <div v-if="activeSection === 'cards'">
          <!-- <div class="mt-3">
            <h5>Active Cards</h5>
            <div class="d-flex justify-content-start">
              <div v-for="card in creditCards" :key="card.cardNumber">
                <div class="card">
                  <div class="card-body">
                    <div class="card-inner">
                      <div class="card-logo"></div>
                      <div class="chip"></div>
                      <div class="bank-name">{{ card.name }}</div>
                      <div class="card-number">{{ card.cardNumber }}</div>
                      <div class="d-flex justify-content-around">
                        <div
                          class="d-flex justify-content-center align-items-end"
                        >
                          <div class="valid-thru">VALID<br />THRU</div>
                          <i class="bi bi-caret-right-fill"></i>
                          <div class="expiry-date">
                            MONTH/YEAR<br /><span class="date">{{
                              card.epirydate
                            }}</span>
                          </div>
                        </div>
                        <div class="d-flex align-items-center">
                          <span class="cvv">CVV </span>
                          <span>{{ card.showCVV ? card.cvv : "***" }}</span>
                          <i
                            :class="card.showCVV ? 'bi-eye-slash' : 'bi-eye'"
                            class="ms-2 cursor-pointer"
                            @click="toggleCVV(card)"
                          ></i>
                        </div>
                      </div>
                      <div class="cardholder">{{ card.cardHolder }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="mb-4 d-flex justify-content-between">
            <h2 class="text-start">Card Details</h2>
            <button
              class="btn-primary rounded-pill gap-2 d-flex align-items-center px-3"
            >
              <i class="bi bi-plus-circle text-base md:text-lg"></i>Apply Card
            </button>
          </div>
          <div class="d-flex">
            <div
              class="col-md-4 d-flex justify-content-center flex-column align-items-center"
            >
              <div style="min-width: 380px"><CardDetails /></div>
              <div style="min-width: 380px"><CardAds></CardAds></div>
            </div>
            <div class="col-md-8" style="height: fit-content">
              <CardTransactionChart class="custom-card" />
              <CardDocument class="custom-card" />
            </div>
          </div>
        </div>
        <div v-if="activeSection === 'loans'">
          <ApplyLoans />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var count = 0;
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import LatestTransaction from "./TheTransaction.vue";
import DebitCreditChart from "./DebitCreditChart.vue";
import QuickTransfer from "./QuickTransfer.vue";
import CardDetails from "./CardDetails.vue";
import CardTransactionChart from "./CardTransactionChart.vue";
import CardDocument from "./CardDocument.vue";
import FundTransfer from "./FundTransfer.vue";
import ManageBeneficiary from "./ManageBeneficiary.vue";
import CardAds from "./CardAds.vue";
import ApplyLoans from "./ApplyLoans.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    LatestTransaction,
    DebitCreditChart,
    QuickTransfer,
    CardDetails,
    CardTransactionChart,
    CardDocument,
    FundTransfer,
    ManageBeneficiary,
    CardAds,
    ApplyLoans,
    FontAwesomeIcon,
  },
  data() {
    return {
      user: [],
      isSidebarVisible: true,
      accounts: [],
      activeSection: "account-summary", // default active section

      creditCards: [
        {
          name: "Visa Gold",
          cardNumber: "1234567812345678",
          cardType: "Credit",
          dueAmount: "2,500",
          cardHolder: "Abhi Kumar",
          epirydate: "08/28",
          cvv: "452",
          showCVV: false,
        },
        {
          name: "MasterCard Platinum",
          cardNumber: "9876543210987654",
          cardType: "Credit",
          dueAmount: "3,800",
          cardHolder: "Abhi Kumar",
          epirydate: "08/30",
          cvv: "123",
          showCVV: false,
        },
        {
          name: "Platinum",
          cardNumber: "9876543210987654",
          cardType: "Credit",
          dueAmount: "3,800",
          cardHolder: "Abhi Kumar Singh",
          epirydate: "08/30",
          cvv: "458",
          showCVV: false,
        },
        {
          name: "Visa Gold",
          cardNumber: "1234567812345678",
          cardType: "Credit",
          dueAmount: "2,500",
          cardHolder: "Abhi Kumar",
          epirydate: "08/28",
          cvv: "452",
          showCVV: false,
        },
        {
          name: "MasterCard Platinum",
          cardNumber: "9876543210987654",
          cardType: "Credit",
          dueAmount: "3,800",
          cardHolder: "Abhi Kumar",
          epirydate: "08/30",
          cvv: "123",
          showCVV: false,
        },
        {
          name: "Platinum",
          cardNumber: "9876543210987654",
          cardType: "Credit",
          dueAmount: "3,800",
          cardHolder: "Abhi Kumar Singh",
          epirydate: "08/30",
          cvv: "458",
          showCVV: false,
        },
      ],
      showCVV: false,
      currentStep: 1,
      transferType: "",
      selectedAccount: "",
      userAccounts: [
        { id: 1, number: "1234567890", type: "Savings" },
        { id: 2, number: "0987654321", type: "Checking" },
      ],
      beneficiary: { accountNumber: "", verified: false, name: "", ifsc: "" },
      paymentMethod: "",
      cardDetails: { cardNumber: "", expiryDate: "", cvv: "" },
      netbankingDetails: { tpin: "" },
      otp: "",
    };
  },
  methods: {
    ...mapActions(["fetchTransactions"]),
    verifyBeneficiary() {
      // Simulate beneficiary verification
      if (this.beneficiary.accountNumber === "123456") {
        this.beneficiary.verified = true;
        this.beneficiary.name = "John Doe";
        this.beneficiary.ifsc = "BANK1234";
      } else {
        this.beneficiary.verified = false;
      }
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    goToNextStep() {
      if (this.canGoToNextStep) {
        this.currentStep += 1;
      }
    },
    resetSteps() {
      this.currentStep = 1;
      this.transferType = "";
      this.selectedAccount = "";
      this.beneficiary = {
        accountNumber: "",
        verified: false,
        name: "",
        ifsc: "",
      };
      this.paymentMethod = "";
      this.cardDetails = { cardNumber: "", expiryDate: "", cvv: "" };
      this.netbankingDetails = { tpin: "" };
      this.otp = "";
    },
    processTransfer() {
      console.log("Transfer Complete");
    },

    setActiveSection(section) {
      this.activeSection = section;
    },
    showCardDetails(cardName) {
      alert("Showing details for " + cardName);
    },
    payNow(cardName) {
      alert("Paying dues for " + cardName);
    },
    toggleCVV(card) {
      card.showCVV = !card.showCVV; // Toggle the specific card's CVV visibility
    },
  },
  computed: {
    ...mapGetters([
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

    canGoToNextStep() {
      switch (this.currentStep) {
        case 1:
          return !!this.transferType;
        case 2:
          return this.selectedAccount && this.beneficiary.verified;
        case 3:
          return !!this.paymentMethod;
        case 4:
          return this.paymentMethod === "card"
            ? this.cardDetails.cardNumber &&
                this.cardDetails.expiryDate &&
                this.cardDetails.cvv
            : this.netbankingDetails.tpin;
        case 5:
          return !!this.otp;
        default:
          return false;
      }
    },
  },
  async created() {
    this.user = this.$store.state.user;
    this.accounts = this.$store.state.accounts;
    console.log(count++, "User inside created", this.user);
  },
};
</script>

<style scoped>
.custom-container {
  height: 100vh;
}
.sidebar {
  background-color: #2c3e50;
  color: white;
  padding-top: 20px;
  position: fixed;
  left: 0;
  right: 0;
  height: 100%;
  overflow-y: auto;
  display: block;
  max-width: 256px;
}
.sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px 20px;
}
.sidebar a:hover {
  background-color: #34495e;
}
.sidebar .active {
  background-color: #1abc9c;
}
.content {
  flex: 1;
  padding: 20px;
  position: relative;
  z-index: 0;
  min-height: 100vh;
  padding: 1rem 0.75rem;
  transition-duration: 0.3s;
  margin-left: 256px;
  background-color: white;
  height: fit-content;
}

.table {
  margin-top: 20px;
}
.d-flex {
  display: flex;
  justify-content: space-between;
}
.w-45 {
  width: 45%;
}

.card-inner {
  width: 100%;
  height: 261px;
  background-color: #dcc0c0;
  border-radius: 15px;
  color: #000000;
  padding: 20px;
  position: relative;
  font-family: "Arial", sans-serif;
}
.card-logo {
  background-image: url("@/assets/name_logo.png");
  width: 128px;
  height: 27px;

  background-size: cover;
  position: absolute;
  top: 37px;
  left: 35px;
}
.chip {
  width: 50px;
  height: 50px;
  background-image: url("@/assets/Chip.png");
  border-radius: 5px;
  background-size: cover;
  position: absolute;
  top: 110px;
  left: 35px;
}
.bank-name {
  font-size: 19px;
  font-weight: bold;
  position: absolute;
  top: 213px;
  right: 20px;
}
.card-number {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-top: 94px;
  margin-left: 44px;
}
.valid-thru {
  font-size: 8px;
  margin-top: 10px;
}
.expiry-date {
  font-size: 10px;
  text-align: center;
  margin-top: 12px;
}
.expiry-date .date {
  font-size: 18px;
}
.cvv {
  margin-right: 5px;
}
.cardholder {
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  bottom: 20px;
  left: 20px;
}
.accordion-button:not(.collapsed) {
  background-color: #20b75730 !important;
}
.accordion-button:focus {
  box-shadow: none !important;
}
.content.expanded {
  margin-left: 0;
}
.hamburger-btn {
  position: absolute;
  top: 0rem;
  left: 0rem;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  z-index: 10;
}
</style>
