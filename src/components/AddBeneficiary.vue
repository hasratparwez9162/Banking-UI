<template>
  <div>
    <h4 class="text-start fs-2">
      {{ selectedBeneficiary ? "Update Beneficiary" : "Add Beneficiary" }}
    </h4>
    <div class="bb-dashed"></div>
    <div class="mt-3">
      <div class="row">
        <!-- Beneficiary Name -->
        <div class="col-md-6 mb-3">
          <BaseInput
            :label="'Beneficiary Name'"
            :id="'beneficiaryName'"
            :inputClass="'py-2'"
            :type="'text'"
            :max-char="30"
            v-model="formData.name"
          ></BaseInput>
        </div>
        <!-- Bank Name -->
        <div class="col-md-6 mb-3">
          <BaseInput
            :label="'Bank Name'"
            :id="'bankName'"
            :inputClass="'py-2'"
            :type="'text'"
            v-model="formData.bankName"
            :max-char="30"
          ></BaseInput>
        </div>

        <!-- Account Number -->
        <div class="col-md-6 mb-3">
          <BaseInput
            :label="'Account Number'"
            :id="'accountNumber'"
            :inputClass="'py-2'"
            :type="'number'"
            :max-char="10"
            v-model="formData.accountNumber"
          ></BaseInput>
        </div>

        <!-- Re-Account Number -->
        <div class="col-md-6 mb-3">
          <BaseInput
            :label="'Confirm Account Number'"
            :id="'reAccountNumber'"
            :inputClass="'py-2'"
            :type="'number'"
            :max-char="10"
            v-model="formData.reAccountNumber"
          ></BaseInput>
        </div>

        <!-- IFSC Code -->
        <div class="col-md-6 mb-3">
          <BaseInput
            :label="'IFSC Code'"
            :id="'ifscCode'"
            :inputClass="'py-2'"
            :type="'text'"
            :max-char="12"
            v-model="formData.ifscCode"
          ></BaseInput>
        </div>
      </div>

      <!-- Buttons -->
      <div class="d-flex justify-content-end mt-3">
        <button
          type="reset"
          class="btn btn-outline-secondary rounded me-2"
          @click="resetForm"
        >
          Reset
        </button>
        <button type="button" @click="handleSubmit" class="btn btn-primary">
          {{ selectedBeneficiary ? "Update" : "Submit" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";

export default {
  components: {
    BaseInput,
  },
  props: {
    selectedBeneficiary: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formData: this.selectedBeneficiary
        ? { ...this.selectedBeneficiary }
        : {
            name: "",
            accountNumber: "",
            reAccountNumber: "",
            bankName: "",
            ifscCode: "",
          },
    };
  },
  methods: {
    resetForm() {
      this.formData = this.selectedBeneficiary
        ? { ...this.selectedBeneficiary }
        : {
            name: "",
            accountNumber: "",
            reAccountNumber: "",
            bankName: "",
            ifscCode: "",
          };
    },
    handleSubmit() {
      if (this.selectedBeneficiary) {
        console.log("Updating Beneficiary:", this.formData);
        this.$emit("update", { ...this.formData });
      } else {
        console.log("Adding New Beneficiary:", this.formData);
        this.$emit("submit", { ...this.formData });
      }
    },
  },
};
</script>

<style scoped>
.bb-dashed {
  border-bottom-width: 1px;
  border-style: dashed;
  border-color: #20b7574d;
}
</style>
