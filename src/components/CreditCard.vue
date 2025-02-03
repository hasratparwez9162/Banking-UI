<template>
  <h5>Credit Cards</h5>
  <div class="accordion" id="creditCardAccordion">
    <div
      v-for="(card, index) in creditCards"
      :key="index"
      class="accordion-item"
    >
      <h2 class="accordion-header" :id="'heading-' + index">
        <button
          aria-controls="'collapse-' + index"
          aria-expanded="false"
          class="accordion-button"
          :data-bs-target="'#collapse-' + index"
          data-bs-toggle="collapse"
          type="button"
        >
          {{ card.name }}
        </button>
      </h2>
      <div
        :aria-labelledby="'heading-' + index"
        class="accordion-collapse collapse"
        :id="'collapse-' + index"
        data-bs-parent="#creditCardAccordion"
      >
        <div class="accordion-body">
          <p>Card Number: {{ card.cardNumber }}</p>
          <p>Card Type: {{ card.cardType }}</p>
          <p>
            Last Statement Due:
            <span class="text-danger">{{ card.dueAmount }} INR</span>
          </p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary" @click="showCardDetails(card.name)">
              More Details
            </button>
            <button class="btn btn-success" @click="payNow(card.name)">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    creditCards: {
      type: Object,
      required: true,
    },
  },
};
</script>
