<template>
  <div class="container-fluid my-4">
    <!-- User Information Form -->
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-info">
        <h5>Personal Details</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateUserDetails">
          <!-- First Name and Last Name -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="firstName" class="form-label">First Name</label>
              <div class="input-group">
                <input
                  type="text"
                  id="firstName"
                  class="form-control"
                  v-model="user.firstName"
                  :disabled="!editableFields.firstName.isEditable"
                />
                <!-- <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="toggleEditField('firstName')"
                >
                  <i
                    v-if="!editableFields.firstName.isEditable"
                    class="bi bi-pencil"
                  ></i>
                  <i v-else class="bi bi-save"></i>
                </button> -->
              </div>
            </div>
            <div class="col-md-6">
              <label for="lastName" class="form-label">Last Name</label>
              <div class="input-group">
                <input
                  type="text"
                  id="lastName"
                  class="form-control"
                  v-model="user.lastName"
                  :disabled="!editableFields.lastName.isEditable"
                />
                <!-- <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="toggleEditField('lastName')"
                >
                  <i
                    v-if="!editableFields.lastName.isEditable"
                    class="bi bi-pencil"
                  ></i>
                  <i v-else class="bi bi-save"></i>
                </button> -->
              </div>
            </div>
          </div>

          <!-- Email and Phone Number -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="email" class="form-label">Email</label>
              <div class="input-group">
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="user.email"
                  :disabled="!editableFields.email.isEditable"
                />
                <!-- <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="toggleEditField('email')"
                >
                  <i
                    v-if="!editableFields.email.isEditable"
                    class="bi bi-pencil"
                  ></i>
                  <i v-else class="bi bi-save"></i>
                </button> -->
              </div>
            </div>
            <div class="col-md-6">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <div class="input-group">
                <input
                  type="tel"
                  id="phoneNumber"
                  class="form-control"
                  v-model="user.phoneNumber"
                  :disabled="!editableFields.phoneNumber.isEditable"
                />
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="toggleEditField('phoneNumber')"
                >
                  <i
                    v-if="!editableFields.phoneNumber.isEditable"
                    class="bi bi-pencil"
                  ></i>
                  <i v-else class="bi bi-save"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- City and State -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="city" class="form-label">City</label>
              <div class="input-group">
                <input
                  type="text"
                  id="city"
                  class="form-control"
                  v-model="user.city"
                  :disabled="!editableFields.city.isEditable"
                />
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="toggleEditField('city')"
                >
                  <i
                    v-if="!editableFields.city.isEditable"
                    class="bi bi-pencil"
                  ></i>
                  <i v-else class="bi bi-save"></i>
                </button>
              </div>
            </div>
            <div class="col-md-6">
              <label for="state" class="form-label">State</label>
              <div class="input-group">
                <input
                  type="text"
                  id="state"
                  class="form-control"
                  v-model="user.state"
                  :disabled="!editableFields.state.isEditable"
                />
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="toggleEditField('state')"
                >
                  <i
                    v-if="!editableFields.state.isEditable"
                    class="bi bi-pencil"
                  ></i>
                  <i v-else class="bi bi-save"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- ZIP Code -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="zip" class="form-label">ZIP Code</label>
              <div class="input-group">
                <input
                  type="text"
                  id="zip"
                  class="form-control"
                  v-model="user.zip"
                  :disabled="!editableFields.zip.isEditable"
                />
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="toggleEditField('zip')"
                >
                  <i
                    v-if="!editableFields.zip.isEditable"
                    class="bi bi-pencil"
                  ></i>
                  <i v-else class="bi bi-save"></i>
                </button>
              </div>
            </div>
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
      editableFields: {
        firstName: { label: "First Name", type: "text", isEditable: false },
        lastName: { label: "Last Name", type: "text", isEditable: false },
        email: { label: "Email", type: "email", isEditable: false },
        phoneNumber: { label: "Phone Number", type: "tel", isEditable: false },
        city: { label: "City", type: "text", isEditable: false },
        state: { label: "State", type: "text", isEditable: false },
        zip: { label: "ZIP Code", type: "text", isEditable: false },
      },
    };
  },
  methods: {
    toggleEditField(fieldKey) {
      const field = this.editableFields[fieldKey];
      if (field.isEditable) {
        // Save changes
        this.updateUserDetails();
      }
      field.isEditable = !field.isEditable;
    },
    updateUserDetails() {
      // Simulate an API call to update user details
      console.log("User details updated", this.user);
      alert("Profile updated successfully!");
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
