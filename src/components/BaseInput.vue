<template>
  <div class="input-container">
    <label v-if="label" :for="id" class="form-label fs-5">{{ label }}</label
    ><small v-if="desc">({{ desc }})</small>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="inputValue"
      @input="updateValue"
      @blur="onBlur"
      :required="required"
      :disabled="disabled"
      class="form-control mt-2"
      :class="inputClass"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    label: String,
    id: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    modelValue: [String, Number],
    required: Boolean,
    disabled: Boolean,
    inputClass: String,
    maxChar: Number,
    desc: String,
  },
  emits: ["update:modelValue", "blur"],
  data() {
    return {
      inputValue: this.modelValue,
    };
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue;
    },
  },
  methods: {
    updateValue(event) {
      let value = event.target.value;

      if (this.maxChar && value.length > this.maxChar) {
        value = value.slice(0, this.maxChar);
      }

      if (this.type === "number") {
        value = value.replace(/\D/g, "");
      }
      event.target.value = value;
      this.$emit("update:modelValue", value);
    },
    onBlur(event) {
      this.$emit("blur", event); // Emit the blur event
    },
  },
};
</script>

<style scoped>
.input-container {
  margin-bottom: 1rem;
  text-align: left;
}

.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1.25rem;
  border-radius: 0.25rem;
  background-color: #f0f8f1;
  border: none;
  border-radius: 30px;
  padding-left: 50px;
}

.form-control:disabled {
  background-color: #f8f9fa;
}
.form-control:focus {
  box-shadow: none;
  border: 1px solid #28a745;
}
</style>
