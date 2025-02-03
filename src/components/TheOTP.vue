<template>
  <div class="text-center">
    <h5>Enter OTP</h5>
    <div class="d-flex justify-content-center">
      <input
        v-for="(digit, index) in otp"
        :key="index"
        type="text"
        class="form-control otp-input"
        v-model="otp[index]"
        maxlength="1"
        @input="moveNext(index, $event)"
        @keydown.backspace="movePrev(index, $event)"
        ref="otpInputs"
      />
    </div>
    <button class="btn btn-primary mt-3" @click="verifyOtp">Verify OTP</button>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  props: {
    transactionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      otp: Array(6).fill(""), // Ensure the array is initialized properly
      submittedOtp: "",
      maxAllowed: 3,
    };
  },
  methods: {
    successToast(message) {
      toast.success(message, { autoClose: 4000 });
    },
    errorToast(message) {
      toast.error(message, { autoClose: 4000 });
    },
    warningToast(message) {
      toast.warning(message, { autoClose: 4000 });
    },
    moveNext(index, event) {
      if (event.target.value && index < 5) {
        this.$refs.otpInputs[index + 1].focus();
      }
    },
    movePrev(index, event) {
      if (!event.target.value && index > 0) {
        this.$refs.otpInputs[index - 1].focus();
      }
    },
    closeDialog() {
      this.$emit("close");
    },
    async verifyOtp() {
      const token = this.$store.getters.token;
      this.submittedOtp = this.otp.join("");
      const responce = await fetch(
        `http://localhost:8080/account/api/v1/transactions/verify?otp=${this.submittedOtp}&transactionId=${this.transactionId}`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      );
      const responseData = await responce.json();
      if (responseData.status != "FAILED") {
        this.successToast(responseData.message);
        this.$store.commit("UPDATE_ACCOUNT_BALANCE", {
          newBalance: responseData.balance,
        });
        this.closeDialog();
      } else if (responseData.status === "FAILED" && this.maxAllowed != 0) {
        this.maxAllowed--;
        this.warningToast(responseData.message);
        console.log("max allowed", this.maxAllowed);
        return;
      } else {
        console.log("else");
        this.closeDialog();
      }
    },
  },
};
</script>

<style>
.otp-input {
  width: 40px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  margin: 5px;
}
</style>
