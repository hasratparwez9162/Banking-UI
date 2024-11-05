<template>
  <div class="account-request-details">
    <!-- Close button at the top-right corner -->
    <span class="close-button" @click="closeDetails">✖</span>

    <h3>Account Open Request Details</h3>
    <div class="content">
      <div>
        <p>
          <img
            v-if="details.picturePath"
            :src="details.picturePath"
            alt="Profile Picture"
            class="profile-picture"
          />
          <span v-else>No Profile Picture Available</span>
        </p>
      </div>
      <div>
        <p><strong>Application No.:</strong> {{ details.applicationId }}</p>
        <p>
          <strong>Name:</strong> {{ details.firstName }} {{ details.lastName }}
        </p>
        <p><strong>Email:</strong> {{ details.email }}</p>
        <p><strong>Gender:</strong> {{ details.gender }}</p>
        <p><strong>Phone:</strong> {{ details.phoneNumber }}</p>
        <p>
          <strong>Address:</strong> {{ details.address }} {{ details.city }}
          {{ details.state }}
        </p>
        <p>
          <strong>ID Proof:</strong>
          <a
            :href="details.idProofPath"
            target="_blank"
            rel="noopener noreferrer"
            >View</a
          >
        </p>
      </div>
    </div>
    <!-- Add comment section -->
    <div class="comment-section">
      <textarea
        v-model="comment"
        placeholder="Add a comment for approval or rejection"
        class="comment-input"
      ></textarea>
    </div>

    <!-- Approve and Reject buttons -->
    <div class="action-buttons">
      <button
        :disabled="isRejected || isApproved"
        class="approve-button"
        @click="approveRequest"
      >
        Approve
      </button>
      <button
        :disabled="isRejected || isApproved"
        class="reject-button"
        @click="rejectRequest"
      >
        Reject
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comment: "", // Initialize the comment as an empty string
    };
  },
  computed: {
    isRejected() {
      return this.details.isActive === "REJECTED";
    },

    isApproved() {
      return this.details.isActive === "ACTIVE";
    },
  },
  methods: {
    closeDetails() {
      // Logic for closing the details (emit event or hide modal)
      this.$emit("close");
    },
    async rejectRequest() {
      if (this.comment.trim()) {
        // Emit reject event with applicationId and comment
        const data = {
          isActive: "REJECTED",
          applicationId: this.details.applicationId,
          comment: this.comment,
        };
        await this.handleApproveOrReject(data);
        this.comment = "";
        this.$emit("close");
      } else {
        alert("Please add a comment for rejection.");
      }
    },
    async approveRequest() {
      if (this.comment.trim()) {
        // Emit approve event with applicationId and comment
        const data = {
          isActive: "ACTIVE",
          applicationId: this.details.applicationId,
          comment: this.comment,
        };

        await this.handleApproveOrReject(data);
        this.comment = ""; // Clear the comment after submission
        this.$emit("close");
      } else {
        alert("Please add a comment for approval.");
      }
    },
    async handleApproveOrReject(data) {
      console.log("Data:", data);
      const payload = {
        applicationId: data.applicationId,
        comment: data.comment,
        isActive: data.isActive,
      };
      try {
        const token = this.$store.getters.token;

        console.log("Payload:", payload);
        const response = await fetch(
          "http://127.0.0.1:8080/users/update-status",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        // Check if the response is successful
        if (!response.ok) {
          console.log("Error:", response);
          const errorData = await response.text();
          console.log("Error data:", errorData);
          throw new Error(errorData);
        }

        const data = await response.json();
        this.$emit("action");
        console.log("Request successful: check", data);
      } catch (error) {
        console.error("Error in approve or reject logic:", error);
      }
    },
  },
};
</script>

<style scoped>
.account-request-details {
  text-align: center;
  position: relative;
  padding: 20px;
  /* border: 1px solid #ddd; */
  border-radius: 8px;
  /* width: 400px; */
  margin: 0 auto;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  background: white;
}
.content {
  display: flex;
  justify-content: space-evenly;
  text-align: left;
  align-items: center;
}

.account-request-details p {
  margin: 8px 0;
}

.account-request-details strong {
  font-weight: bold;
}

.profile-picture {
  border-radius: 5px;
  width: 167px;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: 175px;
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
.approve-button:disabled,
.reject-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.approve-button,
.reject-button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.approve-button {
  background-color: #28a745;
  color: white;
}

.approve-button:hover {
  background-color: #218838;
}

.reject-button {
  background-color: #ff4d4f;
  color: white;
}

.reject-button:hover {
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
