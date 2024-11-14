<template>
  <div class="about-us">
    <!-- Header Section (Card) -->
    <section class="card">
      <div class="card-content header-section">
        <h1>About HP Banking</h1>
        <p>Your Trusted Financial Partner</p>
      </div>
    </section>
    <section class="card-group">
      <!-- Vision Section (Card) -->
      <div class="card">
        <div class="card-content">
          <h2>Our Vision</h2>
          <p>
            To provide innovative banking solutions with a customer-first
            approach.
          </p>
        </div>
      </div>

      <!-- Mission Section (Card) -->
      <div class="card">
        <div class="card-content">
          <h2>Our Mission</h2>
          <p>
            To empower individuals and businesses by offering secure,
            transparent, and seamless banking services.
          </p>
        </div>
      </div>
    </section>

    <!-- History & Achievements (Card) -->
    <section class="card">
      <div class="card-content history-achievements">
        <h2>Our History & Achievements</h2>
        <p>
          HP Banking was founded with a simple goal: to redefine the way people
          manage their finances. Over the past decade, we have grown to become a
          trusted name in banking, serving thousands of customers.
        </p>
        <ul>
          <li>Over 1 million satisfied customers</li>
          <li>Rated #1 in customer service for 3 consecutive years</li>
          <li>Introduced cutting-edge mobile banking technology</li>
        </ul>
      </div>
    </section>

    <!-- Core Values & Services Offered (Cards Side by Side) -->
    <section class="card-group">
      <!-- Core Values (Card) -->
      <div class="card">
        <div class="card-content core-values">
          <h2>Our Core Values</h2>
          <ul>
            <li>
              <strong>Trust:</strong> Building long-lasting relationships with
              our customers
            </li>
            <li>
              <strong>Innovation:</strong> Continuously improving to offer the
              best services
            </li>
            <li>
              <strong>Customer Satisfaction:</strong> Always putting customers
              first
            </li>
            <li>
              <strong>Security:</strong> Ensuring the safety of your financial
              data
            </li>
          </ul>
        </div>
      </div>

      <!-- Services Offered (Card) -->
      <div class="card">
        <div class="card-content services-offered">
          <h2>Services We Offer</h2>
          <ul>
            <li>Personal Banking</li>
            <li>Business Banking</li>
            <li>Loans</li>
            <li>Credit & Debit Cards</li>
            <li>Online Account Management</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Team Section (Card) -->
    <section class="card">
      <div class="card-content team-section">
        <h2>Meet Our Team</h2>
        <p>
          Our experienced team of banking professionals is dedicated to
          providing exceptional service. We believe in a customer-centric
          approach and are here to guide you every step of the way.
        </p>
      </div>
    </section>

    <!-- Footer Section (Card) -->
    <section id="contact" class="card">
      <div class="card-content footer-section">
        <h2>Contact Us</h2>
        <p>Email: support@hpbanking.com | Phone: +123-456-7890</p>
        <div class="social-media">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
.about-us {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.card {
  margin: 20px 0;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  /* border-radius: 8px; */
  background-color: #fff;
  padding: 20px;
  border: none;
}

.card-content {
  padding: 20px;
}

.header-section h1 {
  font-size: 2.5rem;
  color: #004085;
  text-align: center;
}

.header-section p {
  font-size: 1.2rem;
  color: #6c757d;
  text-align: center;
}

h2 {
  font-size: 1.8rem;
  color: #343a40;
}

p {
  font-size: 1rem;
  color: #495057;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

ul li {
  padding: 10px;
  margin: 10px 0;
  background-color: #f8f9fa;
  border-left: 4px solid #007bff;
}

.services-offered ul,
.core-values ul,
.history-achievements ul {
  margin-top: 10px;
}

.team-section {
  text-align: center;
}

.footer-section {
  text-align: center;
}

.footer-section .social-media a {
  margin: 0 10px;
  color: #007bff;
  text-decoration: none;
}

.footer-section .social-media a:hover {
  text-decoration: underline;
}

/* Card Group for Core Values and Services Offered */
.card-group {
  display: flex;
  justify-content: space-around;
}

.card-group .card {
  width: 47%;
}

/* Responsiveness */
@media (max-width: 768px) {
  .card-group {
    flex-direction: column;
  }

  .card-group .card {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
  }
  .header-section h1 {
    font-size: 1.5rem;
  }
  .card {
    margin: 6px 0;
  }
  .card-content {
    padding: 10px;
  }
  .about-us {
    margin-top: 19%;
  }
}
</style>
