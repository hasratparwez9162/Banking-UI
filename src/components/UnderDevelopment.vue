<template>
  <div class="under-development-container">
    <h1>Under Development</h1>
    <p>This page is currently under development. Please check back later!</p>
    <button class="btn btn-back" @click="goBack">← Back</button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    },
  },
};
</script>

<style scoped>
.under-development-container {
  text-align: center;
  margin-top: 100px;
}

h1 {
  font-size: 2rem;
  color: #e74c3c; /* Red color for emphasis */
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
}
</style>
