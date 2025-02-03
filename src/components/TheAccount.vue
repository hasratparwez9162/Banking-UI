<template>
  <div class="mt-5">
    <div class="header d-flex align-items-center bg-primary text-white">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8 text-start">
            <h1 class="display-4 text-dark">Account</h1>
            <p class="lead text-dark">
              Empower your business.<br />
              Banking solutions, customized to your needs.
            </p>
            <a class="btn btn-danger btn-lg mt-3" href="/open-account"
              >Open Account</a
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="features container-fluid mt-4 p-4 bg-white shadow-sm rounded text-start"
    >
      <h2 class="text-primary">Features &amp; Benefits of Account</h2>
      <ul class="list-unstyled mt-3">
        <li class="mb-3">
          <strong>Instant Account Opening:</strong>
          Effortlessly open an account with just a few details. Enjoy a seamless
          and secure account creation process directly integrated with your user
          profile.
        </li>
        <li class="mb-3">
          <strong>Real-Time Balance and Transaction Alerts:</strong>
          Stay informed with real-time updates on your account balance and
          transactions, ensuring you are always aware of your financial status
          and activities.
        </li>
        <li>
          <strong>Integrated Account Services:</strong>
          Easily link and manage your loans, credit/debit cards, and other
          banking services from a single dashboard, simplifying financial
          management.
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.header {
  background: url("@/assets/Account Background.jpg") no-repeat center center;
  background-size: cover;
  padding: 60px 40px;
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
.features {
  margin-top: 40px;
}
.features h2 {
  color: #003366;
  font-size: 24px;
  margin-bottom: 20px;
}
.features ul {
  list-style-type: disc;
  padding: 0;
}
.features ul li {
  font-size: 18px;
  margin-bottom: 10px;
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
}
.header .btn:hover {
  background-color: #cc0000;
  text-decoration: none;
}

@media (max-width: 768px) {
  .header {
    text-align: center;
    padding: 60px 20px;
  }
  .header h1 {
    font-size: 36px;
  }
  .header p {
    font-size: 18px;
  }
  .header .btn {
    margin-top: 20px;
    padding: 10px 20px;
  }
}
</style>
