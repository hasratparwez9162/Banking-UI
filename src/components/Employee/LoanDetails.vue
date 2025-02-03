<template>
  <div class="loan-details-container model" v-if="loanApplication">
    <div class="content">
      <div class="loan-header text-center">
        <h2>Loan Application Details</h2>
        <div class="d-flex justify-content-between">
          <div>
            <p>
              Application Number:
              <strong>{{ loanApplication.applicationNumber }}</strong>
            </p>
          </div>
          <div>
            <p>
              <strong>Status:</strong>
              {{ formatStatus(loanApplication.status) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Applicant Information -->
      <div class="col-md-12 mb-3">
        <div class="card text-start">
          <h4 class="card-title text-center mt-3 pt-1 w-100">
            Applicant Details
          </h4>
          <hr />
          <div class="d-flex justify-content-around">
            <div class="col-md-6">
              <div class="p-3 mb-4">
                <div class="d-flex justify-content-center">
                  <img
                    v-if="loanApplication.profilePicturePath"
                    :src="loanApplication.profilePicturePath"
                    alt="Profile Picture"
                    class="img-fluid rounded"
                    style="width: 150px; height: 150px; object-fit: cover"
                  />
                </div>
              </div>
            </div>

            <!-- Details in Col-md-8 -->
            <div class="col-md-6">
              <div class="p-3 mb-4">
                <div class="row">
                  <div class="col-md-6">
                    <p>
                      <strong>Name:</strong>
                      {{ loanApplication.info.firstName }}
                      {{ loanApplication.info.lastName }}
                    </p>
                    <p>
                      <strong>Gender:</strong> {{ loanApplication.info.gender }}
                    </p>
                    <p>
                      <strong>City:</strong> {{ loanApplication.info.city }}
                    </p>
                    <p>
                      <strong>Email:</strong> {{ loanApplication.info.email }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Phone Number:</strong>
                      {{ loanApplication.info.phoneNumber }}
                    </p>
                    <p>
                      <strong>Address:</strong>
                      {{ loanApplication.info.address }}
                    </p>
                    <p>
                      <strong>State:</strong> {{ loanApplication.info.state }}
                    </p>
                    <p><strong>Zip:</strong> {{ loanApplication.info.zip }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loan Details -->
      <div class="col-md-12 text-start">
        <div class="card p-3 mb-4">
          <h4 class="card-title text-center">Loan Details</h4>
          <hr />
          <div class="row">
            <div class="col-md-6">
              <p><strong>Loan Type:</strong> {{ loanApplication.loanType }}</p>
              <p>
                <strong>Loan Amount:</strong> ₹{{ loanApplication.loanAmount }}
              </p>
            </div>
            <div class="col-md-6">
              <p>
                <strong>Interest Rate:</strong>
                {{ loanApplication.interestRate }}%
              </p>
              <p><strong>Months:</strong> {{ loanApplication.months }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <p>
                <strong>EMI (Calculated):</strong> ₹{{
                  loanApplication.calculatedEMI
                }}
              </p>
            </div>
            <div class="col-md-6">
              <p>
                <strong>Total Repayment:</strong> ₹{{
                  loanApplication.totalRepayment
                }}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <p>
                <strong>Total Interest:</strong> ₹{{
                  loanApplication.totalInterest
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Dependents -->
      <div class="card py-3 mb-4">
        <h4 class="card-title">Dependents</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>Date of Birth</th>
              <th>Contact Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="dependent in loanApplication.dependents"
              :key="dependent.id"
            >
              <td>{{ dependent.firstName }} {{ dependent.lastName }}</td>
              <td>{{ dependent.relationship }}</td>
              <td>{{ dependent.dob }}</td>
              <td>{{ dependent.contactNumber }}</td>
              <td>{{ dependent.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Documents -->
      <div class="card p-3 mb-4 text-start">
        <h4 class="card-title text-center">Documents</h4>
        <hr />
        <div
          class="d-flex justify-content-between align-items-center flex-wrap"
        >
          <div
            v-if="loanApplication.idProofPath"
            class="me-4 d-flex align-items-center"
          >
            <i class="bi bi-person-badge" style="font-size: 1.5rem"></i
            ><strong>ID Proof:</strong>
            <a :href="loanApplication.idProofPath" target="_blank" class="ms-2">
              <i class="bi bi-eye" style="font-size: 1.5rem"></i>
            </a>
          </div>
          <div
            v-if="loanApplication.addressProofPath"
            class="me-4 d-flex align-items-center"
          >
            <i class="bi bi-geo-alt" style="font-size: 1.5rem"></i>
            <strong>Address Proof:</strong>
            <a
              :href="loanApplication.addressProofPath"
              target="_blank"
              class="ms-2"
            >
              <i class="bi bi-eye" style="font-size: 1.5rem"></i>
            </a>
          </div>
          <div
            v-if="loanApplication.incomeProofPath"
            class="me-4 d-flex align-items-center"
          >
            <i class="bi bi-currency-dollar" style="font-size: 1.5rem"></i>
            <strong>Income Proof:</strong>
            <a
              :href="loanApplication.incomeProofPath"
              target="_blank"
              class="ms-2"
            >
              <i class="bi bi-eye" style="font-size: 1.5rem"></i>
            </a>
          </div>
          <div
            v-if="loanApplication.bankStatementsPath"
            class="me-4 d-flex align-items-center"
          >
            <i class="bi bi-file-text" style="font-size: 1.5rem"></i>
            <strong>Bank Statements:</strong>
            <a
              :href="loanApplication.bankStatementsPath"
              target="_blank"
              class="ms-2"
            >
              <i class="bi bi-eye" style="font-size: 1.5rem"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- Comment Section -->
      <div class="card py-3 mb-4 d-flex align-items-center">
        <h4 class="card-title text-center">Add Comment*</h4>
        <div class="col-md-6">
          <div class="form-group">
            <textarea
              v-model="comments"
              class="form-control"
              placeholder="Add a comment before approving or rejecting the loan..."
              rows="4"
              required
            ></textarea>
            <small v-if="commentError" class="text-danger">
              Comment is required before taking any action.
            </small>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="d-flex justify-content-center mt-3">
        <button
          class="btn btn-success me-3"
          :disabled="!comments || loanApplication.status == 'REJECTED'"
          @click="approveLoan"
        >
          Approve
        </button>
        <button
          class="btn btn-danger me-3"
          :disabled="!comments || loanApplication.status == 'APPROVED'"
          @click="rejectLoan"
        >
          Reject
        </button>
        <button class="btn btn-secondary" @click="closeDetails">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoanDetails",
  props: {
    loanApplication: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: "",
      commentError: false,
    };
  },
  methods: {
    formatStatus(status) {
      return status.replace(/_/g, " ");
    },
    approveLoan() {
      console.log("Loan Approved");
      this.$emit("approve-loan", {
        id: this.loanApplication.id,
        comment: this.comments,
      });
    },
    rejectLoan() {
      console.log("Loan Rejected");
      this.$emit("reject-loan", {
        id: this.loanApplication.id,
        comment: this.comments,
      });
    },
    closeDetails() {
      console.log("Closing Details");
      this.$emit("close-details");
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.list-group-item {
  padding: 10px;
}

a {
  color: blue;
}
.content {
  background-color: white;
  padding: 20px;
}

@media (max-width: 768px) {
  .content {
    padding: 10px;
  }
}
</style>
