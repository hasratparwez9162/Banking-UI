<template>
  <div class="main-banner-woman-area">
    <div class="row">
      <div class="col-lg-7">
        <div class="main-banner-woman-content">
          <h1>Your Business, Our Priority – Comprehensive Banking Solutions</h1>
          <p>
            Seamlessly manage your finances with features that let you open
            accounts, access loans, get credit or debit cards, and handle
            transactions and loan payments, all in one place.
          </p>
          <ul class="btn-list">
            <li>
              <router-link to="/about#contact" class="btn btn-primary"
                >Get Started</router-link
              >
            </li>
            <li>
              <router-link to="/track-application" class="btn btn-primary"
                >Track Application Status</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="main-banner-woman-image">
          <img
            src="@/assets/finance-7731978_1280.png"
            alt="image"
            class="img-fluid"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
};
</script>
<style scoped>
.main-banner-woman-area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fffdef;
  padding-top: 150px;
  position: absolute;
  z-index: 1;
  overflow: hidden;
  min-height: 60vh;
  height: 83vh;
  margin-top: 56px;
}

.main-banner-woman-content {
  padding: 60px; /* Increased padding for larger screens */
  text-align: left;
  flex-direction: column;
  justify-content: center;
}

.main-banner-woman-content h1 {
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.main-banner-woman-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.banner-woman-list {
  padding-left: 0;
  list-style: none;
  margin-bottom: 30px;
}

.banner-woman-list li {
  font-size: 16px;
  color: #5c5c5c;
  margin-bottom: 15px;
}

.btn-list {
  padding-left: 0;
  list-style: none;
  display: flex;
  gap: 15px; /* Adjust spacing between buttons */
  margin-top: 10rem;
}

.btn-list li {
  display: inline-block;
}

.main-banner-woman-image {
  position: relative;
  text-align: center;
  height: 100%; /* Full height for the image container */
}

.main-banner-woman-image img {
  height: 73%;
  object-fit: cover; /* Ensures the image covers the container */
  margin-top: 73px;
}

.woman-shape {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.col-lg-7 {
  flex: 0 0 auto;
  width: 58.33333333%;
}
.col-lg-5 {
  flex: 0 0 auto;
  width: 41.66666667%;
}
.row {
  display: flex;
}
.btn {
  font-weight: 700;
  border: none;
  padding: 14.5px 30px;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 14px;
  line-height: normal;
  border-radius: 4px;
  transition: 0.5s;
  position: relative;
  z-index: 1;
}
.btn-primary {
  background-color: transparent;
  color: #ffffff;
}

.btn-primary::before,
.btn-primary::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: 4px;
  transition: 0.5s;
}
.btn-primary:before {
  background: linear-gradient(90deg, #ee0979, #ff6a00);
}
.btn-primary:hover {
  background: linear-gradient(135deg, #23bdb8, #43e794);
}
.discover-more-btn {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: #0e314c;
  border-bottom: 1px solid #0e314c;
  transition: 0.5s;
  text-decoration: none;
}
.discover-more-btn:hover {
  color: #ee0979;
  border-bottom: 1px solid #ee0979;
}

@media (max-width: 991px) {
  .main-banner-woman-content {
    padding: 30px;
  }

  .main-banner-woman-content h1 {
    font-size: 2rem;
  }

  .main-banner-woman-content p {
    font-size: 1rem;
  }

  .main-banner-woman-image {
    height: auto; /* Auto height for smaller screens */
  }
}

@media (min-width: 992px) {
  .main-banner-woman-image {
    height: 100vh; /* Full height on larger screens */
  }

  .main-banner-woman-content {
    height: 100vh; /* Ensures the text content takes the full height */
    justify-content: center;
  }
}
@media (max-width: 768px) {
  .main-banner-woman-area {
    flex-direction: row;
    height: 100% !important;
    display: block;
    padding-top: 0px;
  }
  .col-lg-7 {
    flex: 0 0 auto;
    width: 100%;
  }
  .col-lg-5 {
    flex: 0 0 auto;
    width: 100%;
  }
  .btn-list {
    margin-top: 70px;
  }
}
</style>
