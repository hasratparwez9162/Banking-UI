<template>
  <div class="card-requests-container feature-card-cards full-width">
    <button class="btn btn-back" @click="goBack">← Back</button>
    <h1>Card Requests</h1>
    <div class="ag-theme-quartz" style="height: 400px; width: 100%">
      <ag-grid-vue
        style="width: 100%; height: 100%"
        :columnDefs="columnDefs"
        :rowData="cardRequests"
        :defaultColDef="defaultColDef"
        :gridOptions="gridOptions"
        :pagination="true"
        :paginationPageSize="10"
        :paginationPageSizeSelector="[10, 20, 50, 100]"
        @grid-ready="onGridReady"
      />
    </div>
  </div>
  <div class="model" v-if="currentCard">
    <div class="model-content">
      <div class="card-details">
        <!-- Close button at the top-right corner -->
        <span class="close-button" @click="closeDetails">✖</span>

        <h3>Card Details</h3>
        <div class="content">
          <div>
            <p><strong>Card Number:</strong> {{ currentCard.cardNumber }}</p>
            <p>
              <strong>Card Holder Name:</strong>
              {{ currentCard.cardHolderName }}
            </p>
            <p><strong>Card Type:</strong> {{ currentCard.cardType }}</p>
            <p>
              <strong>Credit Limit:</strong>
              {{
                currentCard.creditLimit
                  ? currentCard.creditLimit.toFixed(2)
                  : "N/A"
              }}
            </p>
            <p>
              <strong>Available Limit:</strong>
              {{
                currentCard.availableLimit
                  ? currentCard.availableLimit.toFixed(2)
                  : "N/A"
              }}
            </p>

            <p><strong>Expiry Date:</strong> {{ currentCard.expiryDate }}</p>
            <p><strong>User ID:</strong> {{ currentCard.userId }}</p>
            <p><strong>Status:</strong> {{ currentCard.status }}</p>
          </div>
        </div>

        <!-- Add comment section -->
        <div class="comment-section">
          <textarea
            v-model="comment"
            placeholder="Add a comment for any notes"
            class="comment-input"
          ></textarea>
        </div>

        <!-- Action buttons for card actions -->
        <div class="action-buttons">
          <button
            :disabled="currentCard.status === 'ACTIVE'"
            class="activate-button"
            @click="activateCard"
          >
            Activate
          </button>
          <button
            :disabled="currentCard.status === 'BLOCKED'"
            class="block-button"
            @click="blockCard"
          >
            Block
          </button>
          <button
            :disabled="!currentCard.status === 'ACTIVE'"
            class="unblock-button"
            @click="unblockCard"
          >
            UnBlockCard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css"; // Core Grid CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomRenderComponent from "../CustomRenderComponent.vue";

