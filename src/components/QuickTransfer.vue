<template>
  <div class="transfer-container">
    <h4 class="mb-4">Quick Transfer</h4>
    <img
      style="max-width: 100px"
      src="@/assets/QTransfer.png"
      alt="Quick Transfer"
      class="mb-3"
    />

    <!-- Step 1: Select Bank -->
    <div class="mb-4">
      <select
        v-model="selectedBank"
        class="form-select custom-select"
        id="bank"
      >
        <option value="" disabled>Select a bank</option>
        <option value="aditi">Aditi Bank</option>
      </select>
    </div>

    <!-- IFSC Code Input (Visible after selecting bank) -->
    <div class="mb-3 position-relative">
      <BaseInput
        :type="'text'"
        :placeholder="'Enter IFSC Code...'"
        v-model="ifscCode"
        @input="validateIfsc"
        :maxChar="11"
        :disabled="!selectedBank"
      />
    </div>

    <!-- Account Number Input (Visible only after entering valid IFSC) -->
    <div class="mb-3 position-relative">
      <BaseInput
        :type="'number'"
        :placeholder="'Enter Account Number...'"
        v-model="account"
        :disabled="!isIfscValid"
        :maxChar="10"
      />
    </div>

    <!-- Confirm Account Number Input (Visible only after entering account number) -->
    <div class="mb-3 position-relative">
      <BaseInput
        :type="'number'"
        :placeholder="'Confirm Account Number...'"
        v-model="confirmAccount"
        :disabled="!account"
        @input="validateAccount"
        :maxChar="10"
      />
      <!-- Display Account Holder Name after validation -->
      <div class="mt-2">
        <BaseInput
          v-model="accountHolderName"
          :disabled="!confirmAccount"
          :placeholder="'Enter Account Holder'"
          :type="'text'"
          :maxChar="30"
          @blur="validateName(accountHolderName)"
        ></BaseInput>
      </div>
    </div>

    <!-- Amount Input (Visible after confirming account number) -->
    <div class="mb-4 position-relative">
      <BaseInput
        :type="'NUMBER'"
        :placeholder="'Enter Amount...'"
        v-model="amount"
        :disabled="!confirmAccount || confirmErrorMessage"
        :maxChar="10"
        @blur="validateAmount(amount)"
      />
    </div>

    <!-- Submit Button -->
    <div class="mb-4">
      <button
        class="btn btn-send"
        @click="submitTransaction"
        :disabled="isButtonDisabled"
      >
        Send Money
      </button>
    </div>
  </div>
  <BaseModel :isOpen="isOpen" :maxWidth="'350px'">
    <TheOTP :transactionId="transactionId" @close="closeOtpDialog"></TheOTP>
  </BaseModel>
</template>

<script>
import BaseInput from "./BaseInput.vue";
import BaseModel from "./BaseModel.vue";
import TheOTP from "./TheOTP.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { mapGetters } from "vuex";

