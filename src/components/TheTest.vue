<template>
  <div class="header">
    <h1>Cards</h1>
    <p>
      Our Credit &amp; Debit Cards are designed to suit the need of every
      individual. Whether you're looking for a low fee card or a card that
      rewards you for everyday spend, we have a Card to match your individual
      needs.
    </p>
  </div>
  <div class="container">
    <div class="card">
      <img
        alt="Credit card image with VISA logo and card details"
        src="https://placehold.co/300x200"
      />
      <h3>PVR INOX Aditi Credit Card</h3>
      <p>Joining Fee: ₹ 0 | Annual Fee: INR 499</p>
      <p>
        Unlimited* Movie Tickets: one ticket for every INR 10,000 spent on the
        card
      </p>
      <p>20% Instant Discount* on Food &amp; Beverages</p>
      <p>5% Instant Discount* on movie tickets</p>
      <a class="apply-btn" href="#"> Apply </a>
    </div>
    <div class="card">
      <img
        alt="Credit card image with VISA logo and card details"
        src="https://placehold.co/300x200"
      />
      <h3>Platanium Debit Card</h3>
      <p>Joining Fee: ₹ 0 | Annual Fee: INR 499</p>
      <p>Air Accident cover upto Rs 50 lakhs</p>
      <p>Personal Accidental Death Cover of up to INR 15 lakhs.</p>
      <p>
        Eligible for Priority Pass to get access to 900+ VIP airport lounges
      </p>
      <a class="apply-btn" href="#"> Apply </a>
    </div>
    <div class="card">
      <img
        alt="Credit card image with VISA logo and card details"
        src="https://placehold.co/300x200"
      />
      <h3>Rupay UPI Credit Card</h3>
      <p>Joining Fee: ₹ 0 | Annual Fee: ₹ 0</p>
      <p>Earn 3 Reward Points* per ₹100 spent</p>
      <p>Enjoy facility of UPI Payment on Credit Card</p>
      <p>Virtual Lifetime Free Credit Card</p>
      <a class="apply-btn" href="#"> Apply </a>
    </div>
  </div>
</template>
<style scoped>
.header {
  background: linear-gradient(to right, #1e5799, #2989d8, #207cca, #7db9e8);
  color: white;
  padding: 20px 0;
  text-align: center;
}
.header h1 {
  margin: 0;
  font-size: 36px;
}
.header p {
  margin: 10px 0 0;
  font-size: 18px;
}
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
}
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  width: 300px;
  text-align: center;
  overflow: hidden;
}
.card img {
  width: 100%;
  height: auto;
}
.card h3 {
  font-size: 22px;
  margin: 15px 0;
}
.card p {
  font-size: 16px;
  color: #555;
  margin: 10px 20px;
  text-align: left;
}
.card .apply-btn {
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  display: inline-block;
  margin: 20px 0;
  border-radius: 5px;
}
</style>
