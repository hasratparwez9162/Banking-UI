<template>
  <TheSppiner :is-loading="isLoading" :size="size" />
  <div class="container">
    <div class="login-form">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h2>SignUp to Your Account</h2>

      <!-- <hr /> -->
      <!-- <p style="text-align: center">OR</p> -->

      <input type="text" v-model="username" placeholder="UserName" />
      <input
        type="text"
        v-model="firstname"
        placeholder="FirstName"
        @blur="validateFirstName"
      />
      <span class="error">{{ errors.firstName || "" }}</span>
      <input type="text" v-model="lastname" placeholder="LastName" />
      <input type="text" v-model="accountNumber" placeholder="AccountNumber" />
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="signup">Sign Up</button>
      <div class="login-section">
        <h2>Already Have an Account</h2>
        <button><a href="/login"> Sign In</a></button>
      </div>
    </div>
  </div>
</template>

<script>
import TheSppiner from "./TheSppiner.vue";
export default {
  components: {
    TheSppiner,
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
      size: "100px",
    };
  },
  methods: {
    validateFirstName() {
      const value = this.firstname;
      const namePattern = /^[A-Za-z]+$/;
      if (!value) {
        this.errors.firstName = "First name is required.";
      } else if (value.length < 2 || value.length > 30) {
        this.errors.firstName =
          "First name must be between 2 and 30 characters.";
      } else if (!namePattern.test(value)) {
        this.errors.firstName =
          "First name must contain only alphabetic characters.";
      } else {
        this.errors.firstName = null; // Clear error
      }
    },
    signup() {
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
.container {
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
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 84%;
  background-color: #f9f9f9;
}
.logo {
  display: block;
  margin: 0 auto 20px;
  max-width: 150px;
}

.login-form h2 {
  margin-bottom: 20px; /* Space below the heading */
  font-size: 24px; /* Font size for the heading */
}

.login-form hr {
  margin: 10px 0; /* Space above and below the horizontal line */
}

.login-form input {
  width: 100%; /* Full width inputs */
  padding: 10px; /* Padding inside inputs */
  margin: 10px 0; /* Space between inputs */
  border: 1px solid #ccc; /* Border color */
  border-radius: 4px; /* Rounded corners for inputs */
  box-sizing: border-box; /* Ensure padding doesn't affect total width */
}

.login-form button {
  width: 100%; /* Full width button */
  padding: 10px; /* Padding inside the button */
  background-color: #007bff; /* Primary button color */
  color: white; /* Button text color */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners for button */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 16px; /* Font size for the button */
}

.login-form button:hover {
  background-color: #4caf50;
  color: white;
}

.login-section {
  text-align: center; /* Center align text */
  margin-top: 20px; /* Space above the section */
}

.login-section h2 {
  margin: 10px 0; /* Space above and below the heading */
}

.login-section button {
  border: none; /* No border */
  background: transparent; /* Primary button color */
  color: #007bff; /* Button text color */ /* Text color */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 16px; /* Font size for the button */
}

.login-section button a {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit color from button */
}

.login-section button :hover {
  text-decoration: none; /* Underline on hover */
  background: transparent;
}
.error {
  min-height: 12px;
  color: red;
  font-size: 12px;

  display: flex;
  max-height: 12px;
}
@media (max-width: 768px) {
  .login-form {
    max-height: 100%;
  }
}
</style>
