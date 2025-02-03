<template>
  <div class="custom-card" style="max-width: 385px">
    <div class="card-container">
      <div class="card">
        <div class="card-front">
          <img src="@/assets/PVR_Credit.png" alt="PVR INOX Kotak Credit Card" />
        </div>
      </div>
    </div>
    <hr class="mt-2" />
    <div class="card-info">
      <h3>PVR INOX Aditi Credit Card</h3>
      <p class="fee-info">Joining Fee: ₹ 0 | Annual Fee: INR 499</p>
      <div class="card-content">
        <p>
          Unlimited* Movie Tickets: one ticket for every INR 10,000 spent on the
          card
        </p>
        <p>20% Instant Discount** on Food &amp; Beverages</p>
        <p>5% Instant Discount** on movie tickets</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  perspective: 1000px;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
}

.card-container:hover .card {
  transform: rotateY(360deg);
}

.card-front {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
}

.card-info {
  padding: 15px;
  text-align: center;
  padding-bottom: 0;
}

.card-info h3 {
  font-size: 1.25rem;
  color: #555;
}

.fee-info {
  font-size: 0.8rem;
  color: #555;
}
</style>
