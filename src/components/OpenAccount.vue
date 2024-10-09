<template>
  <div class="container">
    <h2>Open Account</h2>
    <p>
      Please enter your details and we will send a mail after successfully
      opening the account.
    </p>
    <form @submit.prevent="submitForm">
      <label for="firstName">First Name*</label>
      <input type="text" id="firstName" v-model="formData.firstName" />
      <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>

      <label for="lastName">Last Name*</label>
      <input type="text" id="lastName" v-model="formData.lastName" />
      <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>

      <label for="email">Email*</label>
      <input type="email" id="email" v-model="formData.email" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>

      <label for="gender">Gender*</label>
      <select id="gender" v-model="formData.gender">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <span v-if="errors.gender" class="error">{{ errors.gender }}</span>

      <label for="phoneNumber">Phone Number*</label>
      <input type="number" id="phoneNumber" v-model="formData.phoneNumber" />
      <span v-if="errors.phoneNumber" class="error">{{
        errors.phoneNumber
      }}</span>

      <label for="alternatePhoneNumber">Alternate Phone Number</label>
      <input
        type="number"
        id="alternatePhoneNumber"
        v-model="formData.alternatePhoneNumber"
      />
      <label for="accountType">Account Type*</label>
      <select id="accountType" v-model="formData.accountType">
        <option value="SAVING">Saving</option>
        <option value="CURRENT">Current</option>
      </select>
      <span v-if="errors.accountType" class="error">{{
        errors.accountType
      }}</span>

      <label for="address">Address*</label>
      <input type="text" id="address" v-model="formData.address" />
      <span v-if="errors.address" class="error">{{ errors.address }}</span>

      <label for="state">State*</label>
      <input type="text" id="state" v-model="formData.state" />
      <span v-if="errors.state" class="error">{{ errors.state }}</span>
      <label for="zip">zip*</label>
      <input type="text" id="zip" v-model="formData.zip" />
      <span v-if="errors.zip" class="error">{{ errors.zip }}</span>
      <div class="checkbox">
        <div>
          <input type="checkbox" id="terms" v-model="formData.terms" />
        </div>
        <div>
          <label for="terms">
            I agree to the Terms and Conditions and authorize HP bank to send
            mail.
          </label>
        </div>
      </div>
      <span v-if="errors.terms" class="error">{{ errors.terms }}</span>

      <button type="submit" class="submit-btn">Submit Form</button>
    </form>
  </div>
  <v-dialog v-if="dialog" max-width="500" class="dialog-container">
    <v-card class="dialog-card">
      <v-card-title class="headline dialog-header"
        >Congratulations !!</v-card-title
      >
      <v-card-text v-if="accountDetails" class="dialog-body">
        <p>Account opened successfully! Here are your details:</p>
        <p>
          <strong>Name:</strong> {{ accountDetails.firstName }}
          {{ accountDetails.lastName }}
        </p>
        <p><strong>Email:</strong> {{ accountDetails.email }}</p>
        <p><strong>Phone Number:</strong> {{ accountDetails.phoneNumber }}</p>
        <p>
          <strong>Address:</strong> {{ accountDetails.address }},
          {{ accountDetails.state }} {{ accountDetails.zip }}
        </p>
        <p>
          <strong>Account Number:</strong>
          {{ accountDetails.accounts[0].accountNumber }}
        </p>
        <p>
          <strong>Balance:</strong> ₹{{ accountDetails.accounts[0].balance }}
        </p>
        <p>
          <strong>Date Opened:</strong>
          {{ accountDetails.accounts[0].dateOpened }}
        </p>
        <p class="note">
          <strong>Note:</strong> Please save these details for your Net Banking
          registration.
        </p>
      </v-card-text>
      <v-card-actions class="dialog-footer">
        <v-spacer></v-spacer>
        <v-btn class="custom-button" @click="closeDialog">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        phoneNumber: "",
        alternatePhoneNumber: "",
        address: "",
        state: "",
        zip: "",
        accountType: "",
        terms: false,
      },
      errors: {},
      errorMessage: null,
      dialog: false,
      accountDetails: null,
    };
  },
  methods: {
    validateForm() {
      this.errors = {}; // Reset errors

      // Check required fields
      if (!this.formData.firstName) {
        this.errors.firstName = "First name is required.";
      }
      if (!this.formData.lastName) {
        this.errors.lastName = "Last name is required.";
      }
      if (!this.formData.email) {
        this.errors.email = "Email is required.";
      } else if (!this.validEmail(this.formData.email)) {
        this.errors.email = "Please enter a valid email address.";
      }
      if (!this.formData.gender) {
        this.errors.gender = "Gender is required.";
      }
      if (!this.formData.accountType) {
        this.errors.accountType = "Account Type is required.";
      }
      if (!this.formData.phoneNumber) {
        this.errors.phoneNumber = "Phone number is required.";
      }
      if (!this.formData.address) {
        this.errors.address = "Address is required.";
      }
      if (!this.formData.state) {
        this.errors.state = "State is required.";
      }
      if (!this.formData.zip) {
        this.errors.zip = "zip is required.";
      }
      if (!this.formData.terms) {
        this.errors.terms = "You must agree to the Terms and Conditions.";
      }

      // Return true if there are no errors
      return Object.keys(this.errors).length === 0;
    },
    validEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    async submitForm() {
      // Validate the form first
      if (!this.validateForm()) {
        // If validation fails, scroll to the top to show errors

        window.scrollTo(0, 0);
        return;
      }

      const payload = {
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        gender: this.formData.gender,
        phoneNumber: this.formData.phoneNumber,
        accountType: this.formData.accountType,
        alternatePhoneNumber: this.formData.alternatePhoneNumber,
        address: this.formData.address,
        state: this.formData.state,
        zip: this.formData.zip,
      };

      try {
        let url = "http://localhost:8080/users/open-account";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else if (response.status == 226) {
          const errorResponce = await response.text();
          this.errorMessage = errorResponce;
          alert(`Warning: ${errorResponce}`);
          throw new Error(errorResponce);
        }

        const result = await response.json();
        this.displayAccountDetails(result);
      } catch (error) {
        console.error("Error opening account:", error);
      }
    },
    clearForm() {
      this.formData = {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        phoneNumber: "",
        alternatePhoneNumber: "",
        address: "",
        state: "",
        zip: "",
        accountType: "",
        terms: false,
      };
    },
    displayAccountDetails(result) {
      this.accountDetails = result;
      this.dialog = true;
      this.clearForm();
      console.log(this.accountDetails);
    },
    closeDialog() {
      this.dialog = false; // Close the dialog
      this.$router.push("/"); // Redirect to the home page after closing
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 40%;
  margin: auto;
  margin-top: 60px;
}
h2 {
  text-align: center;
  color: #333;
}
p {
  text-align: center;
  color: #666;
}
label {
  display: block;
  margin-top: 20px;
  color: #666;
}
input[type="text"],
input[type="email"],
input[type="number"],
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  box-sizing: border-box;
  border-bottom: 2px solid #bfc3be;
  outline: none;
}
input[type="checkbox"] {
  margin-top: 20px;
}
option {
  text-align: center;
}
.checkbox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
}
.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}
.submit-btn:hover {
  background-color: #ff3333;
}
.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
.dialog-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.dialog-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  display: block;
  height: 58%;
  margin: auto;
}

.dialog-header {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  color: #0909a7;
}

.dialog-body {
  margin-bottom: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}

.dialog-footer .v-btn {
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.custom-button {
  background-color: #007bff !important;
  color: #fff !important;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #0056b3 !important;
}
.note {
  margin-top: 20px;
  padding: 10px;
  background-color: #fff3cd;
  border-left: 4px solid #ffecb5;
  font-size: 14px;
  color: #856404;
  border-radius: 4px;
}

@media (max-width: 600px) {
  .dialog-container {
    width: 90%;
    padding: 10px;
  }
  .dialog-card {
    width: 100%;
    height: 63%;
  }
  .container {
    width: 88%;
  }
}
</style>
