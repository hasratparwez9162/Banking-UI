<template>
  <div class="container">
    <div class="header">
      <div class="header-text">
        <h1>Account</h1>
        <p>
          Empower your business.
          <br />
          Banking solutions, customized to your needs.
        </p>
        <a class="btn" href="/open-account"> Open Account </a>
      </div>
    </div>
    <div class="features">
      <h2>Features &amp; Benefits of Account</h2>
      <ul>
        <li>
          <strong>Instant Account Opening: </strong>
          Effortlessly open an account with just a few details. Enjoy the
          convenience of a seamless and secure account creation process directly
          integrated with your user profile.
        </li>
        <li>
          <strong>Real-Time Balance and Transaction Alerts: </strong>
          Stay informed with real-time updates on your account balance and
          transactions, ensuring you are always aware of your financial status
          and activities.
        </li>
        <li>
          <strong>Integrated Account Services: </strong>
          Easily link and manage your loans, credit/debit cards, and other
          banking services from a single dashboard, simplifying financial
          management.
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  position: relative;
}
.header {
  background: url("@/assets/Account Background.jpg") no-repeat center center;
  background-size: cover;
  padding: 40px 20px;
  height: 330px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-text {
  max-width: 50%;
}
.header h1 {
  font-size: 48px;
  margin: 0;
}
.header p {
  font-size: 30px;
  margin: 10px 0;
}
.header a {
  color: #007bff;
  text-decoration: none;
}
.header a:hover {
  text-decoration: underline;
}
.header .btn {
  background-color: #ff0000;
  color: #fff;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  top: 27px;
}
.header .btn:hover {
  background-color: #cc0000;
  text-decoration: none;
}
.features {
  background-color: #fff;
  padding: 20px 38px 20px 38px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}
.features h2 {
  color: #003366;
  font-size: 24px;
  margin-bottom: 20px;
}
.features ul {
  list-style-type: none;
  padding: 0;
}
.features ul li {
  font-size: 18px;
  margin-bottom: 10px;
}
.features ul li::before {
  content: "\2022";
  color: #000;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}
@media (max-width: 600px) {
  .header {
    padding: 29px 20px;
    height: 164px;
    text-align: center;
  }
  .header-text[data-v-d9f4a6a8] {
    max-width: 100%;
  }
  .header h1 {
    font-size: 40px;
  }
  .header p {
    font-size: 20px;
  }
  .header .btn[data-v-d9f4a6a8] {
    padding: 10px 24px;
    font-size: 17px;
    top: 6px;
  }
}
</style>
