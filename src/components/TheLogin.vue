<template>
  <div class="container d-flex justify-content-center align-items-center">
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
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div class="d-flex justify-content-end mb-3">
          <a href="/forgetpassword" class="text-primary">Forgot Password?</a>
        </div>
        <button type="submit" class="btn btn-success w-100">Sign In</button>
      </form>
      <hr />
      <div class="text-center">
        <h2 class="h3">New Here?</h2>
        <p>Sign up and discover a great amount of new features!</p>
        <button href="/signup" class="btn btn-primary w-100">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import { mapState } from "vuex";
export default {
  name: "TheLogin",

  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    async login() {
      this.$store.dispatch("setIsLoading", true);
      const secretKey = CryptoJS.enc.Base64.parse(
        "E7P/iFOV3eLtlcpPQQVu5T0LVmm0Sxl2GJwHbNN9Eqg="
      );
      const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
      // Encrypt the password using AES-CBC with PKCS5 padding (default in CryptoJS)
      const encryptedPassword = CryptoJS.AES.encrypt(this.password, secretKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString(); // Convert to Base64 string
      const loginData = {
        username: this.email,
        password: encryptedPassword,
      };

      fetch("http://localhost:8080/apigateway/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(JSON.stringify(errorData));
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Login successful", data);
          const isLogin = true;
          const token = data.access_token;

          // Decode JWT to check roles
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const roles = decodedToken.realm_access.roles;
          const isAdmin = roles.includes("admin");
          const email = decodedToken.email;

          this.$store.dispatch("setIsAdmin", isAdmin);

          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          this.$store.dispatch("setToken", token);
          this.$store.dispatch("setEmail", email);
          this.fetchUserData({ token, email });
          this.$store.dispatch("setLogin", isLogin);
          if (isAdmin) {
            this.$router.push("/admindashboard");
            this.$store.dispatch("setIsLoading", false);
          } else if (roles.includes("employee")) {
            this.$router.push("/employeedashboard");
            this.$store.dispatch("setIsLoading", false);
          } else {
            this.$router.push("/dashboard");
            this.$store.dispatch("setIsLoading", false);
          }
        })
        .catch((error) => {
          console.error("Error during login", error);
          alert("Please Enter Your Correct Username/Email or Password !!");
          this.isLoading = false;
        });
    },
    async fetchUserData({ token, email }) {
      console.log("Fetching user data...");
      await this.$store.dispatch("fetchUserData", { token, email });
      console.log("User data fetched successfully");
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
/* .container {
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
  height: 100vh;
  align-items: center;
}

.login-form {
  padding: 40px;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  max-height: 70%;
  background-color: #f9f9f9;
}
.logo {
  display: block;
  margin: 0 auto 20px;
  max-width: 150px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.login-form input[type="email"],
.login-form input[type="password"] {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.forgot-password {
  display: block;
  margin-bottom: 15px;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  text-align: right;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-form button {
  background-color: #4caf50;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
  font-size: 16px;
  font-weight: bold;
}

.login-form button:hover {
  background-color: #45a049;
}

.signup-section {
  text-align: center;
  margin-top: 20px;
}

.signup-section h2 {
  margin: 10px 0;
}

.signup-section p {
  margin-bottom: 15px;
}

.signup-section button {
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 16px;
}

.signup-section button a {
  text-decoration: none;
  color: inherit;
}

.signup-section button:hover a {
  text-decoration: none;
  color: white;
}

@media (max-width: 768px) {
  .login-form {
    width: 90%;
    padding: 20px;
    max-height: 100%;
  }
} */
</style>
