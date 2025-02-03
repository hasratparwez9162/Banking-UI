<template>
  <div class="">
    <h3 class="mb-3">Review Your Application</h3>

    <!-- Applicant Info -->
    <section class="mb-4 custom-card">
      <i
        @click="redirectToStep('step1')"
        class="bi bi-pencil-square float-end fs-3 text-primary"
      ></i>
      <h4 class="text-primary text-start">Applicant Information</h4>

      <table class="table table-bordered">
        <tbody>
          <tr class="w-30">
            <th class="w-10">First Name</th>
            <td class="w-30 text-start">{{ form.info.firstName }}</td>
            <th class="w-20">Last Name</th>
            <td class="w-30">{{ form.info.lastName }}</td>
          </tr>
          <tr>
            <th class="w-20">Date of Birth</th>
            <td class="w-30">{{ form.info.dateOfBirth }}</td>
            <th class="w-20">Marital Status</th>
            <td class="w-30">{{ form.info.maritalStatus }}</td>
          </tr>
          <tr>
            <th class="w-20">Phone Number</th>
            <td class="w-30">{{ form.info.phoneNumber }}</td>

            <th v-if="form.info.maritalStatus === 'Married'" class="w-20">
              Spouse Name
            </th>
            <td v-if="form.info.maritalStatus === 'Married'" class="w-30">
              {{ form.info.spouse }}
            </td>

            <th v-if="form.info.maritalStatus === 'Single'" class="w-20">
              Email
            </th>
            <td v-if="form.info.maritalStatus === 'Single'" class="w-30">
              {{ form.info.email }}
            </td>
          </tr>
          <tr>
            <th class="w-20">Gender</th>
            <td class="w-30">{{ form.info.gender }}</td>
            <th class="w-20">Address</th>
            <td class="w-30">{{ form.info.address }}</td>
          </tr>
          <tr>
            <th class="w-20">State</th>
            <td class="w-30">{{ form.info.state }}</td>
            <th class="w-20">City</th>
            <td class="w-30">{{ form.info.city }}</td>
          </tr>
          <tr>
            <th class="w-20">Pin Code</th>
            <td class="w-30">{{ form.info.zip }}</td>
            <th v-if="form.info.maritalStatus === 'Married'" class="w-20">
              Email
            </th>
            <td v-if="form.info.maritalStatus === 'Married'">
              {{ form.info.email }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Occupation -->
    <section class="mb-4 custom-card">
      <i
        @click="redirectToStep('occupation')"
        class="bi bi-pencil-square float-end fs-3 text-primary"
      ></i>
      <h4 class="text-primary text-start">Occupation</h4>

      <table class="table table-bordered">
        <tbody>
          <tr>
            <th class="w-20">Occupation</th>
            <td class="w-30">{{ form.occupation.occupation }}</td>
            <th class="w-20">Employer Details</th>
            <td class="w-30">{{ form.occupation.employerDetails }}</td>
          </tr>
          <tr>
            <th class="w-20">Monthly Income</th>
            <td class="w-30">
              {{ form.occupation.monthlyIncome }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Dependents -->
    <section v-if="form.dependents.length" class="mb-4 custom-card">
      <i
        @click="redirectToStep('step3')"
        class="bi bi-pencil-square float-end fs-3 text-primary"
      ></i>
      <h4 class="text-primary text-start">Dependents</h4>

      <table class="table table-bordered">
        <thead>
          <tr class="custom-text-center">
            <th class="w-10">#</th>
            <th class="w-15">First Name</th>
            <th class="w-15">Last Name</th>
            <th class="w-20">Relationship</th>
            <th class="w-15">DOB</th>
            <th class="w-10">Gender</th>
            <th class="w-15">Phone</th>
            <th class="w-15">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dependent, index) in form.dependents" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ dependent.firstName }}</td>
            <td>{{ dependent.lastName }}</td>
            <td>{{ dependent.relationship }}</td>
            <td>{{ displayDate(dependent.dob) }}</td>
            <td>{{ dependent.gender }}</td>
            <td>{{ dependent.phoneNumber }}</td>
            <td>{{ dependent.email }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Loan Details -->
    <section class="mb-4 custom-card">
      <i
        @click="redirectToStep('step4')"
        class="bi bi-pencil-square float-end fs-3 text-primary"
      ></i>
      <h4 class="text-primary text-start">Loan Details</h4>

      <table class="table table-bordered">
        <tbody>
          <tr>
            <th class="w-20">Loan Type</th>
            <td class="w-30">{{ form.loanType }}</td>
            <th class="w-20">Loan Amount</th>
            <td class="w-30">{{ form.loanAmount }}</td>
          </tr>
          <tr>
            <th class="w-20">Interest Rate</th>
            <td class="w-30">{{ form.interestRate }}</td>
            <th class="w-20">Months</th>
            <td class="w-30">{{ form.months }}</td>
          </tr>
          <tr>
            <th class="w-20">Total Repayment</th>
            <td class="w-30">{{ form.totalRepayment }}</td>
            <th class="w-20">Total Interest</th>
            <td class="w-30">{{ form.totalInterest }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { getNode } from "@formkit/core";

export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  methods: {
    displayDate(date) {
      const d = new Date(date);
      if (isNaN(d)) {
        throw new Error("Invalid date format. Please provide a valid date.");
      }
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${day}-${month}-${year}`;
    },
    redirectToStep(step) {
      const node = getNode("multi-step"); // Assuming `multi-step` is the ID of the formkit node
      node.goTo(step);
    },
  },
};
</script>

<style scoped>
h4 {
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}
.table th {
  text-align: left;
}

.table td {
  text-align: left;
}
</style>
