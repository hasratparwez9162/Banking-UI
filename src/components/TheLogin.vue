<template>
  <div
    class="container-fluid d-flex justify-content-center align-items-center mt-5"
    style="height: 100vh"
  >
    <!-- Left side image -->
    <div class="col-lg-6 d-none d-lg-block">
      <img
        src="@/assets/banner-woman.png"
        alt="Logo"
        class="img-fluid"
        style="object-fit: cover; height: 100vh"
      />
    </div>
    <!-- Right side login form -->
    <div class="col-lg-6 d-flex justify-content-center align-items-center">
      <div class="card p-4 shadow-lg w-100" style="max-width: 400px">
        <div class="text-center mb-4">
          <img
            src="@/assets/logo.png"
            alt="Logo"
            class="img-fluid mb-3"
            style="max-width: 150px"
          />
          <h2 class="h4">Login to Your Account</h2>
        </div>
        <form @submit.prevent="login">
          <div class="form-group">
            <input
              type="text"
              v-model="email"
              class="form-control"
              placeholder="Username or Email"
            />
            <div v-if="emailError" class="text-danger small text-start">
              {{ emailError }}
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <div class="input-group-append">
              <span class="input-group-text" @click="togglePasswordVisibility">
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
            <div
              v-if="passwordError"
              class="text-danger small text-start w-100"
            >
              {{ passwordError }}
            </div>
          </div>

          <div class="d-flex justify-content-end mb-3">
            <a href="/forgetpassword" class="text-primary">Forgot Password?</a>
          </div>
          <button type="submit" class="btn btn-primary w-100">Sign In</button>
        </form>
        <hr />
        <div class="text-center">
          <h2 class="h3">New Here?</h2>
          <p>
            <a href="/signup">Sign Up</a> and discover a great amount of new
            features!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import CryptoJS from "crypto-js";

library.add(faEye, faEyeSlash);

export default {
  name: "TheLogin",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      email: "",
      password: "",
      emailError: null,
      passwordError: null,
      showPassword: false,
    };
  },
  methods: {
    validateEmail() {
      if (!this.email) {
        this.emailError = "Username or Email is required.";
      } else if (this.email.length < 3 || this.email.length > 50) {
        this.emailError = "Must be between 3 and 50 characters.";
      } else {
        this.emailError = null; // Clear error
      }
    },
    validatePassword() {
      if (!this.password) {
        this.passwordError = "Password is required.";
      } else if (this.password.length < 6 || this.password.length > 15) {
        this.passwordError = "Password must be between 6 and 15 characters.";
      } else {
        this.passwordError = null; // Clear error
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      this.validateEmail();
      this.validatePassword();

      if (this.emailError || this.passwordError) {
        return;
      }

      const secretKey = CryptoJS.enc.Base64.parse(
        "E7P/iFOV3eLtlcpPQQVu5T0LVmm0Sxl2GJwHbNN9Eqg="
      );
      const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
      const encryptedPassword = CryptoJS.AES.encrypt(this.password, secretKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();

      const loginData = {
        username: this.email,
        password: encryptedPassword,
      };

      try {
        this.$store.state.isLoading = true;
        const response = await fetch("http://localhost:8080/apigateway/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(JSON.stringify(errorData));
        }

        const data = await response.json();
        console.log("Login successful", data);
        const isLogin = true;
        const token = data.access_token;

        // Decode JWT to check roles
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const roles = decodedToken.realm_access.roles;
        const isAdmin = roles.includes("admin");
        const email = decodedToken.email;

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        this.$store.dispatch("setToken", token);
        this.$store.dispatch("setEmail", email);
        this.$store.dispatch("setLogin", isLogin);

        await this.fetchUserData({ token, email });
        await this.fetchTransaction(token);
        if (isAdmin) {
          this.$router.push("/admindashboard");
          this.$store.dispatch("setIsAdmin", true);
        } else if (roles.includes("employee")) {
          this.$store.dispatch("setIsEmployee", true);
          this.$router.push("/employeedashboard");
        } else {
          this.$router.push("/dashboard-v1");
        }

        this.$store.state.isLoading = false;
      } catch (error) {
        console.error("Error during login", error);
        alert("Invalid credentials. Please try again.");
        this.$store.state.isLoading = false;
      }
    },

    async fetchUserData({ token, email }) {
      this.$store.dispatch("setIsLoading", true);
      console.log("Fetching user data...");
      await this.$store.dispatch("fetchUserData", { token, email });
      console.log("User data fetched successfully");
      this.$store.dispatch("setIsLoading", false);
    },
    async fetchTransaction(token) {
      const localaccount = localStorage.getItem("accounts");
      if (localaccount) {
        console.log("Fetct TX", token);
        const accounts = JSON.parse(localaccount);
        const accountNumber = accounts[0].accountNumber;
        await this.$store.dispatch("fetchTransactions", {
          token,
          accountNumber,
        });
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}
.form-control {
  margin-bottom: 0.625rem;
}
.text-danger {
  font-size: 0.8rem;
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
