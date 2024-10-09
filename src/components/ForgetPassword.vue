<template>
  <div class="container">
    <div class="forget-password-form">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h2>Forgot Your Password?</h2>
      <p>
        Please enter your username below, and we will send you a link to reset
        your password.
      </p>
      <input type="text" v-model="username" placeholder="Username" />
      <button @click="sendResetLink">Send Reset Link</button>
      <div class="login-section">
        <p>Remembered your password? <a href="/login">Login Here</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    sendResetLink() {
      const url = `http://localhost:8080/apigateway/${this.username}/forget-password`;

      fetch(url, {
        method: "PUT",
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("Reset link sent successfully");
            alert("Reset link sent to your email!");
          } else if (response.status === 404) {
            return response.json().then((errorData) => {
              alert(errorData.message);
            });
          } else {
            throw new Error(`Request failed with status ${response.status}`);
          }
        })
        .catch((error) => {
          console.error("Error sending reset link", error);
          alert("An error occurred. Please try again.");
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
  justify-content: center;
  height: 91vh;
  align-items: center;
}

.forget-password-form {
  padding: 40px;
  width: 400px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  max-height: 70%;
  background-color: #f9f9f9;
}
.logo {
  display: block;
  margin: 0 auto 20px;
  max-width: 150px;
}

.forget-password-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.forget-password-form p {
  text-align: center;
  margin-bottom: 20px;
}

.forget-password-form input[type="text"] {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-sizing: border-box;
}

.forget-password-form button {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  width: 100%;
}

.login-section {
  text-align: center; /* Center align text */
  margin-top: 20px; /* Space above the section */
}

.login-section a {
  text-decoration: none; /* Remove underline */
  color: #007bff; /* Link color */
}
</style>
