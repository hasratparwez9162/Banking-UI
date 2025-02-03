<template>
  <div class="container-fluid my-4">
    <!-- User Information Form -->
    <div class="card shadow-sm mb-4">
      <div
        class="card-header bg-info d-flex justify-content-between align-items-center"
      >
        <h5>Personal Details</h5>
        <button class="btn btn-outline-secondary" @click="toggleEditMode">
          <i :class="editMode ? 'bi bi-save' : 'bi bi-pencil'"></i>
        </button>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateUserDetails">
          <!-- First Name and Last Name -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="firstName" class="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                class="form-control"
                v-model="user.firstName"
                :disabled="!editMode"
                @input="markAsModified"
              />
            </div>
            <div class="col-md-6">
              <label for="lastName" class="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                class="form-control"
                v-model="user.lastName"
                :disabled="!editMode"
                @input="markAsModified"
              />
            </div>
          </div>

          <!-- Email and Phone Number -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                v-model="user.email"
                disabled
              />
            </div>
            <div class="col-md-6">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                class="form-control"
                v-model="user.phoneNumber"
                :disabled="!editMode"
                @input="markAsModified"
              />
            </div>
          </div>

          <!-- City and State -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="city" class="form-label">City</label>
              <input
                type="text"
                id="city"
                class="form-control"
                v-model="user.city"
                :disabled="!editMode"
                @input="markAsModified"
              />
            </div>
            <div class="col-md-6">
              <label for="state" class="form-label">State</label>
              <input
                type="text"
                id="state"
                class="form-control"
                v-model="user.state"
                :disabled="!editMode"
                @input="markAsModified"
              />
            </div>
          </div>

          <!-- ZIP Code -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="zip" class="form-label">ZIP Code</label>
              <input
                type="text"
                id="zip"
                class="form-control"
                v-model="user.zip"
                :disabled="!editMode"
                @input="markAsModified"
              />
            </div>
          </div>

          <!-- Update Button -->
          <div class="d-flex justify-content-end">
            <button
              type="submit"
              class="btn btn-success"
              :disabled="!isModified"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Associated Accounts -->
    <div class="card shadow-sm">
      <div class="card-header bg-info">
        <h5>Associated Accounts</h5>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead class="table-light">
            <tr>
              <th>Account Number</th>
              <th>Balance</th>
              <th>Account Type</th>
              <th>Date Opened</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in user.accounts" :key="account.id">
              <td>{{ account.accountNumber }}</td>
              <td>{{ account.balance.toFixed(2) }}</td>
              <td>{{ account.accountType }}</td>
              <td>{{ account.dateOpened }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserProfile",
  data() {
    return {
      editMode: false, // Flag to toggle edit mode
      isModified: false, // Flag to track if there are any changes
    };
  },
  methods: {
    // Toggle the edit mode when the button is clicked
    toggleEditMode() {
      this.editMode = !this.editMode;
    },

    // Track changes to form fields and set isModified flag to true
    markAsModified() {
      this.isModified = true;
    },

    // Update user details
    async updateUserDetails() {
      const id = this.user.id;
      console.log("user id : ", id);
      if (this.isModified) {
        const updatedUser = {
          id: id,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phoneNumber: this.user.phoneNumber,
          city: this.user.city,
          state: this.user.state,
          zip: this.user.zip,
        };

        try {
          await this.$store.dispatch("updateUserDetails", updatedUser);
          alert("Profile updated successfully!");
          this.isModified = false; // Reset modified flag
        } catch (error) {
          console.error("Error updating user details:", error);
        }
      }
    },
  },

  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}
.card-header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.table {
  margin-bottom: 0;
}
</style>
