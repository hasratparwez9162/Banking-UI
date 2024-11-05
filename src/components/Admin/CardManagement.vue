<template>
  <div class="card-management">
    <h3>Card Management</h3>
    <table>
      <thead>
        <tr>
          <th>Card Number</th>
          <th>Type</th>
          <th>Expiry Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="card in cards" :key="card.id">
          <td>{{ card.cardNumber }}</td>
          <td>{{ card.cardType }}</td>
          <td>{{ card.expiryDate }}</td>
          <td :class="card.status.toLowerCase()">{{ card.status }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="showIssueCardForm = true">Issue New Card</button>

    <!-- Issue Card Form Modal -->
    <div v-if="showIssueCardForm" class="modal">
      <div class="modal-content">
        <span class="close" @click="showIssueCardForm = false">&times;</span>
        <h4>Issue New Card</h4>
        <form @submit.prevent="submitIssueCard">
          <div class="form-group">
            <label for="cardType">Card Type:</label>
            <select v-model="newCard.cardType" id="cardType" required>
              <option value="">Select Type</option>
              <option value="DEBIT">Debit</option>
              <option value="CREDIT">Credit</option>
            </select>
          </div>
          <!-- Add more fields if necessary -->
          <button type="submit">Issue Card</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardManagement",
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showIssueCardForm: false,
      newCard: {
        cardType: "",
      },
    };
  },
  methods: {
    submitIssueCard() {
      this.$emit("issue-card", this.newCard);
      this.newCard.cardType = "";
      this.showIssueCardForm = false;
    },
  },
};
</script>

<style scoped>
.card-management {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.card-management h3 {
  margin-bottom: 10px;
}
.card-management table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}
.card-management th,
.card-management td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
.card-management th {
  background-color: #f2f2f2;
}
.card-management .debit {
  color: blue;
}
.card-management .credit {
  color: green;
}
.card-management .active {
  color: #28a745;
}
.card-management .blocked {
  color: #dc3545;
}

.card-management button {
  padding: 8px 16px;
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.card-management button:hover {
  background-color: #0056b3;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}

.close {
  float: right;
  font-size: 24px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.modal-content button {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #218838;
}
</style>
