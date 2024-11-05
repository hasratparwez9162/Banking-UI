<template>
  <button class="btn btn-info" @click="viewDetails">View Details</button>
</template>

<script>
export default {
  name: "ActionRenderer",
  props: {
    params: Object,
  },
  methods: {
    viewDetails() {
      // Access the parent component's method via context and trigger it
      this.params.context.componentParent.viewDetails(this.params.data);
    },
  },
};
</script>

<style scoped>
.btn-info {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
