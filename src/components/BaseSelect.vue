<template>
  <div class="form-group">
    <label :for="id" class="form-label fs-5">{{ label }}</label>
    <select
      :id="id"
      :name="name"
      class="form-select mt-2"
      :class="selectClass"
      :disabled="disabled"
      @change="handleChange"
    >
      <option value="" disabled selected v-if="placeholder">
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selectClass: {
      type: String,
      default: "py-2",
    },
  },
  methods: {
    handleChange(event) {
      this.$emit("change", event.target.value);
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
  text-align: left;
}
.form-select {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1.25rem;
  border-radius: 0.25rem;
  background-color: #f0f8f1;
  border: none;
  border-radius: 30px;
  padding-left: 50px;
}
.form-select:disabled {
  background-color: #f8f9fa;
}
.form-select:focus {
  box-shadow: none;
  border: 1px solid #28a745;
}
</style>