export default {
  components: {
    BaseInput,
    TheOTP,
    BaseModel,
  },
  data() {
    return {
      transactionId: "",
      isOpen: false,
      selectedBank: "",
      ifscCode: "",
      account: "",
      confirmAccount: "",
      amount: "",
      accountHolderName: "",
      errorMessage: "",
      confirmErrorMessage: null,
      amountError: null,
      isIfscValid: false, // Tracks IFSC validation
    };
  },
  computed: {
    isButtonDisabled() {
      return (
        !this.selectedBank ||
        !this.isIfscValid ||
        !this.confirmAccount ||
        !this.amount ||
        this.confirmErrorMessage ||
        this.amountError
      );
    },
    ...mapGetters([
      "accounts", // Access the transactions data
    ]),
  },
  methods: {
    validateName(value) {
      const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
      if (!value) {
        this.confirmErrorMessage = " Name is required.";
        this.warningToast(this.confirmErrorMessage);
      } else if (value.length < 1 || value.length > 30) {
        this.confirmErrorMessage = " Name must be between 1 and 30 characters.";
        this.warningToast(this.confirmErrorMessage);
        this.formData.lastName = value.slice(0, 30);
      } else if (!namePattern.test(value)) {
        this.confirmErrorMessage =
          "Name must contain only alphabetic characters.";
        this.warningToast(this.confirmErrorMessage);
      } else {
        this.confirmErrorMessage = null; // Clear error
      }
    },
    validateAmount(value) {
      if (!value) {
        this.amountError = "Amount is required !";
        this.warningToast(this.amountError);
        return false;
      } else if (value > 20000) {
        this.amountError = "Amount should be not greater than 20000";
        this.warningToast(this.amountError);
        return false;
      } else if (value < 1) {
        this.amountError = "Amount should be not less than 1.";
        this.warningToast(this.amountError);
        return false;
      } else {
        this.amountError = null;
        return true;
      }
    },
    closeOtpDialog() {
      this.isOpen = false;
      this.resetForm();
    },
    successToast(message) {
      toast.success(message, { autoClose: 4000 });
    },
    errorToast(message) {
      toast.error(message, { autoClose: 4000 });
    },
    warningToast(message) {
      toast.warning(message, { autoClose: 4000 });
    },
    validateIfsc() {
      if (this.ifscCode.length >= 11) {
        const ifscPattern = /^[A-Z]{4}0[0-9]{6}$/;
        if (ifscPattern.test(this.ifscCode)) {
          this.isIfscValid = true;
          this.successToast("Valid IFSC Code!");
        } else {
          this.isIfscValid = false;
          this.errorToast("Invalid IFSC Code!");
        }
      }
    },
    validateAccount() {
      const pattern = /^[0-9]{10}$/;

      if (this.confirmAccount.length === 10) {
        if (!pattern.test(this.confirmAccount)) {
          this.confirmErrorMessage =
            "Account Number should contain only numeric values.";
          this.warningToast(this.confirmErrorMessage);
        } else if (this.confirmAccount !== this.account) {
          this.confirmErrorMessage = "Account numbers do not match!";
          this.warningToast(this.confirmErrorMessage);
        } else {
          this.confirmErrorMessage = null;
          this.successToast("Account numbers match!");
        }
      }
    },
    async submitTransaction() {
      if (
        !this.account ||
        !this.ifscCode ||
        !this.amount ||
        !this.confirmAccount ||
        !this.accountHolderName
      ) {
        this.warningToast("Please complete all fields before submitting.");
        return;
      }
      if (!this.validateAmount) {
        return;
      }

      try {
        this.$store.state.isLoading = true;
        const useraccount = this.accounts[0].accountNumber;
        const payload = {
          fromAccount: useraccount,
          toAccount: this.account,
          ifscCode: this.ifscCode,
          receiverName: this.accountHolderName,
          amount: this.amount,
          transactionType: "QUICK_TRANSFER",
        };
        const token = this.$store.getters.token;

        const response = await fetch(
          "http://localhost:8080/account/api/v1/transactions/initiate",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.status === 400) {
          const responseData = await response.json();
          this.errorToast(responseData.message);
          throw new Error(responseData.message);
        }

        if (response.status === 401) {
          this.warningToast("Session expired. Redirecting to login...");
          this.$store.dispatch("logout");
          this.$router.push("/login");
          return;
        }

        if (response.status === 404) {
          const responseData = await response.json();
          this.warningToast(responseData.message || "Resource not found.");
          throw new Error(responseData.message);
        }

        if (!response.ok) {
          const responseData = await response.json();
          throw new Error(responseData.message || "Transaction failed.");
        }

        const responseData = await response.json();
        console.log(responseData);
        this.transactionId = responseData.transactionId;
        this.isOpen = true;
      } catch (error) {
        console.error(error);
      } finally {
        this.$store.state.isLoading = false;
      }
    },
    resetForm() {
      this.selectedBank = "";
      this.ifscCode = "";
      this.account = "";
      this.confirmAccount = "";
      this.amount = "";
      this.accountHolderName = "";
      this.errorMessage = "";
      this.confirmErrorMessage = "";
      this.isIfscValid = false;
    },
  },
};
</script>

<style scoped>
.transfer-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}
.form-control {
  background-color: #f0f8f1;
  border: none;
  border-radius: 30px;
  padding-left: 50px;
}
.form-select {
  border: none;
  background-color: transparent;
  padding-left: 10px;
}
.btn-send {
  background-color: #28a745;
  color: white;
  border-radius: 30px;
  width: 100%;
  padding: 10px;
  border: none;
}
.btn-send:disabled {
  background-color: #88d99b;
}
.btn-send:hover {
  background-color: #069227;
  cursor: pointer;
  color: #ffffff;
}
.loading-spinner {
  text-align: center;
  font-size: 16px;
  color: #28a745;
  margin-top: 10px;
}
.text-danger {
  color: red;
}
.custom-toast {
  z-index: 99;
}
.custom-select {
  border: none;
  background-color: #f0f8f1;
  padding-left: 50px;
  border-radius: 30px;
}
</style>
