<template>
  <div class="container-fluid">
    <div class="header">
      <h1>Get an instant Personal loan within 3 seconds</h1>
      <button class="apply-now" @click="apply">APPLY NOW</button>
    </div>
    <div class="loan-container">
      <div class="loan-types">
        <h2>Type of Loan</h2>
        <p>
          See our full range of loan products and explore based on your
          requirement
        </p>
        <div class="loan-cards">
          <div class="loan-card">
            <div class="img-container">
              <img
                class="tile-img"
                src="@/assets/loan_personal.jpg"
                alt="Home image"
              />
              <div class="img-text">
                <p class="msg-title">Personal Loan</p>
              </div>
            </div>
            <div class="card-bullets">
              <ul>
                <li>
                  Avail instant personal loan in India from Rs. 50,000 to Rs.
                  35,00,000
                </li>
                <li>Attractive interest rates</li>
              </ul>
            </div>
            <div class="btn-section">
              <a class="red-btn" @click="apply">Apply Now</a>
            </div>
          </div>

          <div class="loan-card">
            <div class="img-container">
              <img
                class="tile-img"
                src="@/assets/loan_Home.jpg"
                alt="Home image"
              />

              <div class="img-text">
                <p class="msg-title">Home Loan</p>
              </div>
            </div>
            <div class="card-bullets">
              <ul>
                <li>
                  Zero Processing Fees: Save on processing fees on your online
                  application for home loan
                </li>
                <li>
                  Doorstep Service: No more running around to get your home loan
                  processed
                </li>
                <li>
                  Simplified Documentation: Let home loan documentation not give
                  you any more headaches
                </li>
              </ul>
            </div>
            <div class="btn-section">
              <a class="red-btn" @click="apply">Apply Now</a>
            </div>
          </div>
          <div class="loan-card">
            <div class="img-container">
              <img
                class="tile-img"
                src="@/assets/loan_Auto.jpg"
                alt="card image"
              />

              <div class="img-text">
                <p class="msg-title">Auto Loan</p>
              </div>
            </div>
            <div class="card-bullets">
              <ul>
                <li>Competitive interest rates for the Stock Ace accounts</li>
                <li>Instant liquidity&nbsp;</li>
                <li>
                  Interest for Overdraft facility is charged only on utilized
                  funds
                </li>
              </ul>
            </div>
            <div class="btn-section">
              <a class="red-btn" @click="apply">Apply Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    apply() {
      this.$router.push("/underdevelopment");
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  position: relative;
}
.header {
  width: 100%;
  background: url("@/assets/Loan.jpg") no-repeat center center;
  background-color: #f3e5f5;
  text-align: center;
  position: relative;
  background-size: cover;
  height: 400px;
  text-align: left;
}
.header h1 {
  font-size: 56px;
  color: #333;
  margin: 0;
  position: absolute;
  top: 91px;
  max-width: 50%;
  left: 50px;
}
.header .apply-now {
  background-color: #ff0000;
  color: #fff;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 234px;
  left: 50px;
  position: absolute;
}
.header .apply-now:hover {
  background-color: #cc0000;
}
.header .terms {
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 12px;
  color: #666;
}
.loan-types {
  padding: 40px 20px;
  text-align: center;
}
.loan-types h2 {
  font-size: 24px;
  color: #0f3464;
  margin-bottom: 10px;
}
p.msg-title {
  font-weight: 700;
  font-size: 25px;
  color: #fff;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
  margin-bottom: 4px;
}
.loan-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 28px;
  width: 100%;
}

.loan-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 30%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.loan-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.loan-card .content {
  padding: 20px;
}
.loan-card h3 {
  font-size: 20px;
  color: #333;
  margin: 0 0 10px;
}
.loan-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}
.loan-card ul li {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}
.loan-card .apply-now {
  background-color: #ff0000;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  display: block;
  text-decoration: none;
}
.loan-card .apply-now:hover {
  background-color: #cc0000;
}
.loan-container,
.container-fluid {
  padding-left: 15px;
  padding-right: 15px;
}
.loan-container,
.container-fluid {
  margin-right: auto;
  margin-left: auto;
}
.img-container {
  position: relative;
  display: inline-block;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, #000 100%);
}
.card-bullets {
  padding: 24px 16px 14px;
}
.card {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.btn-section {
  padding: 16px;
  margin-top: auto;
  display: flex;
  align-items: center;
  margin-right: -15px;
}

img.tile-img {
  display: block;
  border-radius: 8px 8px 0 0;
  width: 100%;
}

.img-text {
  position: absolute;
  bottom: 0;
  z-index: 1;
  padding: 16px;
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 24%, #000 100%);
}

a.red-btn {
  border: 1px solid #ee1c25;
  background: #ee1c25;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  color: #fff;
  display: inline-block;
  white-space: nowrap;
  transition: all 0.5s ease-in-out;
  padding: 10px;
  width: 100%;
  max-width: 96%;
  text-decoration: none;
  cursor: pointer;
}
@media (min-width: 1200px) {
  .loan-container {
    width: 1170px;
  }
}
@media (max-width: 600px) {
  .header .apply-now {
    padding: 10px 13px;
    font-size: 12px;
    margin-top: 87px;
    left: 24px;
  }
  .header {
    height: 145px;
  }
  .header h1 {
    font-size: 18px;
    top: 14px;
    left: 26px;
  }
  .loan-types {
    padding: 15px 15px;
  }
  .loan-card {
    width: 100%;
  }
}
</style>
