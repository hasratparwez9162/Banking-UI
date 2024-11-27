<template>
  <TheSppiner :is-loading="isLoading" :size="size" />
  <div class="container mt-4">
    <h2 class="text-center">Open Account</h2>
    <p class="text-center">
      Please enter your details, and we will send a mail after successfully
      opening the account.
    </p>
    <form @submit.prevent="submitForm">
      <!-- Row 1: First Name and Last Name -->
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="firstName">First Name*</label>
          <input
            :class="['form-control', errors.firstNameClass]"
            type="text"
            id="firstName"
            v-model.trim="formData.firstName"
            @input="validateFirstName(formData.firstName)"
          />
          <span class="text-danger">{{ errors.firstName || "" }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <label for="lastName">Last Name*</label>
          <input
            :class="['form-control', errors.lastNameClass]"
            type="text"
            id="lastName"
            v-model.trim="formData.lastName"
            @input="validateLastName(formData.lastName)"
          />
          <span class="text-danger">{{ errors.lastName || "" }}</span>
        </div>
      </div>

      <!-- Row 2: Email and Gender -->
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="email">Email*</label>
          <input
            :class="['form-control', errors.emailClass]"
            type="email"
            id="email"
            v-model.trim="formData.email"
          />
          <span class="text-danger">{{ errors.email || "" }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <label for="gender">Gender*</label>
          <select
            id="gender"
            :class="['form-select', errors.genderClass]"
            v-model="formData.gender"
          >
            <option disabled value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <span class="text-danger">{{ errors.gender || "" }}</span>
        </div>
      </div>

      <!-- Row 3: Phone Numbers -->
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="phoneNumber">Phone Number*</label>
          <input
            :class="['form-control', errors.phoneNumberClass]"
            type="tel"
            id="phoneNumber"
            v-model.trim="formData.phoneNumber"
          />
          <span class="text-danger">{{ errors.phoneNumber || "" }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <label for="alternatePhoneNumber">Alternate Phone Number</label>
          <input
            :class="['form-control', errors.alternatePhoneNumberClass]"
            type="tel"
            id="alternatePhoneNumber"
            v-model.trim="formData.alternatePhoneNumber"
          />
          <span class="text-danger">{{
            errors.alternatePhoneNumber || ""
          }}</span>
        </div>
      </div>

      <!-- Row 4: Address -->
      <div class="mb-3">
        <label for="address">Address*</label>
        <input
          :class="['form-control', errors.addressClass]"
          type="text"
          id="address"
          v-model.trim="formData.address"
        />
        <span class="text-danger">{{ errors.address || "" }}</span>
      </div>

      <!-- Row 5: State and City -->
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="state">State*</label>
          <select
            :class="['form-select', errors.stateClass]"
            id="state"
            v-model="formData.selectedState"
            @change="fetchCities"
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
          <span class="text-danger">{{ errors.selectedState || "" }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <label for="city">City*</label>
          <select
            :class="['form-select', errors.cityClass]"
            id="city"
            v-model="formData.selectedCity"
          >
            <option disabled value="">Select City</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
          <span class="text-danger">{{ errors.selectedCity || "" }}</span>
        </div>
      </div>

      <!-- Row 6: Zip and Account Type -->
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="zip">Zip*</label>
          <input
            :class="['form-control', errors.zipClass]"
            type="text"
            id="zip"
            v-model.trim="formData.zip"
          />
          <span class="text-danger">{{ errors.zip || "" }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <label for="accountType">Account Type*</label>
          <select
            :class="['form-select', errors.accountTypeClass]"
            id="accountType"
            v-model="formData.accountType"
          >
            <option disabled value="">Select Account Type</option>
            <option value="SAVING">Saving</option>
            <option value="CURRENT">Current</option>
          </select>
          <span class="text-danger">{{ errors.accountType || "" }}</span>
        </div>
      </div>

      <!-- Row 7: File Uploads -->
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="image">Upload Profile Picture*</label>
          <input
            type="file"
            @change="onFileChange($event, 'picture')"
            class="form-control"
            accept="image/*"
          />
          <span class="text-danger">{{ errors.image || "" }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <label for="idProof">Upload ID Proof*</label>
          <input
            type="file"
            @change="onFileChange($event, 'idProof')"
            class="form-control"
            accept=".pdf, image/*"
          />
          <span class="text-danger">{{ errors.idProof || "" }}</span>
        </div>
      </div>

      <!-- Terms and Conditions -->
      <div class="form-check mb-3">
        <input
          type="checkbox"
          id="terms"
          v-model="formData.terms"
          class="form-check-input"
        />
        <label for="terms" class="form-check-label">
          I agree to the Terms and Conditions and authorize Aditi Bank to send
          mail.
        </label>
      </div>
      <span v-if="errors.terms" class="text-danger">{{ errors.terms }}</span>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary w-100 mt-3">
        Submit Form
      </button>
    </form>

    <!-- Success Dialog -->
    <SuccessDialog
      :dialog="dialog"
      :accountDetails="openAccountDetails"
      @close="closeDialog"
    />
  </div>
</template>

<script>
import SuccessDialog from "./SuccessDialog.vue";
import TheSppiner from "./TheSppiner.vue";
import AWS from "aws-sdk";
export default {
  components: {
    SuccessDialog,
    TheSppiner,
  },
  data() {
    return {
      country: "India",
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        phoneNumber: "",
        alternatePhoneNumber: "",
        address: "",
        selectedState: "",
        zip: "",
        selectedCity: "",
        accountType: "",
        terms: false,
        picture: null,
        idProof: null,
      },
      states: [],
      cities: [],

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
        cityClass: "form-control",
      },
      errorMessage: null,
      dialog: false,
      openAccountDetails: null,
      isLoading: false,
      size: "100px",
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
    // "formData.firstName"(newVal) {
    //   this.validateFirstName(newVal);
    // },
    // "formData.lastName"(newVal) {
    //   this.validateLastName(newVal);
    // },
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
    "formData.selectedState"(newVal) {
      this.validateState(newVal);
    },
    "formData.selectedCity"(newVal) {
      this.validateCity(newVal);
    },
    "formData.picture"(newVal) {
      this.validateimage(newVal);
    },
    "formData.idProof"(newVal) {
      this.validateIdProof(newVal);
    },
    "formData.terms"(newVal) {
      this.validateTerms(newVal);
    },
  },
  methods: {
    validateFirstName(value) {
      const namePattern = /^[A-Za-z]+$/;
      if (!value) {
        this.errors.firstNameClass = "form-select-invalid";
        this.errors.firstName = "First name is required.";
      } else if (value.length < 2) {
        this.errors.firstNameClass = "form-select-invalid";
        this.errors.firstName = "First name must be at least 2 characters.";
      } else if (value.length > 30) {
        this.errors.firstNameClass = "form-select-invalid";
        this.errors.firstName = "First name must be at most 30 characters.";
        this.formData.firstName = value.slice(0, 30);
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
        this.formData.lastName = value.slice(0, 30);
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
        this.errors.selectedState = "State is required.";
      } else if (!statePattern.test(value)) {
        this.errors.stateClass = "form-select-invalid";
        this.errors.selectedState =
          "State must contain only alphabetic characters.";
      } else if (value.length < 2 || value.length > 50) {
        this.errors.stateClass = "form-select-invalid";
        this.errors.selectedState =
          "State must be between 2 and 50 characters.";
      } else {
        this.errors.stateClass = "form-select-valid";
        this.errors.selectedState = null; // Clear error
      }
    },
    validateCity(value) {
      if (!value) {
        this.errors.cityClass = "form-select-invalid";
        this.errors.selectedCity = "City is required.";
      } else {
        this.errors.cityClass = "form-select-valid";
        this.errors.selectedCity = null; // Clear error
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
    validateimage(value) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!value) {
        this.errors.image = "Image is required.";
      } else if (!validTypes.includes(value.type)) {
        this.errors.image =
          "Invalid file type. Only JPEG, PNG, and GIF are allowed.";
      } else if (value.size > 2 * 1024 * 1024) {
        // 2 MB
        this.errors.image = "File size exceeds 2 MB.";
      } else {
        this.errors.image = null; // Clear error
      }
    },
    validateIdProof(value) {
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!value) {
        this.errors.idProof = "Id Proof is required.";
      } else if (!validTypes.includes(value.type)) {
        this.errors.idProof =
          "Invalid file type. Only image and PDF files are allowed.";
      } else if (value.size > 5 * 1024 * 1024) {
        this.errors.idProof = "File size exceeds 5 MB.";
      } else {
        this.errors.idProof = null; // Clear error
      }
    },
    validateTerms(value) {
      if (!value) {
        this.errors.terms = "You must agree to the Terms and Conditions.";
      } else {
        this.errors.terms = null; // Clear error
      }
    },
    validEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },

    onFileChange(event, type) {
      const file = event.target.files[0];
      if (type === "picture") {
        this.formData.picture = file;
      } else if (type === "idProof") {
        this.formData.idProof = file;
        this.validateIdProof(file);
      }
    },

    async uploadFileToS3(file) {
      // Step 1: Configure AWS SDK with your credentials
      AWS.config.update({
        accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
        region: process.env.VUE_APP_AWS_REGION,
      });

      const s3 = new AWS.S3();
      const params = {
        Bucket: "banking-aditi", // Your S3 bucket name
        Key: `${this.formData.firstName}_${this.formData.lastName}_${this.formData.phoneNumber}${file.name}`, // The name of the file to be saved
        Body: file, // The file itself
      };

      try {
        // Step 2: Upload the file to S3
        const data = await s3.upload(params).promise();
        return data.Location; // Return the URL of the uploaded file
      } catch (err) {
        console.error("Error uploading file to S3:", err);
        throw err; // Rethrow the error for handling
      }
    },

    async submitForm() {
      this.isLoading = true;
      this.validateFirstName(this.formData.firstName);
      this.validateLastName(this.formData.lastName);
      this.validateEmail(this.formData.email);
      this.validateGender(this.formData.gender);
      this.validatePhoneNumber(this.formData.phoneNumber);
      this.validateAlternatePhoneNumber(this.formData.alternatePhoneNumber);
      this.validateAddress(this.formData.address);
      this.validateState(this.formData.selectedState);
      this.validateZip(this.formData.zip);
      this.validateAccountType(this.formData.accountType);
      this.validateTerms(this.formData.terms);
      this.validateCity(this.formData.selectedCity);
      this.validateimage(this.formData.picture);
      this.validateIdProof(this.formData.idProof);

      // Check if any error exists in the form data
      if (
        this.errors.firstName ||
        this.errors.lastName ||
        this.errors.email ||
        this.errors.gender ||
        this.errors.phoneNumber ||
        this.errors.alternatePhoneNumber ||
        this.errors.address ||
        this.errors.selectedState ||
        this.errors.zip ||
        this.errors.accountType ||
        this.errors.terms ||
        this.errors.selectedCity ||
        this.errors.image ||
        this.errors.idProof
      ) {
        this.isLoading = false;
        return;
      }

      // Step 1: Upload files to S3 and get their URLs
      let pictureUrl = "";
      let idProofUrl = "";

      try {
        if (this.formData.picture) {
          pictureUrl = await this.uploadFileToS3(this.formData.picture);
        }

        if (this.formData.idProof) {
          idProofUrl = await this.uploadFileToS3(this.formData.idProof);
        }
      } catch (error) {
        this.isLoading = false;
        alert("Error uploading files. Please try again.");
        console.error("File upload error:", error);
        return; // Stop further execution if there's an error
      }

      // Prepare payload with file URLs
      const payload = {
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        gender: this.formData.gender,
        phoneNumber: this.formData.phoneNumber,
        accountType: this.formData.accountType,
        alternatePhoneNumber: this.formData.alternatePhoneNumber,
        address: this.formData.address,
        city: this.formData.selectedCity,
        state: this.formData.selectedState,
        zip: this.formData.zip,
        picturePath: pictureUrl, // Add picture URL
        idProofPath: idProofUrl, // Add ID proof URL
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
        if (response.status == 409) {
          throw new Error(
            "User Already Register, Please contact help desk or visit branch"
          );
        } else if (response.status == 226) {
          const errorResponse = await response.json();
          this.errorMessage = errorResponse;
          throw new Error(errorResponse);
        } else if (!response.ok) {
          const errorMessage = await response.json();
          console.log(errorMessage);
          throw new Error(`HTTP error! status: ${errorMessage}`);
        }

        const result = await response.text();
        this.isLoading = false;
        this.displayDetails(result);
      } catch (error) {
        this.isLoading = false;
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
        selectedState: "",
        zip: "",
        accountType: "",
        terms: false,
        picture: null,
        idProof: null,
      };
    },
    displayDetails(result) {
      this.openAccountDetails = result;
      this.dialog = true;
      this.clearForm();
      console.log(this.accountDetails);
    },
    closeDialog() {
      this.dialog = false; // Close the dialog
      this.$router.push("/"); // Redirect to the home page after closing
    },
    async fetchCities() {
      console.log("Fetching cities...");
      try {
        if (!this.formData.selectedState) return;

        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: this.country,
              state: this.formData.selectedState,
            }),
          }
        );
        const data = await response.json();
        this.cities = data.data; // Set the cities in dropdown
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
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
.text-danger {
  font-size: 12px !important;
  text-align: left !important;
  display: block !important;
  margin-top: 5px !important;
}
.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 40%;
  margin: auto;
  margin-top: 67px !important;
}
label {
  text-align: left;
  display: block; /* Ensures labels take full width */
}
/*
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
.SingleContent {
  width: 90%;
  left: 5%;
  position: relative;
  text-align: left;
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
} */
</style>