export default {
  name: "CardRequests",
  components: {
    AgGridVue,
    CustomRenderComponent,
  },
  data() {
    return {
      cardRequests: [],
      currentCard: null,
      columnDefs: [
        { field: "cardNumber", headerName: "Card Number" },
        { field: "cardHolderName", headerName: "Card Holder" },
        { field: "cardType", headerName: "Card Type" },
        { field: "creditLimit", headerName: "Credit Limit" },
        { field: "availableLimit", headerName: "Available Limit" },
        { field: "expiryDate", headerName: "Expiry Date" },
        { field: "status", headerName: "Status" },
        {
          headerName: "Actions",
          cellRenderer: "CustomRenderComponent", // Using the ActionButtons component
        },
      ],

      gridOptions: {
        context: {
          componentParent: this, // Pass Vue component context
        },
        frameworkComponents: {
          CustomRenderComponent, // Register the component in the grid
        },
      },
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true,
      },
      gridApi: null,
    };
  },
  methods: {
    async fetchCardRequests() {
      const token = this.$store.getters.token;
      const response = await fetch("http://localhost:8080/cards/non-active", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // check for unauthorized access
      if (response.status === 401) {
        this.$store.dispatch("logout");
        alert("Session expired. Please login again.");
        this.$router.push("/login");
      }
      const data = await response.json();
      this.cardRequests = data; // Set the fetched card requests
    },

    viewDetails(request) {
      this.currentCard = request;
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
    },
    goBack() {
      this.$emit("backToDashboard"); // Emit event to go back
    },
    closeDetails() {
      this.currentCard = null; // Reset the current card details
    },
    async activateCard() {
      const token = this.$store.getters.token;
      try {
        const response = await fetch(
          `http://localhost:8080/cards/${this.currentCard.id}/activate`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // check for unauthorized access
        if (response.status === 401) {
          this.$store.dispatch("logout");
          alert("Session expired. Please login again.");
          this.$router.push("/login");
        } else if (response.ok) {
          const updatedCardRequests = this.cardRequests.map((card) => {
            if (card.id === this.currentCard.id) {
              return { ...card, status: "ACTIVE" };
            }
            return card;
          });
          this.cardRequests = updatedCardRequests;
          console.log("Card activated successfully.");
          this.currentCard = null; // Close the details modal
          this.closeDetails();
        } else if (response.status === 404) {
          console.error("Card not found.");
          alert("Card not found with the specified ID.");
        } else {
          const errorText = await response.text();
          console.error("Error activating card:", errorText);
          alert(
            "An error occurred while activating the card. Please try again later."
          );
        }
      } catch (error) {
        console.error("Network error:", error);
        alert(
          "A network error occurred. Please check your connection and try again."
        );
      }
    },
    async blockCard() {
      const token = this.$store.getters.token;
      try {
        const response = await fetch(
          `http://localhost:8080/cards/${this.currentCard.id}/block`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // check for unauthorized access
        if (response.status === 401) {
          this.$store.dispatch("logout");
          alert("Session expired. Please login again.");
          this.$router.push("/login");
        } else if (response.ok) {
          // Update the card status locally
          const updatedCardRequests = this.cardRequests.map((card) => {
            if (card.id === this.currentCard.id) {
              return { ...card, status: "BLOCKED" };
            }
            return card;
          });
          this.cardRequests = updatedCardRequests;
          console.log("Card blocked successfully.");
          this.currentCard = null; // Close the details modal
          this.closeDetails();
        } else if (response.status === 404) {
          console.error("Card not found.");
          alert("Card not found with the specified ID.");
        } else {
          const errorText = await response.text();
          console.error("Error blocking card:", errorText);
          alert(
            "An error occurred while blocking the card. Please try again later."
          );
        }
      } catch (error) {
        console.error("Network error:", error);
        alert(
          "A network error occurred. Please check your connection and try again."
        );
      }
    },

    async unblockCard() {
      const token = this.$store.getters.token;
      try {
        const response = await fetch(
          `http://localhost:8080/cards/${this.currentCard.id}/unblock`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // check for unauthorized access
        if (response.status === 401) {
          this.$store.dispatch("logout");
          alert("Session expired. Please login again.");
          this.$router.push("/login");
        } else if (response.ok) {
          // Update the card status locally
          const updatedCardRequests = this.cardRequests.map((card) => {
            if (card.id === this.currentCard.id) {
              return { ...card, status: "ACTIVE" };
            }
            return card;
          });
          this.cardRequests = updatedCardRequests;
          console.log("Card unblocked successfully.");
          this.currentCard = null; // Close the details modal
          this.closeDetails();
        } else if (response.status === 404) {
          console.error("Card not found.");
          alert("Card not found with the specified ID.");
        } else {
          const errorText = await response.text();
          console.error("Error unblocking card:", errorText);
          alert(
            "An error occurred while unblocking the card. Please try again later."
          );
        }
      } catch (error) {
        console.error("Network error:", error);
        alert(
          "A network error occurred. Please check your connection and try again."
        );
      }
    },
  },
  mounted() {
    this.fetchCardRequests(); // Fetch card requests when component is mounted
  },
};
</script>

<style scoped>
.model {
  position: fixed;
  top: 78px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.model-content {
  background-color: white;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}
h1 {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 20px;
  text-align: center !important;
}

.btn-back {
  background-color: transparent;
  color: #3498db;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.btn-back:hover {
  text-decoration: underline;
}
.feature-card-cards {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 19%;
  text-align: left !important;
  position: absolute !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.feature-card h2 {
  font-size: 1.5rem;
  color: #2980b9;
  margin-bottom: 10px;
}
.full-width {
  width: 95% !important;
}
.card-details {
  text-align: center;
  position: relative;
  width: 97%;
}

.content {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.card-details p {
  margin: 8px 0;
}

.card-details strong {
  font-weight: bold;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  cursor: pointer;
  color: #888;
}

.close-button:hover {
  color: #f00;
}

.action-buttons {
  margin-top: 20px;
}

.activate-button:disabled,
.block-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.activate-button,
.block-button,
.unblock-button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.activate-button {
  background-color: #20c997;
  color: white;
}

.block-button {
  background-color: #e63946;
  color: white;
}

.unblock-button {
  background-color: #6c757d; /* or #007bff for a blue variant */
  color: white;
}
.activate-button:hover {
  background-color: #218838;
}

.block-button {
  background-color: #ff4d4f;
  color: white;
}

.block-button:hover {
  background-color: #ff3333;
}

/* Comment Section */
.comment-section {
  margin-top: 20px;
}

.comment-input {
  width: 100%;
  height: 80px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}
</style>
