<template>
  <div class="user-details">
    <h3>User Details</h3>
    <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Phone:</strong> {{ user.phoneNumber }}</p>
  </div>
</template>

<script>
export default {
  name: "UserDetails",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-details {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.user-details h3 {
  margin-bottom: 10px;
}
</style>
