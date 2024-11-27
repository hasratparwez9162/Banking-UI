<template>
  <div class="container-fluid">
    <div class="header">
      <h1>Track Application Status</h1>
    </div>
    <div class="Content-container">
      <h1>Check your application status</h1>
      <!-- Bind the dynamic class to the status element -->
      <p class="status" v-if="status" :class="statusClass">{{ statusText }}</p>
      <p v-if="comment" class="comment">
        <strong>Feedback Comment:</strong> {{ comment }}
      </p>

      <form action="p"></form>
      <div class="form-group">
        <label for="applicationId">Enter your application ID</label>
        <input
          type="text"
          id="applicationId"
          name="applicationId"
          v-model="applicationId"
        />
      </div>
      <div class="form-group">
        <button id="submit-button" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrackApplicationStatus",
  data() {
    return {
      applicationId: "",
      status: "", // stores raw status value from the API
      comment: "",
    };
  },
  computed: {
    // Dynamically assign a class based on the status
    statusClass() {
      if (this.status === "reject") {
        return "status-reject";
      } else if (this.status === "pending" || this.status === "inactive") {
        return "status-pending";
      } else if (this.status === "accept") {
        return "status-accept";
      } else if (this.status === "notFound") {
        return "status-notFound";
      }
      return ""; // No class if status doesn't match
    },
    // Display status text based on API response
    statusText() {
      if (this.status === "reject") {
        return "Application Rejected";
      } else if (this.status === "pending" || this.status === "inactive") {
        return "Application is under review. Please check back later.";
      } else if (this.status === "accept") {
        return "Application Accepted. \n Check your email for Details.";
      } else if (this.status === "notFound") {
        return "Application not found";
      }
      return ""; // Default empty if no status
    },
  },
  methods: {
    async submit() {
      console.log("Form submitted: " + this.applicationId);
      try {
        const response = await fetch(
          `http://localhost:8080/users/application/${this.applicationId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 404) {
          this.status = "notFound";
        } else if (!response.ok) {
          const errorData = await response.text();
          console.log("Error fetching application status:", errorData);
          throw new Error(errorData);
        }
        const data = await response.json();
        console.log("Application status data:", data);
        if (data.isActive === "INACTIVE") {
          this.status = "pending";
        } else if (data.isActive === "ACTIVE") {
          this.status = "accept";
        } else if (data.isActive === "REJECTED") {
          this.status = "reject";
        }
        this.comment = data.comments;

        console.log("Application status:", this.status);
      } catch (error) {
        console.error("Error fetching application status:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #fff;
  margin-top: 60px;
  height: 100vh;
}
.header {
  background-color: #333;
  color: white;
  padding: 10px 0;
  text-align: center;
}
.Content-container {
  max-width: 400px;
  margin: 50px auto;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  text-align: left;
}
.form-group select,
input {
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 0px;
}
.form-group button {
  background-color: #ffcccc;
  color: #ff6666;
  border: 1px solid #ff6666;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.form-group button:hover {
  background-color: #ff9999;
}
.status {
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  text-align: center;
}
.comment {
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  color: rgb(102, 95, 95);
  text-align: center;
}

.status-reject {
  background-color: #ff4d4f; /* Red */
}

.status-pending {
  background-color: #faad14; /* Orange */
}

.status-accept {
  background-color: #52c41a; /* Green */
}
.status-notFound {
  color: red;
}
</style>
