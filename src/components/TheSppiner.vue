<template>
  <div class="spinner" v-if="isLoading">
    <div v-bind:style="styles" class="spinner--circle-2"></div>
    <div class="spinner-text">loading...</div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      default: "40px",
    },
    background: {
      default: "#41b883",
    },
    color: {
      default: "#35495e",
    },
    stroke: {
      default: "12px",
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    styles() {
      return {
        width: this.size,
        height: this.size,
        border: this.stroke + " solid " + this.background,
        borderTopColor: this.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner-text {
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  z-index: 12999;
  position: absolute;
  top: 45.9%;
  left: 48.5%;
}
.spinner {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 12999;
  position: absolute;
}
.spinner--circle-2 {
  box-sizing: border-box;
  border-radius: 100%;
  animation: circle-2-spin 1s infinite linear;
  z-index: 12999;
  position: absolute;
  top: 40%;
  left: 47%;
}
@keyframes circle-2-spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
