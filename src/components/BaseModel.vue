<template>
  <!-- Overlay -->
  <div
    v-if="isOpen"
    class="custom-modal-overlay fixed inset-0 bg-overlay flex items-center justify-center z-[100]"
    @click="toggleOpen"
  >
    <!-- Modal Box -->
    <div
      @click.stop
      class="custom-modal-box bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[600px] relative"
      :style="{ maxWidth: maxWidth }"
    >
      <!-- Close Button -->
      <button
        v-if="button"
        @click="toggleOpen"
        class="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
      >
        <i class="bi bi-x-lg"></i>
      </button>

      <!-- Modal Content -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    maxWidth: {
      type: String,
      default: "600px", // Default max-width
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    toggleOpen() {
      this.$emit("close"); // Emit event to notify parent to close modal
    },
  },
};
</script>

<style scoped>
/* Custom Overlay Style */
.custom-modal-overlay {
  background-color: rgba(0, 0, 0, 0.5); /* Slightly transparent background */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  min-height: 100vh;
}

/* Custom Modal Box Style */
.custom-modal-box {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease-in-out;
  max-width: 600px;
  width: 90%;
}

/* Modal Close Button Style */
.custom-modal-box button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: gray;
  border: none;
  background: none;
  cursor: pointer;
}

/* Modal Fade-in and Fade-out Transitions */
.custom-modal-overlay-enter-active,
.custom-modal-overlay-leave-active {
  transition: opacity 0.5s;
}

.custom-modal-overlay-enter,
.custom-modal-overlay-leave-to {
  opacity: 0;
}
</style>
