<template>
  <div class="container mt-3 mb-3 custom-card">
    <div class="p-4">
      <h4 class="mb-4 text-start">Make a Payment</h4>
      <div class="bb-dashed"></div>
      <form @submit.prevent="handleSubmit" class="mt-3">
        <div class="row">
          <div class="col-md-6 mb-3">
            <BaseInput
              :label="'Amount'"
              :id="'amount'"
              :inputClass="'form-control py-2'"
              :placeholder="'Enter Amount'"
              :type="'number'"
              :max-char="10"
              v-model="paymentData.amount"
            ></BaseInput>
          </div>

          <div class="col-md-6 mb-3">
            <BaseInput
              :label="'Beneficiary Name'"
              :id="'name'"
              :inputClass="'form-control py-2'"
              :placeholder="'Enter Name'"
              :type="'text'"
              :max-char="30"
              v-model="paymentData.name"
            ></BaseInput>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <BaseInput
              :label="'Enter Account'"
              :id="'account'"
              :inputClass="'form-control py-2'"
              :placeholder="'Enter Account'"
              :type="'number'"
              :max-char="10"
              v-model="paymentData.account"
            ></BaseInput>
          </div>

          <div class="col-md-6 mb-3">
            <BaseInput
              :label="'Confirm Account'"
              :id="'confirmAccount'"
              :inputClass="'form-control py-2'"
              :placeholder="'Confirm Account'"
              :type="'number'"
              :max-char="10"
              v-model="paymentData.confirmAccount"
            ></BaseInput>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <BaseInput
              :label="'IFSC Code'"
              :id="'ifscCode'"
              :inputClass="'form-control py-2'"
              :placeholder="'Enter IFSC Code'"
              :type="'number'"
              :max-char="11"
              v-model="paymentData.ifscCode"
            ></BaseInput>
          </div>

          <div class="col-md-6 mb-3">
            <BaseSelect
              label="Payment Option"
              id="paymentOption"
              :options="Options"
              :placeholder="'Select Payment Option'"
              v-model="paymentData.paymentOption"
              @change="handlePaymentOptionChange"
            />
          </div>
        </div>

        <!-- Conditional Fields -->
        <div v-if="selectedOption === 'Net Banking'" class="row">
          <div class="col-md-6 mb-3">
            <BaseInput
              :label="'TPIN'"
              :id="'tpin'"
              :inputClass="'form-control py-2'"
              :placeholder="'Enter TPIN'"
              :type="'password'"
              :max-char="6"
              v-model="paymentData.tpin"
            ></BaseInput>
          </div>
        </div>

        <div v-if="selectedOption === 'Card'" class="row">
          <div class="col-md-6 mb-3">
            <BaseInput
              :label="'Card Number'"
              :id="'cardNumber'"
              :inputClass="'form-control py-2'"
              :placeholder="'Enter Card Number'"
              :type="'number'"
              :max-char="16"
              v-model="paymentData.cardNumber"
            ></BaseInput>
          </div>
          <div class="col-md-3 mb-3">
            <BaseInput
              :label="'Expiry Date'"
              :id="'expiryDate'"
              :inputClass="'form-control py-2'"
              :placeholder="'MM/YY'"
              :type="'text'"
              :max-char="5"
              v-model="paymentData.expiryDate"
              @input="formatExpiryDate"
            ></BaseInput>
          </div>
          <div class="col-md-3 mb-3">
            <BaseInput
              :label="'CVV'"
              :id="'cvv'"
              :inputClass="'form-control py-2'"
              :placeholder="'Enter CVV'"
              :type="'password'"
              :max-char="3"
              v-model="paymentData.cvv"
            ></BaseInput>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <BaseInput
              :label="'Phone Number (optional)'"
              :id="'phoneNumber'"
              :inputClass="'form-control py-2'"
              :placeholder="'Enter Phone Number'"
              :type="'number'"
              :max-char="13"
              v-model="paymentData.phoneNumber"
            ></BaseInput>
          </div>

          <div class="col-md-6 mb-3">
            <BaseInput
              :label="'Purpose'"
              :id="'notes'"
              :inputClass="'form-control py-2'"
              :placeholder="'Additional Notes'"
              :type="'text'"
              :desc="'optional'"
              :max-char="30"
              v-model="paymentData.notes"
            ></BaseInput>
          </div>
        </div>

        <div class="d-flex justify-content-start">
          <button type="submit" class="btn btn-primary me-2">Pay Now</button>
          <button type="button" class="btn btn-outline-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";
import BaseSelect from "./BaseSelect.vue";

export default {
  name: "PaymentForm",
  components: {
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      Options: [
        { value: "Net Banking", label: "Net Banking" },
        { value: "Card", label: "Card" },
      ],
      selectedOption: "",
      paymentData: {
        amount: "",
        name: "",
        account: "",
        confirmAccount: "",
        ifscCode: "",
        paymentOption: "",
        tpin: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        phoneNumber: "",
        notes: "",
      },
    };
  },
  methods: {
    handlePaymentOptionChange(selectedValue) {
      if (typeof selectedValue !== "object") {
        this.selectedOption = JSON.parse(JSON.stringify(selectedValue)).trim();
        this.paymentData.paymentOption = this.selectedOption;
        console.log(this.selectedOption);
        console.log(this.selectedOption === "Net Banking");
      }
    },
    handleSubmit() {
      console.log("Payment Data:", JSON.stringify(this.paymentData, null, 2));
    },
    formatExpiryDate(event) {
      let value = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
      if (value.length > 2) {
        value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
      }
      this.paymentData.expiryDate = value;
    },
  },
};
</script>

<style>
.form-control {
  background-color: #f1f5f9;
  border: none;
  border-radius: 20px;
}

.btn-primary {
  background-color: #28a745;
  border: none;
  border-radius: 20px;
}
.btn-outline-secondary {
  border-radius: 20px;
}

.icon-button {
  background-color: #28a745;
  border: none;
  border-radius: 50%;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bb-dashed {
  border-bottom-width: 1px;
  border-style: dashed;
  border-color: #20b7574d;
}
</style>
