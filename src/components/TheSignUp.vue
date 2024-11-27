<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="row w-100">
      <!-- Left Column (Image) -->
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <img
          src="@/assets/banner-woman.png"
          alt="Sign Up Image"
          class="img-fluid"
          style="max-height: 100vh; object-fit: cover"
        />
      </div>

      <!-- Right Column (Sign Up Form) -->
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <div class="card shadow-lg p-4 w-75">
          <img
            src="@/assets/logo.png"
            alt="Logo"
            class="card-img-top mx-auto d-block mb-3"
            style="max-width: 150px"
          />
          <h3 class="text-center mb-3">Sign Up For NetBanking</h3>

          <form @submit.prevent="signup">
            <!-- First Name and Last Name side by side -->
            <div class="mb-3 row">
              <div class="col-md-6">
                <label for="firstname" class="form-label">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  class="form-control"
                  v-model="firstname"
                  placeholder="Enter first name"
                  @input="validateField('firstname', firstname)"
                />
                <small class="text-danger">{{ errors.firstname }}</small>
              </div>

              <div class="col-md-6">
                <label for="lastname" class="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  class="form-control"
                  v-model="lastname"
                  placeholder="Enter last name"
                  @input="validateField('lastname', lastname)"
                />
                <small class="text-danger">{{ errors.lastname }}</small>
              </div>
            </div>

            <!-- Username and Account Number side by side -->
            <div class="mb-3 row">
              <div class="col-md-6">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  v-model="username"
                  placeholder="Enter username"
                  @input="validateField('username', username)"
                />
                <small class="text-danger">{{ errors.username }}</small>
              </div>

              <div class="col-md-6">
                <label for="accountNumber" class="form-label"
                  >Account Number</label
                >
                <input
                  type="text"
                  id="accountNumber"
                  class="form-control"
                  v-model="accountNumber"
                  placeholder="Enter account number"
                  @input="validateField('accountNumber', accountNumber)"
                />
                <small class="text-danger">{{ errors.accountNumber }}</small>
              </div>
            </div>

            <!-- Email and Password side by side -->
            <div class="mb-3 row">
              <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Enter email"
                  @input="validateField('email', email)"
                />
                <small class="text-danger">{{ errors.email }}</small>
              </div>

              <div class="col-md-6 position-relative">
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    class="form-control"
                    v-model="password"
                    placeholder="Enter password"
                    @input="validateField('password', password)"
                  />
                  <div class="input-group-append">
                    <span
                      class="input-group-text"
                      @click="togglePasswordVisibility"
                    >
                      <font-awesome-icon
                        v-if="showPassword"
                        :icon="['fas', 'eye-slash']"
                        class="password-toggle-icon"
                      />
                      <font-awesome-icon
                        v-else
                        :icon="['fas', 'eye']"
                        class="password-toggle-icon"
                      />
                    </span>
                  </div>
                </div>
                <small class="text-danger">
                  <span
                    v-if="
                      errors.password && typeof errors.password === 'string'
                    "
                  >
                    {{ errors.password }}
                  </span>
                  <ul v-else>
                    <li v-for="(error, index) in errors.password" :key="index">
                      {{ error }}
                    </li>
                  </ul>
                </small>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="isLoading"
            >
              Sign Up
              <span
                v-if="isLoading"
                class="spinner-border spinner-border-sm ms-2"
                role="status"
              ></span>
            </button>
          </form>

          <div class="text-center mt-4">
            <p>
              Already have an account?
              <router-link to="/login" class="btn btn-link text-decoration-none"
                >Sign In</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEye, faEyeSlash);
export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      accountNumber: "",
      errors: {},
      isLoading: false,
      showPassword: false,
    };
  },
  methods: {
    validateField(field, value) {
      const patterns = {
        username: /^[A-Za-z0-9_]{3,15}$/,
        firstname: /^[A-Za-z]{2,30}$/,
        lastname: /^[A-Za-z]{2,30}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: {
          length: /.{6,}/,
          uppercase: /[A-Z]/,
          lowercase: /[a-z]/,
          number: /\d/,
          special: /[!@#$%^&*(),.?":{}|<>]/,
        },
        accountNumber: /^\d{10,12}$/,
      };

      const requiredMessage = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required.`;

      if (!value) {
        this.errors[field] = requiredMessage;
        return;
      }

      if (field === "password") {
        const passwordChecks = [];
        if (!patterns.password.length.test(value)) {
          passwordChecks.push("At least 6 characters.");
        }
        if (!patterns.password.uppercase.test(value)) {
          passwordChecks.push("At least one uppercase letter.");
        }
        if (!patterns.password.lowercase.test(value)) {
          passwordChecks.push("At least one lowercase letter.");
        }
        if (!patterns.password.number.test(value)) {
          passwordChecks.push("At least one number.");
        }
        if (!patterns.password.special.test(value)) {
          passwordChecks.push("At least one special character.");
        }

        this.errors[field] = passwordChecks.length > 0 ? passwordChecks : null;
      } else if (patterns[field] && !patterns[field].test(value)) {
        this.errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } format is invalid.`;
      } else {
        this.errors[field] = null; // Clear error
      }
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    signup() {
      for (const field of [
        "username",
        "firstname",
        "lastname",
        "email",
        "password",
        "accountNumber",
      ]) {
        this.validateField(field, this[field]);
      }

      if (Object.values(this.errors).some((error) => error)) {
        return; // Stop if there are validation errors
      }
      this.isLoading = true;
      const signUpData = {
        username: this.username,
        firstName: this.firstname,
        lastName: this.lastname,
        email: this.email, // Assuming the email field is used for username
        password: this.password,
        accountNumber: this.accountNumber,
      };

      fetch("http://localhost:8080/apigateway/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((err) => {
              // Get error details
              throw new Error("Error: " + err);
            });
          }
          return response;
        })
        .then((data) => {
          console.log("SignUp Successfully", data);
          alert("SignUp successful");
          this.isLoading = false;
          this.$router.push("/login");
        })
        .catch((error) => {
          this.isLoading = false;
          console.error("Error during signup", error);
        });
    },
  },
};
</script>

<style scoped>
label {
  text-align: left !important;
  display: block;
}
.text-danger {
  margin-top: 0.625rem;
  font-size: 13px !important;
  text-align: left !important;
  display: flex;
  justify-content: flex-start;
}

.row {
  height: auto;
}

.card {
  height: auto !important;
  max-height: none !important;
}

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.d-flex {
  min-height: 100vh;
}
.password-toggle-icon {
  cursor: pointer;
  color: #6c757d; /* Default color */
  height: 1.5rem;
}
.password-toggle-icon:hover {
  color: #495057; /* Hover color */
}
.input-group-text {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
