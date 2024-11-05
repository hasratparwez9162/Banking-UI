<template>
  <div v-if="dialog" class="dialog-container">
    <div class="dialog-card">
      <div class="headline dialog-header">Congratulations !!</div>
      <div class="dialog-body" v-if="accountDetails">
        <p>successfully submitted your form, Here are your details:</p>
        <p><strong>Application Id:</strong> {{ accountDetails }}</p>
      </div>
      <div class="dialog-footer">
        <button class="custom-button" @click="closeDialog">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    accountDetails: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-card {
  background-color: white;
  padding: 20px;
  max-width: 500px;
  border-radius: 10px;
}

.dialog-footer {
  text-align: right;
}

.custom-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
