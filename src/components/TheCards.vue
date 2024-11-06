<template>
  <section>
    <div class="section-containaer">
      <div id="hero-slider-1" class="wealth-nearest-parent">
        <div class="hero-container visible">
          <div class="row cta-parent">
            <div class="col-xs-12 fdroi-global-var">
              <h1
                class="hero-banner-title custom-font-color heading-track hero-slider-comp new-hs-title banner-title-height desktopTitle"
              >
                Cards
              </h1>
              <div class="custom-font-color hero-banner-desc">
                <p>
                  Our Credit & Debit Cards are designed to suit the need of
                  every individual. Whether you're looking for a low fee card or
                  a card that rewards you for everyday spend, we have a Card to
                  match your individual needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="cards-container">
    <div class="card">
      <div class="card-image">
        <img
          src="@/assets/Sample Visa debit card .png"
          alt="PVR INOX Kotak Credit Card"
        />
      </div>
      <div class="card-info">
        <h3>PVR INOX HP Credit Card</h3>
        <p class="fee-info">Joining Fee: ₹ 0 | Annual Fee: INR 499</p>

        <div class="card-content">
          <p>
            Unlimited* Movie Tickets: one ticket for every INR 10,000 spent on
            the card
          </p>
          <p>20% Instant Discount** on Food &amp; Beverages</p>
          <p>5% Instant Discount** on movie tickets</p>
          <a class="apply-btn" @click="apply"> Apply </a>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <img
          src="@/assets/Platinum Debit.jpg"
          alt="PVR INOX Kotak Credit Card"
        />
      </div>
      <div class="card-info">
        <h3>Platanium Debit Card</h3>
        <p class="fee-info">Joining Fee: ₹ 0 | Annual Fee: INR 499</p>

        <div class="card-content">
          <p>Air Accident cover upto Rs 50 lakhs</p>
          <p>Accidental Death Cover of up to INR 15 lakhs.</p>
          <p>
            Eligible for Priority Pass to get access to 900+ VIP airport lounges
          </p>
          <a class="apply-btn" @click="apply"> Apply </a>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <img
          src="@/assets/Rupay UPI Credit Card.jpg"
          alt="PVR INOX Kotak Credit Card"
        />
      </div>
      <div class="card-info">
        <h3>Rupay UPI Credit Card</h3>
        <p class="fee-info">Joining Fee: ₹ 0 | Annual Fee: ₹ 0</p>

        <div class="card-content">
          <p>Earn 3 Reward Points* per ₹100 spent</p>
          <p>Enjoy facility of UPI Payment on Credit Card</p>
          <p>Virtual Lifetime Free Credit Card</p>
          <a class="apply-btn" @click="apply"> Apply </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheCards",
  methods: {
    apply() {
      this.$router.push("/underdevelopment");
    },
  },
};
</script>
<style scoped>
.section-containaer {
  width: 100%;
  height: 422px;
  background-image: url("@/assets/Cards.jpg");
  background-size: cover; /* Ensure image covers the entire area */
  background-position: center; /* Center the background image */
}

.hero-container {
  position: relative;
  z-index: 2; /* Ensures text is above the background image */
  color: white; /* Makes the text readable on a dark background */
  width: 46%;
  left: 35px;
  text-align: left;
}
.col-xs-12.fdroi-global-var {
  position: relative;
  top: 85px;
}
.hero-banner-title {
  font-size: 65px;
  color: white; /* Ensure text is visible on the dark background */
  z-index: 2; /* Ensure text appears above the overlay */
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7); /* Adds shadow for better readability */
  position: relative;
  top: 46px;
}

.hero-banner-desc p {
  font-size: 21px;
  color: white;
  z-index: 2;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
}

.btn-box a {
  z-index: 2;
  background: red;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  margin: 10px;
}

.cards-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 360px;
  height: 460px; /* Keep this height */
  display: flex;
  flex-direction: column; /* Ensures that content is vertically aligned */
  /* justify-content: space-between; Pushes the button to the bottom */
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content h3 {
  margin: 0 0 10px;
  font-size: 20px;
}

.card-content p {
  margin: 5px 0;
  font-size: 14px;
  color: #555;
}

.card-content .fee {
  color: green;
  font-weight: bold;
}

.card-content .apply-btn {
  display: block;
  width: 96%;
  text-align: center;
  padding: 10px;
  background: red;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
}

.card-image img {
  width: 100%;
  height: 202.11px;
  border-bottom: 2px solid #ddd;
}

.card-info {
  padding: 15px;
  text-align: center;
}

.card-info h3 {
  font-size: 1.25rem;

  color: #555;
}

.fee-info {
  font-size: 0.8rem;
  color: #555;
}

/* Add some hover effects */
.credit-card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease-in-out;
}

/* Responsive for smaller screens */
@media (max-width: 768px) {
  .credit-card {
    width: 90%;
  }
  .hero-container {
    width: 65%;
    text-align: left;
    position: relative;
    left: 13px;
  }
  .section-containaer {
    height: 200px;
  }
  .col-xs-12.fdroi-global-var {
    top: 0;
  }
  .hero-banner-title[data-v-27d826bc] {
    font-size: 33px;
    top: 32px;
  }
  .hero-banner-desc p[data-v-27d826bc] {
    font-size: 14px;
    top: 5px;
    position: relative;
  }
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
    padding: 0px !important;
  }
  .card {
    width: 92% !important;
  }
}
</style>
