<template>
  <div class="container">
    <h2>Open Account</h2>
    <p>
      Please enter your details and we will send a mail after successfully
      opening the account.
    </p>
    <form @submit.prevent="submitForm">
      <div class="twoFieldContainer">
        <div class="twoFieldContent">
          <label for="firstName">First Name*</label>
          <input
            :class="errors.firstNameClass"
            type="text"
            id="firstName"
            v-model.trim="formData.firstName"
          />
          <span class="error">{{ errors.firstName || "" }}</span>
        </div>
        <div class="twoFieldContent">
          <label for="lastName">Last Name*</label>
          <input
            :class="errors.lastNameClass"
            type="text"
            id="lastName"
            v-model.trim="formData.lastName"
          />
          <span class="error">{{ errors.lastName || "" }}</span>
        </div>
      </div>
      <div class="twoFieldContainer">
        <div class="twoFieldContent">
          <label for="email">Email*</label>
          <input
            :class="errors.emailClass"
            type="email"
            id="email"
            v-model.trim="formData.email"
          />
          <span class="error">{{ errors.email || "" }}</span>
        </div>
        <div class="twoFieldContent">
          <label for="gender">Gender*</label>
          <select
            id="gender"
            :class="errors.genderClass"
            v-model="formData.gender"
          >
            <option disabled value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <span class="error">{{ errors.gender || "" }}</span>
        </div>
      </div>
      <div class="twoFieldContainer">
        <div class="twoFieldContent">
          <label for="phoneNumber">Phone Number*</label>
          <input
            :class="errors.phoneNumberClass"
            type="tel"
            id="phoneNumber"
            v-model.trim="formData.phoneNumber"
          />
          <span class="error">{{ errors.phoneNumber || "" }}</span>
        </div>
        <div class="twoFieldContent">
          <label for="alternatePhoneNumber">Alternate Phone Number</label>
          <input
            :class="errors.alternatePhoneNumberClass"
            type="tel"
            id="alternatePhoneNumber"
            v-model.trim="formData.alternatePhoneNumber"
          />
          <span class="error">{{ errors.alternatePhoneNumber || "" }}</span>
        </div>
      </div>
      <div class="twoFieldContainer">
        <div class="twoFieldContent">
          <label for="address">Address*</label>
          <input
            :class="errors.addressClass"
            type="text"
            id="address"
            v-model.trim="formData.address"
          />
          <span class="error">{{ errors.address || "" }}</span>
        </div>
        <div class="twoFieldContent">
          <label for="state">State*</label>
          <select
            :class="errors.stateClass"
            id="state"
            v-model.trim="formData.state"
          >
            <option disabled value="">Select State</option>
            <option
              v-for="state in states"
              :key="state.iso2"
              :value="state.name"
            >
              {{ state.name }}
            </option>
          </select>
          <span class="error">{{ errors.state || "" }}</span>
        </div>
      </div>
      <div class="twoFieldContainer">
        <div class="twoFieldContent">
          <label for="zip">Zip*</label>
          <input
            :class="errors.zipClass"
            type="text"
            id="zip"
            v-model.trim="formData.zip"
          />
          <span class="error">{{ errors.zip || "" }}</span>
        </div>
        <div class="twoFieldContent">
          <label for="accountType">Account Type*</label>
          <select
            :class="errors.accountTypeClass"
            id="accountType"
            v-model.trim="formData.accountType"
          >
            <option disabled value="">Select Account Type</option>
            <option value="SAVING">Saving</option>
            <option value="CURRENT">Current</option>
          </select>
          <span class="error">{{ errors.accountType || "" }}</span>
        </div>
      </div>

      <div class="checkbox">
        <input type="checkbox" id="terms" v-model="formData.terms" />
        <label for="terms">
          I agree to the Terms and Conditions and authorize HP Bank to send
          mail.
        </label>
      </div>
      <span v-if="errors.terms" class="errorterm">{{ errors.terms }}</span>

      <button type="submit" class="submit-btn">Submit Form</button>
    </form>

    <div v-if="dialog" max-width="500" class="dialog-container">
      <div class="dialog-card">
        <div class="headline dialog-header">Congratulations !!</div>
        <div v-if="accountDetails" class="dialog-body">
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
            <strong>Note:</strong> Please save these details for your Net
            Banking registration.
          </p>
        </div>
        <div class="dialog-footer">
          <div></div>
          <button class="custom-button" @click="closeDialog">OK</button>
        </div>
      </div>
    </div>
  </div>
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
      states: [],

      errors: {
        firstNameClass: "form-control",
        lastNameClass: "form-control",
        emailClass: "form-control",
        phoneNumberClass: "form-control",
        alternatePhoneNumberClass: "form-control",
        addressClass: "form-control",
        stateClass: "form-control",
        zipClass: "form-control",
        genderClass: "form-control",
        accountTypeClass: "form-control",
      },
      errorMessage: null,
      dialog: false,
      accountDetails: null,
    };
  },
  watch: {
    "formData.accountType"(newVal) {
      this.validateAccountType(newVal);
    },
    "formData.gender"(newVal) {
      this.validateGender(newVal);
    },
    "formData.address"(newVal) {
      this.validateAddress(newVal);
    },
    "formData.firstName"(newVal) {
      this.validateFirstName(newVal);
    },
    "formData.lastName"(newVal) {
      this.validateLastName(newVal);
    },
    "formData.email"(newVal) {
      this.validateEmail(newVal);
    },
    "formData.phoneNumber"(newVal) {
      this.validatePhoneNumber(newVal);
    },
    "formData.alternatePhoneNumber"(newVal) {
      this.validateAlternatePhoneNumber(newVal);
    },
    "formData.zip"(newVal) {
      this.validateZip(newVal);
    },
    "formData.state"(newVal) {
      this.validateState(newVal);
    },
  },
  methods: {
    validateFirstName(value) {
      const namePattern = /^[A-Za-z]+$/;
      if (!value) {
        this.errors.firstNameClass = "form-select-invalid";
        this.errors.firstName = "First name is required.";
      } else if (value.length < 2 || value.length > 30) {
        this.errors.firstNameClass = "form-select-invalid";
        this.errors.firstName =
          "First name must be between 2 and 30 characters.";
      } else if (!namePattern.test(value)) {
        this.errors.firstNameClass = "form-select-invalid";
        this.errors.firstName =
          "First name must contain only alphabetic characters.";
      } else {
        this.errors.firstNameClass = "form-select-valid";
        this.errors.firstName = null; // Clear error
      }
    },
    validateLastName(value) {
      const namePattern = /^[A-Za-z]+$/;
      if (!value) {
        this.errors.lastNameClass = "form-select-invalid";
        this.errors.lastName = "Last name is required.";
      } else if (value.length < 2 || value.length > 30) {
        this.errors.lastNameClass = "form-select-invalid";
        this.errors.lastName = "Last name must be between 2 and 30 characters.";
      } else if (!namePattern.test(value)) {
        this.errors.lastNameClass = "form-select-invalid";
        this.errors.lastName =
          "Last name must contain only alphabetic characters.";
      } else {
        this.errors.lastNameClass = "form-select-valid";
        this.errors.lastName = null; // Clear error
      }
    },
    validateEmail(value) {
      if (!value) {
        this.errors.emailClass = "form-select-invalid";
        this.errors.email = "Email is required.";
      } else if (!this.validEmail(value)) {
        this.errors.emailClass = "form-select-invalid";
        this.errors.email = "Please enter a valid email address.";
      } else {
        this.errors.emailClass = "form-select-valid";
        this.errors.email = null; // Clear error
      }
    },
    validateGender(value) {
      if (!value) {
        this.errors.genderClass = "form-select-invalid";
        this.errors.gender = "Gender is required.";
      } else {
        this.errors.genderClass = "form-select-valid";
        this.errors.gender = null; // Clear error
      }
    },
    validatePhoneNumber(value) {
      if (!value) {
        this.errors.phoneNumberClass = "form-select-invalid";
        this.errors.phoneNumber = "Phone number is required.";
      } else if (!/^\d{10}$/.test(value)) {
        this.errors.phoneNumberClass = "form-select-invalid";
        this.errors.phoneNumber = "Phone number must be exactly 10 digits.";
      } else {
        this.errors.phoneNumberClass = "form-select-valid";
        this.errors.phoneNumber = null; // Clear error
      }
    },
    validateAlternatePhoneNumber(value) {
      if (!value) {
        this.errors.alternatePhoneNumber = "";
      } else if (!/^\d{10}$/.test(value)) {
        this.errors.alternatePhoneNumberClass = "form-select-invalid";
        this.errors.alternatePhoneNumber =
          "Alternate Phone number must be exactly 10 digits.";
      } else if (value == this.formData.phoneNumber) {
        this.errors.alternatePhoneNumberClass = "form-select-invalid";
        this.errors.alternatePhoneNumber =
          "Alternate Number Should be diffrent from Phone number";
      } else {
        this.errors.alternatePhoneNumberClass = "form-select-valid";
        this.errors.alternatePhoneNumber = null; // Clear error
      }
    },
    validateAccountType(value) {
      if (!value) {
        this.errors.accountTypeClass = "form-select-invalid";
        this.errors.accountType = "Account Type is required.";
      } else {
        this.errors.accountType = null; // Clear error
        this.errors.accountTypeClass = "form-select-valid";
      }
    },
    validateAddress(value) {
      const addressPattern = /^[a-zA-Z0-9#][a-zA-Z0-9\s,.-]*$/;
      if (!value) {
        this.errors.addressClass = "form-select-invalid";
        this.errors.address = "Address is required.";
      } else if (!addressPattern.test(value)) {
        this.errors.addressClass = "form-select-invalid";
        this.errors.address =
          "Address contains invalid characters. Only letters, numbers, spaces, commas, periods, and hyphens are allowed.";
      } else {
        this.errors.addressClass = "form-select-valid";
        this.errors.address = null; // Clear error
      }
    },

    validateState(value) {
      const statePattern = /^[A-Za-z ]+$/;
      if (!value) {
        this.errors.stateClass = "form-select-invalid";
        this.errors.state = "State is required.";
      } else if (!statePattern.test(value)) {
        this.errors.stateClass = "form-select-invalid";
        this.errors.state = "State must contain only alphabetic characters.";
      } else if (value.length < 2 || value.length > 50) {
        this.errors.stateClass = "form-select-invalid";
        this.errors.state = "State must be between 2 and 50 characters.";
      } else {
        this.errors.stateClass = "form-select-valid";
        this.errors.state = null; // Clear error
      }
    },
    validateZip(value) {
      if (!value) {
        this.errors.zipClass = "form-select-invalid";
        this.errors.zip = "Zip code is required.";
      } else if (!/^\d{6}$/.test(value)) {
        this.errors.zipClass = "form-select-invalid";
        this.errors.zip = "Please enter a valid 6-digit zip code.";
      } else {
        this.errors.zipClass = "form-select-valid";
        this.errors.zip = null; // Clear error
      }
    },
    validateTerms() {
      if (!this.formData.terms) {
        this.errors.terms = "You must agree to the Terms and Conditions.";
      } else {
        this.errors.terms = null; // Clear error
      }
    },
    validEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },
    async submitForm() {
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
        console.log(payload);
        let url = "http://localhost:8080/users/open-account";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          console.log(errorMessage);
          throw new Error(`HTTP error! status: ${errorMessage}`);
        } else if (response.status == 226) {
          const errorResponce = await response.json();
          this.errorMessage = errorResponce;
          alert(`Warning: ${errorResponce}`);
          throw new Error(errorResponce);
        }

        const result = await response.json();
        this.displayAccountDetails(result);
      } catch (error) {
        alert(error);
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
    fetchStates() {
      const payload = {
        country: "India",
      };

      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((result) => {
          this.states = result.data.states;
          console.log(result.data.states); // Populate the states array with the fetched data
        })
        .catch((error) => console.log("Error fetching states:", error));
    },
  },
  mounted() {
    this.fetchStates();
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
input[type="tel"],
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 6px;
  box-sizing: border-box;
  border: 2px solid #bfc3be;
  outline: none;
  color: #666;
}
input[type="checkbox"] {
  margin-top: 20px;
}
option {
  text-align: left;
  color: #666;
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
  min-height: 12px;
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: flex;
  text-align: left;
}
.errorterm {
  min-height: 12px;
  color: red;
  font-size: 12px;
  margin-top: 5px;

  max-height: 12px;
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
.twoFieldContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.twoFieldContainer label {
  text-align: left;
}
.twoFieldContent {
  width: 40%;
}
.form-control:focus {
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.form-select-invalid:focus {
  border-color: red;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}
.form-select-valid:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
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
