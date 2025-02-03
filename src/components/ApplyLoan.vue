<template>
  <div class="container-fluid mt-3">
    <h2>Loan Application Form</h2>
    <nav class="progress-bar">
      <!-- Loop through stages 1-5, excluding Stage 6 -->
      <button
        v-for="(step, index) in steps.slice(0, 5)"
        :key="index"
        :class="{ 'active-step': stage === index + 1 }"
        :disabled="isStepDisabled(index + 1)"
        @click="goToStage(index + 1)"
      >
        {{ step }}
      </button>

      <!-- Separate button for Stage 6 (Document Upload) -->
      <button
        :disabled="!FormSubmited"
        :class="{ 'active-step': stage === 6 }"
        @click="goToStage(6)"
      >
        {{ steps[5] }}
        <!-- Display the label for Stage 6 -->
      </button>
    </nav>

    <form class="container card" @submit.prevent="submitForm">
      <!-- Applicant Information -->
      <div class="p-3" v-if="stage === 1">
        <h3>Applicant Information</h3>
        <div class="row text-start">
          <div class="col-md-6 form-group mb-2">
            <label for="firstName">First Name*</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              v-model="form.info.firstName"
              minlength="2"
              maxlength="30"
              required
            />
            <span class="error" v-if="errors.firstName">{{
              errors.firstName
            }}</span>
          </div>
          <div class="col-md-6 form-group mb-2">
            <label for="lastName">Last Name*</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              v-model="form.info.lastName"
              minlength="2"
              maxlength="30"
              required
            />
            <span class="error" v-if="errors.lastName">{{
              errors.lastName
            }}</span>
          </div>
          <div class="col-md-6 form-group mb-2">
            <label for="dateOfBirth">Date of Birth*</label>
            <input
              type="date"
              class="form-control"
              id="dateOfBirth"
              v-model="form.info.dateOfBirth"
              :max="maxDate"
              required
            />
            <span class="error" v-if="errors.dateOfBirth">{{
              errors.dateOfBirth
            }}</span>
          </div>
          <div class="col-md-6 form-group mb-2">
            <label for="phoneNumber">Contact Number*</label>
            <input
              type="tel"
              class="form-control"
              id="phoneNumber"
              v-model="form.info.phoneNumber"
              maxlength="10"
              required
            />
            <span class="error" v-if="errors.phoneNumber">{{
              errors.phoneNumber
            }}</span>
          </div>
          <div class="col-md-6 form-group mb-2">
            <label for="gender">Gender*</label>
            <select
              class="form-select"
              id="gender"
              v-model="form.info.gender"
              required
            >
              <option disabled value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <span class="error" v-if="errors.gender">{{ errors.gender }}</span>
          </div>
          <div class="col-md-6 form-group mb-2">
            <label for="maritalStatus">Marital Status*</label>
            <select
              class="form-select"
              id="maritalStatus"
              v-model="form.info.maritalStatus"
              @change="handleMaritalStatusChange"
              required
            >
              <option disabled value="">Select</option>
              <option value="Married">Married</option>
              <option value="Single">Single</option>
            </select>
            <span class="error" v-if="errors.maritalStatus">{{
              errors.maritalStatus
            }}</span>
          </div>
          <!-- Spouse Name Field (conditionally rendered) -->
          <div
            class="col-md-6 form-group mb-3"
            v-if="form.info.maritalStatus === 'Married'"
          >
            <label for="spouseName">Spouse Name*</label>
            <input
              type="text"
              class="form-control"
              id="spouseName"
              v-model="spouseName"
              minlength="2"
              maxlength="40"
              @blur="createDependentForSpouse"
              required
            />
            <span class="error" v-if="errors.spouseName">{{
              errors.spouseName
            }}</span>
          </div>
          <div class="col-md-6 form-group mb-2">
            <label for="email">Email Address*</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="form.info.email"
              @input="limitInput($event, 30, 'info.email')"
              required
            />
            <span class="error" v-if="errors.email">{{ errors.email }}</span>
          </div>
          <div class="col-md-6 form-group mb-2">
            <label for="address">Address*</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="form.info.address"
              @input="limitInput($event, 70, 'info.address')"
              required
            />
            <span class="error" v-if="errors.address">{{
              errors.address
            }}</span>
          </div>
          <div class="col-md-6 form-group mb-2">
            <label for="state">State*</label>
            <select
              class="form-select"
              id="state"
              v-model="selectedState"
              @change="fetchCities()"
              required
            >
              <option disabled value="">Select State</option>
              <option v-for="state in states" :key="state" :value="state">
                {{ state.name }}
              </option>
            </select>
            <span class="error" v-if="errors.state">{{ errors.state }}</span>
          </div>
          <div class="col-md-6 form-group mb-2">
            <label for="city">City*</label>
            <select
              class="form-select"
              id="city"
              v-model="form.info.city"
              required
            >
              <option disabled value="">Select City</option>
              <option v-for="city in cities" :key="city" :value="city.name">
                {{ city.name }}
              </option>
            </select>
            <span class="error" v-if="errors.city">{{ errors.city }}</span>
          </div>
          <div class="col-md-6 form-group mb-2">
            <label for="zip">Pin Code*</label>
            <input
              type="number"
              class="form-control"
              id="zip"
              v-model="form.info.zip"
              @input="limitInput($event, 6, 'info.zip')"
              required
            />
            <span class="error" v-if="errors.zip">{{ errors.zip }}</span>
          </div>

          <div class="col-md-6 form-group mb-2">
            <label for="alternatePhoneNumber">Alternate Phone Number</label>
            <input
              type="tel"
              class="form-control"
              id="alternatePhoneNumber"
              v-model="form.info.alternatePhoneNumber"
              maxlength="10"
            />
            <span class="error" v-if="errors.alternatePhoneNumber">{{
              errors.alternatePhoneNumber
            }}</span>
          </div>
        </div>
        <hr />
        <button
          type="button"
          class="btn btn-primary float-end"
          @click="validateStage(1) && nextStage()"
        >
          Next
        </button>
      </div>

      <div class="p-3" v-if="stage === 2">
        <h3>Occupation</h3>
        <div class="row text-start">
          <!-- Occupation -->
          <div class="col-md-6 form-group">
            <label for="occupation">Occupation*</label>
            <select
              class="form-control"
              id="occupation"
              v-model="form.occupation"
              required
            >
              <option value="Salaried">Salaried</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Other">Other</option>
            </select>
            <span class="error" v-if="errors.occupation">{{
              errors.occupation
            }}</span>
          </div>

          <!-- Employer Details -->
          <div class="col-md-6 form-group">
            <label for="employerDetails">Employer Details*</label>
            <input
              type="text"
              class="form-control"
              id="employerDetails"
              v-model="form.employerDetails"
              required
              maxlength="50"
            />
            <span class="error" v-if="errors.employerDetails">{{
              errors.employerDetails
            }}</span>
          </div>

          <!-- Monthly Income -->
          <div class="col-md-6 form-group">
            <label for="monthlyIncome">Monthly Income*</label>
            <input
              type="number"
              class="form-control"
              id="monthlyIncome"
              v-model="form.monthlyIncome"
              required
              @input="limitInput($event, 10, 'monthlyIncome')"
            />
            <span class="error" v-if="errors.monthlyIncome">{{
              errors.monthlyIncome
            }}</span>
          </div>
        </div>

        <hr />
        <div class="d-flex justify-content-between">
          <!-- Previous Button -->
          <button type="button" class="btn btn-primary" @click="prevStage">
            Previous
          </button>
          <!-- Next Button -->
          <button
            type="button"
            class="btn btn-primary"
            @click="validateStage(2) && nextStage()"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Dependent Details -->
      <div class="p-3" v-if="stage === 3">
        <h3>Dependent Details</h3>
        <table class="table">
          <thead>
            <tr>
              <th>First Name*</th>
              <th>Last Name*</th>
              <th>Relationship*</th>
              <th>Date of Birth*</th>
              <th>Gender*</th>
              <th>Contact Number*</th>
              <th>Email*</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dependent, index) in form.dependents" :key="index">
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="dependent.firstName"
                  maxlength="30"
                  required
                />
                <span class="error" v-if="errors[`firstName${index}`]">{{
                  errors[`firstName${index}`]
                }}</span>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="dependent.lastName"
                  maxlength="30"
                  required
                />
                <span class="error" v-if="errors[`lastName${index}`]">{{
                  errors[`lastName${index}`]
                }}</span>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="dependent.relationship"
                  maxlength="30"
                  required
                />
                <span class="error" v-if="errors[`relationship${index}`]">{{
                  errors[`relationship${index}`]
                }}</span>
              </td>
              <td>
                <input
                  type="date"
                  class="form-control"
                  v-model="dependent.dob"
                  :max="maxDate"
                  required
                />
                <span class="error" v-if="errors[`dob${index}`]">{{
                  errors[`dob${index}`]
                }}</span>
              </td>
              <td>
                <select class="form-select" v-model="dependent.gender" required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <span class="error" v-if="errors[`gender${index}`]">{{
                  errors[`gender${index}`]
                }}</span>
              </td>
              <td>
                <input
                  type="tel"
                  class="form-control"
                  v-model="dependent.contactNumber"
                  required
                />
                <span class="error" v-if="errors[`contactNumber${index}`]">{{
                  errors[`contactNumber${index}`]
                }}</span>
              </td>
              <td>
                <input
                  type="email"
                  class="form-control"
                  v-model="dependent.email"
                  required
                />
                <span class="error" v-if="errors[`email${index}`]">{{
                  errors[`email${index}`]
                }}</span>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="removeDependent(index)"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-primary" @click="prevStage">
            Previous
          </button>
          <div>
            <button
              type="button"
              class="btn btn-primary"
              style="margin-right: 1rem"
              @click="addDependent"
            >
              Add Dependent
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="validateStage(3) && nextStage()"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- Loan Details -->
      <div class="p-3" v-if="stage === 4">
        <h3>Loan Details</h3>
        <div class="form-group d-flex justify-content-between">
          <!-- Radio buttons for loan types -->
          <div class="d-flex">
            <div class="form-check me-3">
              <input
                type="radio"
                class="form-check-input"
                id="homeLoan"
                name="loanType"
                value="Home Loan"
                v-model="form.loanType"
                @change="updateInterestRate"
              />
              <label class="form-check-label" for="homeLoan"> Home Loan </label>
            </div>

            <div class="form-check me-3">
              <input
                type="radio"
                class="form-check-input"
                id="carLoan"
                name="loanType"
                value="Auto Loan"
                v-model="form.loanType"
                @change="updateInterestRate"
              />
              <label class="form-check-label" for="carLoan"> Auto Loan </label>
            </div>

            <div class="form-check me-3">
              <input
                type="radio"
                class="form-check-input"
                id="personalLoan"
                name="loanType"
                value="Personal Loan"
                v-model="form.loanType"
                @change="updateInterestRate"
              />
              <label class="form-check-label" for="personalLoan">
                Personal Loan
              </label>
            </div>

            <span class="error" v-if="errors.loanType">{{
              errors.loanType
            }}</span>
          </div>
          <div class="form-group d-flex">
            <p><strong>Interest Rate:</strong> {{ form.interestRate }} %</p>
          </div>
        </div>
        <div class="p-3" v-if="stage === 4 && form.loanType === 'Home Loan'">
          <!-- <h3>Home Loan Specific Details</h3> -->
          <div class="text-start">
            <div class="row">
              <div class="col-md-6">
                <label for="loanAmount">Loan Amount*</label>
                <input
                  type="number"
                  class="form-control"
                  id="loanAmount"
                  v-model="form.loanAmount"
                  @input="limitInput($event, 10, 'loanAmount')"
                  required
                />
                <span class="error" v-if="errors.loanAmount">{{
                  errors.loanAmount
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="loanMonths">Loan Months*</label>
                <input
                  type="number"
                  class="form-control"
                  id="loanMonths"
                  v-model="form.months"
                  @input="limitInput($event, 3, 'months')"
                  required
                />
                <span class="error" v-if="errors.months">{{
                  errors.months
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="loanPurpose">Loan Purpose*</label>
                <select
                  class="form-select"
                  id="loanPurpose"
                  v-model="form.homeLoanDetails.loanPurpose"
                  required
                >
                  <option value="Purchase">Purchase</option>
                  <option value="Construction">Construction</option>
                  <option value="Renovation">Renovation</option>
                </select>
                <span class="error" v-if="errors.loanPurpose">{{
                  errors.loanPurpose
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="propertyType">Property Type*</label>
                <select
                  class="form-select"
                  id="propertyType"
                  v-model="form.homeLoanDetails.propertyType"
                  required
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Land">Land</option>
                </select>
                <span class="error" v-if="errors.propertyType">{{
                  errors.propertyType
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="propertyAddress">Property Address*</label>
                <input
                  type="text"
                  class="form-control"
                  id="propertyAddress"
                  v-model="form.homeLoanDetails.propertyAddress"
                  maxlength="70"
                  required
                />
                <span class="error" v-if="errors.propertyAddress">{{
                  errors.propertyAddress
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="builtUpArea">Built-up Area (in sq. ft.)*</label>
                <input
                  type="number"
                  class="form-control"
                  id="builtUpArea"
                  v-model="form.homeLoanDetails.builtUpArea"
                  @input="limitInput($event, 5, 'homeLoanDetails.builtUpArea')"
                  required
                />
                <span class="error" v-if="errors.builtUpArea">{{
                  errors.builtUpArea
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="yearOfConstruction">Year of Construction*</label>
                <input
                  type="number"
                  class="form-control"
                  id="yearOfConstruction"
                  v-model="form.homeLoanDetails.yearOfConstruction"
                  @input="
                    limitInput($event, 4, 'homeLoanDetails.yearOfConstruction')
                  "
                  required
                />
                <span class="error" v-if="errors.yearOfConstruction">{{
                  errors.yearOfConstruction
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="propertyPrice">Property Price*</label>
                <input
                  type="number"
                  class="form-control"
                  id="propertyPrice"
                  v-model="form.homeLoanDetails.propertyPrice"
                  @input="
                    limitInput($event, 10, 'homeLoanDetails.propertyPrice')
                  "
                  required
                />
                <span class="error" v-if="errors.propertyPrice">{{
                  errors.propertyPrice
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="builderDetails">Builder Details</label>
                <input
                  type="text"
                  class="form-control"
                  id="builderDetails"
                  v-model="form.homeLoanDetails.builderDetails"
                  maxlength="50"
                  required
                />
                <span class="error" v-if="errors.builderDetails">{{
                  errors.builderDetails
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="builderContact">Builder Contact</label>
                <input
                  type="number"
                  class="form-control"
                  id="builderContact"
                  v-model="form.homeLoanDetails.builderContact"
                  @input="
                    limitInput($event, 10, 'homeLoanDetails.builderContact')
                  "
                  required
                />
                <span class="error" v-if="errors.builderContact">{{
                  errors.builderContact
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="builderAddress">Builder Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="builderAddress"
                  v-model="form.homeLoanDetails.builderAddress"
                  maxlength="70"
                  required
                />
                <span class="error" v-if="errors.builderAddress">{{
                  errors.builderAddress
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="registrationDetails">Registration Details*</label>
                <input
                  type="text"
                  class="form-control"
                  id="registrationDetails"
                  v-model="form.homeLoanDetails.registrationDetails"
                  maxlength="20"
                  required
                />
                <span class="error" v-if="errors.registrationDetails">{{
                  errors.registrationDetails
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3" v-if="stage === 4 && form.loanType === 'Auto Loan'">
          <!-- <h3>Auto Loan Specific Details</h3> -->
          <div class="text-start">
            <div class="row">
              <div class="col-md-6">
                <label for="loanAmount">Loan Amount*</label>
                <input
                  type="number"
                  class="form-control"
                  id="loanAmount"
                  v-model="form.loanAmount"
                  @input="limitInput($event, 10, 'loanAmount')"
                  required
                />
                <span class="error" v-if="errors.loanAmount">{{
                  errors.loanAmount
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="loanMonths">Loan Months*</label>
                <input
                  type="number"
                  class="form-control"
                  id="loanMonths"
                  v-model="form.months"
                  @input="limitInput($event, 3, 'months')"
                  required
                />
                <span class="error" v-if="errors.months">{{
                  errors.months
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="vehicleType">Vehicle Type*</label>
                <select
                  class="form-select"
                  id="vehicleType"
                  v-model="form.vehicleLoanDetails.vehicleType"
                  required
                >
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Truck">Truck</option>
                </select>
                <span class="error" v-if="errors.vehicleType">{{
                  errors.vehicleType
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="makeModel">Make and Model*</label>
                <input
                  type="text"
                  class="form-control"
                  id="makeModel"
                  v-model="form.vehicleLoanDetails.makeModel"
                  maxlength="20"
                  required
                />
                <span class="error" v-if="errors.makeModel">{{
                  errors.makeModel
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="manufacturingYear">Manufacturing Year*</label>
                <input
                  type="number"
                  class="form-control"
                  id="manufacturingYear"
                  v-model="form.vehicleLoanDetails.manufacturingYear"
                  @input="
                    limitInput(
                      $event,
                      4,
                      'vehicleLoanDetails.manufacturingYear'
                    )
                  "
                  required
                />
                <span class="error" v-if="errors.manufacturingYear">{{
                  errors.manufacturingYear
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="variant">Variant*</label>
                <input
                  type="text"
                  class="form-control"
                  id="variant"
                  v-model="form.vehicleLoanDetails.variant"
                  maxlength="20"
                  required
                />
                <span class="error" v-if="errors.variant">{{
                  errors.variant
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="exShowroomPrice">Ex-Showroom Price*</label>
                <input
                  type="number"
                  class="form-control"
                  id="exShowroomPrice"
                  v-model="form.vehicleLoanDetails.exShowroomPrice"
                  @input="
                    limitInput($event, 10, 'vehicleLoanDetails.exShowroomPrice')
                  "
                  required
                />
                <span class="error" v-if="errors.exShowroomPrice">{{
                  errors.exShowroomPrice
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="onRoadPrice">On-Road Price*</label>
                <input
                  type="number"
                  class="form-control"
                  id="onRoadPrice"
                  v-model="form.vehicleLoanDetails.onRoadPrice"
                  @input="
                    limitInput($event, 10, 'vehicleLoanDetails.onRoadPrice')
                  "
                  required
                />
                <span class="error" v-if="errors.onRoadPrice">{{
                  errors.onRoadPrice
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="color">Color*</label>
                <input
                  type="text"
                  class="form-control"
                  id="color"
                  v-model="form.vehicleLoanDetails.color"
                  maxlength="20"
                  required
                />
                <span class="error" v-if="errors.color">{{
                  errors.color
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="registrationNumber"
                  >Registration Number( If Required)</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="registrationNumber"
                  v-model="form.vehicleLoanDetails.registrationNumber"
                  maxlength="30"
                  required
                />
                <span class="error" v-if="errors.registrationNumber">{{
                  errors.registrationNumber
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="insuranceProvider">Insurance Provider*</label>
                <input
                  type="text"
                  class="form-control"
                  id="insuranceProvider"
                  v-model="form.vehicleLoanDetails.insuranceProvider"
                  maxlength="30"
                  required
                />
                <span class="error" v-if="errors.insuranceProvider">{{
                  errors.insuranceProvider
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="dealerName">Dealer Name*</label>
                <input
                  type="text"
                  class="form-control"
                  id="dealerName"
                  v-model="form.vehicleLoanDetails.dealerName"
                  maxlength="30"
                  required
                />
                <span class="error" v-if="errors.dealerName">{{
                  errors.dealerName
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="dealerContact">Dealer Contact*</label>
                <input
                  type="text"
                  class="form-control"
                  id="dealerContact"
                  v-model="form.vehicleLoanDetails.dealerContact"
                  maxlength="10"
                  required
                />
                <span class="error" v-if="errors.dealerContact">{{
                  errors.dealerContact
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="dealerAddress">Dealer Address*</label>
                <input
                  type="text"
                  class="form-control"
                  id="dealerAddress"
                  v-model="form.vehicleLoanDetails.dealerAddress"
                  maxlength="70"
                  required
                />
                <span class="error" v-if="errors.dealerAddress">{{
                  errors.dealerAddress
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="downPaymentAmount">Down Payment Amount*</label>
                <input
                  type="number"
                  class="form-control"
                  id="downPaymentAmount"
                  v-model="form.vehicleLoanDetails.downPaymentAmount"
                  @input="
                    limitInput(
                      $event,
                      10,
                      'vehicleLoanDetails.downPaymentAmount'
                    )
                  "
                  required
                />
                <span class="error" v-if="errors.downPaymentAmount">{{
                  errors.downPaymentAmount
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="downPaymentSource">Source of Down Payment*</label>
                <input
                  type="text"
                  class="form-control"
                  id="downPaymentSource"
                  v-model="form.vehicleLoanDetails.downPaymentSource"
                  maxlength="20"
                  required
                />
                <span class="error" v-if="errors.downPaymentSource">{{
                  errors.downPaymentSource
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Loan Specific Details Section -->
        <div
          class="p-3"
          v-if="stage === 4 && form.loanType === 'Personal Loan'"
        >
          <!-- <h3>Personal Loan Specific Details</h3> -->
          <div class="text-start">
            <div class="row">
              <div class="col-md-6">
                <label for="loanAmount">Loan Amount*</label>
                <input
                  type="number"
                  class="form-control"
                  id="loanAmount"
                  v-model="form.loanAmount"
                  @input="limitInput($event, 10, 'loanAmount')"
                  required
                />
                <span class="error" v-if="errors.loanAmount">{{
                  errors.loanAmount
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="loanMonths">Loan Months*</label>
                <input
                  type="number"
                  class="form-control"
                  id="loanMonths"
                  v-model="form.months"
                  @input="limitInput($event, 3, 'months')"
                  required
                />
                <span class="error" v-if="errors.months">{{
                  errors.months
                }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="purpose">Purpose of Loan*</label>
                <select
                  class="form-select"
                  id="purpose"
                  v-model="form.personalLoanDetails.purpose"
                  required
                >
                  <option value="Medical">Medical</option>
                  <option value="Education">Education</option>
                  <option value="Marriage">Marriage</option>
                  <option value="Other">Other</option>
                </select>
                <span class="error" v-if="errors.purpose">{{
                  errors.purpose
                }}</span>
              </div>
            </div>

            <div
              v-if="form.personalLoanDetails.purpose === 'Medical'"
              class="row"
            >
              <div class="col-md-6">
                <label for="hospitalName">Hospital Name and Address*</label>
                <input
                  type="text"
                  class="form-control"
                  id="hospitalName"
                  v-model="form.personalLoanDetails.hospitalName"
                  required
                  maxlength="100"
                />
                <span class="error" v-if="errors.hospitalName">{{
                  errors.hospitalName
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="estimatedExpense">Estimated Expense*</label>
                <input
                  type="number"
                  class="form-control"
                  id="estimatedExpense"
                  v-model="form.personalLoanDetails.estimatedExpense"
                  required
                  @input="
                    limitInput(
                      $event,
                      10,
                      'personalLoanDetails.estimatedExpense'
                    )
                  "
                />
                <span class="error" v-if="errors.estimatedExpense">{{
                  errors.estimatedExpense
                }}</span>
              </div>
            </div>

            <div
              v-if="form.personalLoanDetails.purpose === 'Education'"
              class="row"
            >
              <div class="col-md-6">
                <label for="institutionName"
                  >Institution Name and Address*</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="institutionName"
                  v-model="form.personalLoanDetails.institutionName"
                  required
                  maxlength="100"
                />
                <span class="error" v-if="errors.institutionName">{{
                  errors.institutionName
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="courseName">Course Name*</label>
                <input
                  type="text"
                  class="form-control"
                  id="courseName"
                  v-model="form.personalLoanDetails.courseName"
                  required
                  maxlength="40"
                />
                <span class="error" v-if="errors.courseName">{{
                  errors.courseName
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="duration">Duration*</label>
                <input
                  type="text"
                  class="form-control"
                  id="duration"
                  v-model="form.personalLoanDetails.duration"
                  required
                  maxlength="10"
                />
                <span class="error" v-if="errors.duration">{{
                  errors.duration
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="fee">Fee*</label>
                <input
                  type="text"
                  class="form-control"
                  id="fee"
                  v-model="form.personalLoanDetails.fee"
                  required
                  maxlength="10"
                />
                <span class="error" v-if="errors.fee">{{ errors.fee }}</span>
              </div>
            </div>

            <div
              v-if="form.personalLoanDetails.purpose === 'Marriage'"
              class="row"
            >
              <div class="col-md-6">
                <label for="venueDetails">Venue Details*</label>
                <input
                  type="text"
                  class="form-control"
                  id="venueDetails"
                  v-model="form.personalLoanDetails.venueDetails"
                  required
                  maxlength="50"
                />
                <span class="error" v-if="errors.venueDetails">{{
                  errors.venueDetails
                }}</span>
              </div>
              <div class="col-md-6">
                <label for="estimatedExpense">Estimated Expense*</label>
                <input
                  type="number"
                  class="form-control"
                  id="estimatedExpense"
                  v-model="form.personalLoanDetails.estimatedExpense"
                  required
                  @input="
                    limitInput(
                      $event,
                      10,
                      'personalLoanDetails.estimatedExpense'
                    )
                  "
                />
                <span class="error" v-if="errors.estimatedExpense">{{
                  errors.estimatedExpense
                }}</span>
              </div>
            </div>

            <div
              v-if="form.personalLoanDetails.purpose === 'Other'"
              class="row"
            >
              <div class="col-md-6">
                <label for="otherPurpose">Specify the Purpose*</label>
                <input
                  type="text"
                  class="form-control"
                  id="otherPurpose"
                  v-model="form.personalLoanDetails.otherPurpose"
                  required
                  maxlength="100"
                />
                <span class="error" v-if="errors.otherPurpose">{{
                  errors.otherPurpose
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-primary" @click="prevStage">
            Previous
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="validateStage(4) && nextStage()"
          >
            Next
          </button>
        </div>
      </div>

      <!-- EMI AND Loan Details -->
      <div class="p-3" v-if="stage === 5">
        <div class="container mt-4">
          <div class="row g-4">
            <!-- Loan Details Section -->
            <div class="col-md-7">
              <div class="rounded shadow p-4 pb-5">
                <h5>Loan Details</h5>
                <div
                  class="d-flex justify-content-between items-center gap-2 p-3 border-bottom"
                >
                  <div class="font-medium">Loan Amount:</div>
                  <div class="font-medium whitespace-nowrap">
                    <input
                      @input="updateEmi"
                      type="number"
                      v-model="form.loanAmount"
                    />
                  </div>
                </div>
                <div
                  class="d-flex justify-content-between items-center gap-2 p-3 border-bottom"
                >
                  <div class="font-medium">Months:</div>
                  <div class="font-medium whitespace-nowrap">
                    <input
                      @input="updateEmi"
                      type="number"
                      v-model="form.months"
                    />
                  </div>
                </div>
                <div
                  class="d-flex justify-content-between items-center gap-2 p-3 border-bottom"
                >
                  <div class="font-medium">Interest Rate:</div>
                  <div class="font-medium whitespace-nowrap">
                    <span>{{ form.interestRate }}%</span>
                  </div>
                </div>
                <div
                  class="d-flex justify-content-between items-center gap-2 p-3 border-bottom"
                >
                  <div class="font-medium">EMI Payable:</div>
                  <div class="font-medium whitespace-nowrap">
                    <span>₹{{ form.calculatedEMI }}</span>
                  </div>
                </div>
                <div
                  class="d-flex justify-content-between items-center gap-2 p-3 border-bottom"
                >
                  <div class="font-medium">Total Interest:</div>
                  <div class="font-medium whitespace-nowrap">
                    <span>₹{{ form.totalInterest }}</span>
                  </div>
                </div>
                <div
                  class="d-flex justify-content-between items-center gap-2 p-3"
                >
                  <div class="font-medium">Payable Amount:</div>
                  <div class="font-medium whitespace-nowrap">
                    <span>₹{{ form.totalRepayment }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Loan Breakdown Section -->
            <div class="col-md-5">
              <div class="p-4 bg-white rounded shadow">
                <canvas
                  id="donutChart"
                  style="max-height: 325px; height: 100%; width: 100%"
                ></canvas>
                <div class="mt-4">
                  <div class="d-flex align-items-center mb-2">
                    <div
                      class="rounded-circle me-2"
                      style="
                        width: 16px;
                        height: 16px;
                        background-color: #4caf50;
                      "
                    ></div>
                    Principal Amount: ₹{{ form.loanAmount }}
                  </div>
                  <div class="d-flex align-items-center">
                    <div
                      class="rounded-circle me-2"
                      style="
                        width: 16px;
                        height: 16px;
                        background-color: #2196f3;
                      "
                    ></div>
                    Interest Amount: ₹{{ form.totalInterest }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-primary" @click="prevStage">
            Previous
          </button>
          <button v-if="!FormSubmited" type="submit" class="btn btn-success">
            Submit Form
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click="validateStage(5) && nextStage()"
          >
            Next
          </button>
        </div>
      </div>
    </form>
    <!-- Document Upload Stage -->
    <div class="container card">
      <div class="p-3" v-if="stage === 6">
        <h3>Document Upload</h3>

        <div
          v-for="(fileField, index) in fileFields"
          :key="index"
          class="form-group"
        >
          <label :for="fileField.id">{{ fileField.label }}</label>
          <input
            type="file"
            class="form-control"
            :id="fileField.id"
            @change="handleFileUpload(fileField.id)"
            :class="{ 'is-invalid': errors[fileField.id] }"
          />
          <div v-if="errors[fileField.id]" class="invalid-feedback">
            {{ errors[fileField.id] }}
          </div>
        </div>

        <hr />
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-secondary" @click="prevStage">
            Previous
          </button>
          <button type="button" class="btn btn-primary" @click="uploadFiles()">
            Upload and Finalize
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { markRaw } from "vue";
import AWS from "aws-sdk";
Chart.register(...registerables);

export default {
  computed: {
    maxDate() {
      const today = new Date();
      today.setDate(today.getDate());
      return today.toISOString().split("T")[0];
    },
  },
  data() {
    return {
      states: "",
      selectedState: {
        id: "",
        name: "",
        iso2: "",
      },
      cities: "",
      country: "India",
      chart: null,
      stage: 6,
      steps: [
        "Applicant Info",
        "Occupation",
        "Dependent Details",
        "Loan Details",
        "Interest & EMI",
        "Document Upload",
      ],
      isSubmitted: false,
      spouseName: "",
      applicationNumber: "",
      FormSubmited: false,
      form: {
        userId: "",
        interestRate: "",
        months: 3,
        loanAmount: "",
        emiCalculated: false,
        calculatedEMI: 0,
        totalRepayment: 0,
        totalInterest: 0,
        info: {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          maritalStatus: "",
          phoneNumber: "",
          email: "",
          address: "",
          state: "",
          city: "",
          zip: "",
          gender: "",
          alternatePhoneNumber: "",
        },
        occupation: "",
        employerDetails: "",
        monthlyIncome: "",
        dependents: [],
        loanType: "",

        homeLoanDetails: {
          loanPurpose: "",
          propertyType: "",
          propertyAddress: "",
          builtUpArea: "",
          yearOfConstruction: "",
          propertyPrice: "",
          builderDetails: "",
          builderContact: "",
          builderAddress: "",
          registrationDetails: "",
        },
        vehicleLoanDetails: {
          vehicleType: "",
          makeModel: "",
          manufacturingYear: "",
          variant: "",
          exShowroomPrice: "",
          onRoadPrice: "",
          color: "",
          registrationNumber: "",
          insuranceProvider: "",
          dealerName: "",
          dealerContact: "",
          dealerAddress: "",
          quotationUpload: null,
          downPaymentAmount: "",
          downPaymentSource: "",
        },
        personalLoanDetails: {
          purpose: "",
          hospitalName: "",
          estimatedExpense: "",
          institutionName: "",
          courseName: "",
          duration: "",
          fee: "",
          venueDetails: "",
          otherPurpose: "",
        },
      },
      profilePicturePath: "",
      idProofPath: "",
      addressProofPath: "",
      incomeProofPath: "",
      bankStatementsPath: "",
      collateralProofPath: "",
      loanRates: {
        "Home Loan": 10,
        "Auto Loan": 8,
        "Personal Loan": 12,
      },

      errors: {},

      fileFields: [
        {
          id: "idProof",
          label: "ID Proof",
          required: true,
          maxSize: 5,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "addressProof",
          label: "Address Proof",
          required: true,
          maxSize: 5,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "incomeProof",
          label: "Income Proof",
          required: true,
          maxSize: 5,
          acceptedTypes: ["application/pdf"],
        },
        {
          id: "bankStatements",
          label: "Bank Statements",
          required: true,
          maxSize: 5,
          acceptedTypes: ["application/pdf"],
        },
        {
          id: "collateralProof",
          label: "Collateral Proof (if applicable)",
          required: false,
          maxSize: 5,
          acceptedTypes: ["application/pdf", "image/jpeg", "image/png"],
        },
        {
          id: "profilePicture",
          label: "Profile Picture",
          required: false,
          maxSize: 5,
          acceptedTypes: ["image/jpeg", "image/png"],
        },
      ],
    };
  },

  methods: {
    nextStage() {
      console.log("Next");
      if (
        this.stage < this.steps.length &&
        !this.isStepDisabled(this.stage + 1)
      ) {
        this.stage++; // Increment stage if it is not disabled
        if (this.stage === 5) {
          this.createChart(); // Synchronously create the chart
          this.updateChart(); // Ensure updateChart runs after createChart
        }
      }
    },
    prevStage() {
      console.log("Previous");
      if (this.stage > 1 && !this.isStepDisabled(this.stage - 1)) {
        this.stage--; // Decrease stage if it is not disabled
      }
    },
    goToStage(stage) {
      if (!this.isStepDisabled(stage)) {
        this.stage = stage; // Only change stage if it is not disabled
        if (stage === 5) {
          this.createChart(); // Synchronously create the chart
          this.updateChart(); // Ensure updateChart runs after createChart
        }
      }
    },
    isStepDisabled(stage) {
      // Disable navigation for stages before stage 6 if submitted
      return this.isSubmitted && stage < 6;
    },
    addDependent() {
      this.form.dependents.push({
        firstName: "",
        lastName: "",
        relationship: "",
        dob: "",
        gender: "",
        phoneNumber: "",
        email: "",
      });
    },
    removeDependent(index) {
      this.form.dependents.splice(index, 1);
    },
    handleMaritalStatusChange() {
      if (this.form.info.maritalStatus === "Married") {
        // Add spouse-dependent if not already present
        if (
          !this.form.dependents.some((dep) => dep.relationship === "Spouse")
        ) {
          this.createDependentForSpouse();
        }
      } else if (this.form.info.maritalStatus === "Single") {
        // Remove the spouse-dependent if it exists
        this.form.dependents = this.form.dependents.filter(
          (dep) => dep.relationship !== "Spouse"
        );
      }
    },
    limitInput(event, maxLength, fieldPath) {
      const target = event.target;
      const trimmedValue = target.value.slice(0, maxLength);

      // Update the DOM value
      target.value = trimmedValue;

      // Use Vue's `set` method or update the nested property directly
      const fields = fieldPath.split(".");
      let obj = this.form;
      for (let i = 0; i < fields.length - 1; i++) {
        obj = obj[fields[i]];
      }
      obj[fields[fields.length - 1]] = trimmedValue;
    },
    createDependentForSpouse() {
      const [firstName, ...lastNameParts] = this.spouseName.split(" ");
      const lastName = lastNameParts.join(" ");

      // Remove any existing dependent with the relationship "Spouse"
      this.form.dependents = this.form.dependents.filter(
        (dependent) => dependent.relationship !== "Spouse"
      );

      // Add the new spouse-dependent at index 0
      this.form.dependents.unshift({
        firstName: firstName || "", // Use empty string if no firstName
        lastName: lastName || "", // Use empty string if no lastName
        relationship: "Spouse", // Set relationship as "Spouse"
        dob: "",
        gender: "",
        phoneNumber: "",
        email: "",
      });
    },

    updateEmi() {
      this.createChart();
      this.updateChart();
    },

    validateStage(stage) {
      console.log("validating stage");
      this.errors = {}; // Clear previous errors
      let isValid = true;

      const patterns = {
        spousename: /^[a-zA-Z\s]{1,40}$/,
        name: /^[a-zA-Z]+$/,
        lastname: /^[a-zA-Z]+([ ]?[a-zA-Z])*$/,

        phoneNumber: /^(\\+91[ ]?)?0?[1-9][0-9]{9}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        address: /^[a-zA-Z0-9#][a-zA-Z0-9\s,.-]*$/,
        state: /^[a-zA-Z ]+$/,
        zip: /^[0-9]{6}$/,
      };

      if (stage === 1) {
        if (!this.form.info.firstName) {
          this.errors.firstName = "First name is required.";
          isValid = false;
        } else if (!patterns.name.test(this.form.info.firstName)) {
          this.errors.firstName =
            "First name must contain only alphabetic characters.";
          isValid = false;
        } else if (
          this.form.info.firstName.length < 2 ||
          this.form.info.firstName.length > 30
        ) {
          this.errors.firstName =
            "First name must be between 2 and 30 characters.";
          isValid = false;
        }

        if (!this.form.info.lastName) {
          this.errors.lastName = "Last name is required.";
          isValid = false;
        } else if (!patterns.lastname.test(this.form.info.lastName)) {
          this.errors.lastName =
            "Last name must contain only alphabetic characters.";
          isValid = false;
        } else if (
          this.form.info.lastName.length < 2 ||
          this.form.info.lastName.length > 30
        ) {
          this.errors.lastName =
            "Last name must be between 2 and 30 characters.";
          isValid = false;
        }

        if (!this.form.info.dateOfBirth) {
          this.errors.dateOfBirth = "Date of Birth is required.";
          isValid = false;
        }
        if (!this.form.info.maritalStatus) {
          this.errors.maritalStatus = "Marital Status is required.";
          isValid = false;
        }
        if (this.form.info.maritalStatus == "Married" && !this.spouseName) {
          this.errors.spouseName = "Spouse Name is required";
        } else if (!patterns.spousename.test(this.spouseName)) {
          this.errors.spouseName =
            "Spouse name must be Alphabetic and max 40 characters.";
        }

        if (!this.form.info.phoneNumber) {
          this.errors.phoneNumber = "Phone number is required.";
          isValid = false;
        } else if (!patterns.phoneNumber.test(this.form.info.phoneNumber)) {
          this.errors.phoneNumber =
            "Phone number must be a valid 10-digit number, optionally prefixed with +91 or 0.";
          isValid = false;
        }

        if (!this.form.info.email) {
          this.errors.email = "Email is required.";
          isValid = false;
        } else if (!patterns.email.test(this.form.info.email)) {
          this.errors.email = "Please enter a valid email address.";
          isValid = false;
        }

        if (!this.form.info.address) {
          this.errors.address = "Address is required.";
          isValid = false;
        } else if (!patterns.address.test(this.form.info.address)) {
          this.errors.address = "Address contains invalid characters.";
          isValid = false;
        }

        if (!this.form.info.state) {
          this.errors.state = "State is required.";
          isValid = false;
        } else if (!patterns.state.test(this.form.info.state)) {
          this.errors.state = "State must contain only alphabetic characters.";
          isValid = false;
        } else if (
          this.form.info.state.length < 2 ||
          this.form.info.state.length > 50
        ) {
          this.errors.state = "State must be between 2 and 50 characters.";
          isValid = false;
        }

        if (!this.form.info.city) {
          this.errors.city = "City is required.";
          isValid = false;
        }

        if (!this.form.info.zip) {
          this.errors.zip = "Zip is required.";
          isValid = false;
        } else if (!patterns.zip.test(this.form.info.zip)) {
          this.errors.zip = "Please enter a valid 6-digit zip code.";
          isValid = false;
        }

        if (!this.form.info.gender) {
          this.errors.gender = "Gender is required.";
          isValid = false;
        }
      } else if (stage === 2) {
        if (!this.form.occupation) {
          this.errors.occupation = "Occupation is required";
          isValid = false;
        }
        if (!this.form.employerDetails) {
          this.errors.employerDetails = "Employer Details are required";
          isValid = false;
        } else if (!/^[a-zA-Z0-9\s]+$/.test(this.form.employerDetails)) {
          // Regular expression to allow only letters, numbers, and spaces
          this.errors.employerDetails = "Special characters are not allowed";
          isValid = false;
        } else {
          this.errors.employerDetails = ""; // Clear the error if valid
        }
        if (!this.form.monthlyIncome) {
          this.errors.monthlyIncome = "Monthly Income is required";
          isValid = false;
        }
      }
      if (stage === 3) {
        this.form.dependents.forEach((dependent, index) => {
          const maxLengths = {
            firstName: 30,
            lastName: 30,
            relationship: 30,
            dob: 10,
            gender: 10,
            contactNumber: 10,
            email: 30,
          };
          const requiredFields = [
            {
              field: "firstName",
              message: "First Name is required",
              pattern: /^[A-Za-z\s]+$/,
            },
            {
              field: "lastName",
              message: "Last Name is required",
              pattern: /^[A-Za-z\s]+$/,
            },
            {
              field: "relationship",
              message: "Relationship is required",
              pattern: /^[A-Za-z\s]+$/,
            },
            { field: "dob", message: "Date of Birth is required" },
            { field: "gender", message: "Gender is required" },
            {
              field: "contactNumber",
              message: "Contact Number is required",
              pattern: /^[0-9]{10}$/,
            },
            {
              field: "email",
              message: "Email is required",
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            },
          ];

          requiredFields.forEach(({ field, message, pattern }) => {
            if (dependent[field]?.length > maxLengths[field]) {
              dependent[field] = dependent[field].slice(0, maxLengths[field]);
              this.errors[`${field}${index}`] =
                "Max " + maxLengths[field] + " charactors are Allowed.";
              isValid = false;
            }
            if (!dependent[field]) {
              this.errors[`${field}${index}`] = message;
              isValid = false;
            } else if (pattern && !pattern.test(dependent[field])) {
              this.errors[`${field}${index}`] = "invalid " + [`${field}`];
              isValid = false;
            }
          });
        });
      } else if (stage === 4) {
        if (!this.form.loanType) {
          this.errors.loanType = "Loan Type is required";
          isValid = false;
        }

        if (this.form.loanType === "Home Loan") {
          const homeLoanFields = [
            { field: "loanAmount", message: "Loan Amount is required" },
            { field: "months", message: "Loan Months are required" },
            {
              field: "homeLoanDetails.loanPurpose",
              message: "Loan Purpose is required",
            },
            {
              field: "homeLoanDetails.propertyType",
              message: "Property Type is required",
            },
            {
              field: "homeLoanDetails.propertyAddress",
              message: "Property Address is required",
            },
            {
              field: "homeLoanDetails.builtUpArea",
              message: "Built-up Area is required",
            },
            {
              field: "homeLoanDetails.yearOfConstruction",
              message: "Year of Construction is required",
            },
            {
              field: "homeLoanDetails.propertyPrice",
              message: "Property Price is required",
            },
            {
              field: "homeLoanDetails.registrationDetails",
              message: "Registration Details are required",
            },
          ];

          homeLoanFields.forEach(({ field, message }) => {
            const [mainField, subField] = field.split(".");
            if (subField) {
              if (!this.form[mainField][subField]) {
                this.errors[subField] = message;
                isValid = false;
              }
            } else {
              if (!this.form[mainField]) {
                this.errors[mainField] = message;
                isValid = false;
              }
            }
          });
        } else if (this.form.loanType === "Auto Loan") {
          const autoLoanFields = [
            { field: "loanAmount", message: "Loan Amount is required" },
            { field: "months", message: "Loan Months are required" },
            {
              field: "vehicleLoanDetails.vehicleType",
              message: "Vehicle Type is required",
            },
            {
              field: "vehicleLoanDetails.insuranceProvider",
              message: "Insurance Provider is required",
            },
            {
              field: "vehicleLoanDetails.makeModel",
              message: "Make and Model is required",
            },
            {
              field: "vehicleLoanDetails.manufacturingYear",
              message: "Manufacturing Year is required",
            },
            {
              field: "vehicleLoanDetails.variant",
              message: "Variant is required",
            },
            {
              field: "vehicleLoanDetails.exShowroomPrice",
              message: "Ex-Showroom Price is required",
            },
            {
              field: "vehicleLoanDetails.onRoadPrice",
              message: "On-Road Price is required",
            },
            { field: "vehicleLoanDetails.color", message: "Color is required" },
            {
              field: "vehicleLoanDetails.dealerName",
              message: "Dealer Name is required",
            },
            {
              field: "vehicleLoanDetails.dealerContact",
              message: "Dealer Contact is required",
            },
            {
              field: "vehicleLoanDetails.dealerAddress",
              message: "Dealer Address is required",
            },
            {
              field: "vehicleLoanDetails.downPaymentAmount",
              message: "Down Payment Amount is required",
            },
            {
              field: "vehicleLoanDetails.downPaymentSource",
              message: "Source of Down Payment is required",
            },
          ];

          autoLoanFields.forEach(({ field, message }) => {
            const [mainField, subField] = field.split(".");
            if (subField) {
              if (!this.form[mainField][subField]) {
                this.errors[subField] = message;
                isValid = false;
              }
            } else {
              if (!this.form[mainField]) {
                this.errors[mainField] = message;
                isValid = false;
              }
            }
          });
        } else if (this.form.loanType === "Personal Loan") {
          const personalLoanFields = [
            { field: "loanAmount", message: "Loan Amount is required" },
            { field: "months", message: "Loan Months are required" },
            {
              field: "personalLoanDetails.purpose",
              message: "Purpose of Loan is required",
            },
          ];

          personalLoanFields.forEach(({ field, message }) => {
            const [mainField, subField] = field.split(".");
            if (subField) {
              if (!this.form[mainField][subField]) {
                this.errors[subField] = message;
                isValid = false;
              }
            } else {
              if (!this.form[mainField]) {
                this.errors[mainField] = message;
                isValid = false;
              }
            }
          });

          if (this.form.personalLoanDetails.purpose === "Medical") {
            if (!this.form.personalLoanDetails.hospitalName) {
              this.errors.hospitalName =
                "Hospital Name and Address is required";
              isValid = false;
            }
            if (!this.form.personalLoanDetails.estimatedExpense) {
              this.errors.estimatedExpense = "Estimated Expense is required";
              isValid = false;
            }
          } else if (this.form.personalLoanDetails.purpose === "Education") {
            if (!this.form.personalLoanDetails.institutionName) {
              this.errors.institutionName =
                "Institution Name and Address is required";
              isValid = false;
            }
            if (!this.form.personalLoanDetails.courseName) {
              this.errors.courseName = "Course Name is required";
              isValid = false;
            }
            if (!this.form.personalLoanDetails.duration) {
              this.errors.duration = "Duration is required";
              isValid = false;
            }
            if (!this.form.personalLoanDetails.fee) {
              this.errors.fee = "Fee is required";
              isValid = false;
            }
          } else if (this.form.personalLoanDetails.purpose === "Marriage") {
            if (!this.form.personalLoanDetails.venueDetails) {
              this.errors.venueDetails = "Venue Details are required";
              isValid = false;
            }
            if (!this.form.personalLoanDetails.estimatedExpense) {
              this.errors.estimatedExpense = "Estimated Expense is required";
              isValid = false;
            }
          } else if (this.form.personalLoanDetails.purpose === "Other") {
            if (!this.form.personalLoanDetails.otherPurpose) {
              this.errors.otherPurpose = "Specify the Purpose is required";
              isValid = false;
            }
          }
        }
      } else if (stage === 6) {
        this.fileFields.forEach((field) => {
          if (field.required && !this.form[field.id]) {
            this.errors[field.id] = `${field.label} is required.`;
            isValid = false;
          }
        });
      }

      return isValid;
    },
    validateLoanAmount() {
      console.log("validating loan ammount");
      if (this.form.loanAmount && this.form.loanAmount.toString().length > 10) {
        this.form.loanAmount = this.form.loanAmount.toString().slice(0, 10); // Truncate to 10 digits
      }
    },
    validateLoanMonths() {
      const months = this.form.months;
      if (months < 1 || months > 360) {
        this.errors.months = "Loan months must be between 1 and 360";
      } else {
        this.errors.months = "";
      }
      if (months.toString().length > 2) {
        this.form.months = months.toString().slice(0, 3);
      }
    },

    handleFileUpload(field) {
      const fileInput = document.getElementById(field);
      const file = fileInput.files[0];
      this.errors[field] = null; // Clear any previous error

      if (file) {
        // Validate file size
        if (
          file.size >
          this.fileFields.find((f) => f.id === field).maxSize * 1024 * 1024
        ) {
          this.errors[field] = `File size should not exceed ${
            this.fileFields.find((f) => f.id === field).maxSize
          }MB.`;
          return;
        }

        // Validate file type
        const acceptedTypes = this.fileFields.find(
          (f) => f.id === field
        ).acceptedTypes;
        if (!acceptedTypes.includes(file.type)) {
          this.errors[
            field
          ] = `Only the following file types are allowed: ${acceptedTypes.join(
            ", "
          )}.`;
          return;
        }

        // Store file if it's valid
        this.form[field] = file;
      }
    },

    async submitForm() {
      console.log("Submit Form Call");
      const user = JSON.parse(localStorage.getItem("user"));
      this.form.userId = user?.id;

      const token = this.$store.getters.token;
      let allStagesValid = true;
      for (let i = 1; i <= this.steps.length; i++) {
        if (i != 6 && !this.validateStage(i)) {
          allStagesValid = false;
          this.stage = i;
          break;
        }
      }
      console.log("Validation ", allStagesValid);
      if (allStagesValid) {
        try {
          this.$store.state.isLoading = true;
          // Save loan application data
          const response = await fetch("http://localhost:8080/loan/saveData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(this.form),
          });

          if (!response.ok) {
            throw new Error("Failed to save loan application data");
          }

          const loanApplication = await response.json();
          this.applicationNumber = loanApplication.applicationNumber;
          this.FormSubmited = true;
          // Show a success message
          alert("Loan application data submitted successfully");
          this.$store.state.isLoading = false;
          this.isSubmitted = true;
        } catch (error) {
          console.error(error);
          alert("Failed to submit loan application data. Please try again.");
        }
      }
    },

    async uploadFileToS3(file, lonnId, filetype) {
      // Step 1: Configure AWS SDK with your credentials
      AWS.config.update({
        accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
        region: process.env.VUE_APP_AWS_REGION,
      });

      const s3 = new AWS.S3();
      const params = {
        Bucket: "banking-aditi", // Your S3 bucket name
        Key: `uploads/${lonnId}/${filetype}_${file.name}`,
        Body: file, // The file itself
      };

      try {
        // Step 2: Upload the file to S3
        const data = await s3.upload(params).promise();
        return data.Location; // Return the URL of the uploaded file
      } catch (err) {
        console.error("Error uploading file to S3:", err);
        throw err; // Rethrow the error for handling
      }
    },

    async uploadFiles() {
      this.$store.state.isLoading = true;
      const token = this.$store.getters.token;
      const applicationNumber = 123;
      if (!applicationNumber) {
        alert("Please submit the form data first.");
        this.$store.state.isLoading = false;
        return;
      }

      try {
        // eslint-disable-next-line
        if (true) {
          console.log("IdProof", this.form.idProof);
          console.log("IdProof", this.form.addressProof);
          console.log("IdProof", this.form.profilePicture);
          console.log("IdProof", this.form.incomeProof);
          console.log("IdProof", this.form.bankStatements);
          this.$store.state.isLoading = false;
          return;
        }
        // Upload files individually
        const filePaths = {};
        if (this.form.profilePicture) {
          filePaths.profilePicturePath = await this.uploadFileToS3(
            this.form.profilePicture,
            applicationNumber,
            "profilePicture"
          );
        }
        if (this.form.idProof) {
          filePaths.idProofPath = await this.uploadFileToS3(
            this.form.idProof,
            applicationNumber,
            "idProof"
          );
        }
        if (this.form.addressProof) {
          filePaths.addressProofPath = await this.uploadFileToS3(
            this.form.addressProof,
            applicationNumber,
            "addressProof"
          );
        }
        if (this.form.incomeProof) {
          filePaths.incomeProofPath = await this.uploadFileToS3(
            this.form.incomeProof,
            applicationNumber,
            "incomeProof"
          );
        }
        if (this.form.bankStatements) {
          filePaths.bankStatementsPath = await this.uploadFileToS3(
            this.form.bankStatements,
            applicationNumber,
            "bankStatements"
          );
        }
        if (this.form.collateralProof) {
          filePaths.collateralProofPath = await this.uploadFileToS3(
            this.form.collateralProof,
            applicationNumber,
            "collateralProof"
          );
        }

        // Send file paths to backend
        const fileResponse = await fetch(
          `http://localhost:8080/loan/saveFilePath/${applicationNumber}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(filePaths),
          }
        );

        if (!fileResponse.ok) {
          throw new Error("Failed to update loan application files");
        }
        this.$store.state.isLoading = false;
        // Show a success message
        alert("Loan application files uploaded successfully");
        this.isSubmitted = false;
      } catch (error) {
        console.error(error);
        alert("Failed to upload loan application files. Please try again.");
      }
    },
    updateInterestRate() {
      // Update the interest rate based on selected loan type
      this.form.interestRate = this.loanRates[this.form.loanType] || 0;
    },
    updateChart() {
      if (this.form.loanAmount && this.form.months && this.form.interestRate) {
        // Convert annual interest rate to monthly rate (in decimal)
        const monthlyRate = this.form.interestRate / 100 / 12;

        // Number of months
        const numMonths = this.form.months;

        // Calculate EMI using the formula
        const emi =
          (this.form.loanAmount *
            monthlyRate *
            Math.pow(1 + monthlyRate, numMonths)) /
          (Math.pow(1 + monthlyRate, numMonths) - 1);

        // Calculate total payment
        const totalPayment = emi * numMonths;

        // Calculate total interest
        const totalInterest = totalPayment - this.form.loanAmount;

        // Update calculated values
        this.form.calculatedEMI = emi.toFixed(2);
        this.form.totalRepayment = totalPayment.toFixed(2);
        this.form.totalInterest = totalInterest.toFixed(2);

        // Update chart data after calculating the interest
        this.addData();
      }
    },
    createChart() {
      this.$nextTick(() => {
        const ctx = document.getElementById("donutChart").getContext("2d");
        if (ctx) {
          if (this.chart) {
            this.chart.destroy(); // Destroy the existing chart instance
          }
          let chart = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: ["Principal Amount", "Interest Amount"],
              datasets: [
                {
                  data: [this.form.loanAmount, this.form.totalInterest],
                  backgroundColor: ["#4caf50", "#2196f3"],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              layout: {
                fullSize: true,
              },
            },
          });
          this.chart = markRaw(chart);
        }
      });
    },
    addData() {
      console.log(this.chart);
      if (this.chart) {
        this.chart.data.datasets[0].data = [
          this.form.loanAmount,
          this.form.calculatedInterest,
        ];
        this.chart.update();
      }
    },
    async fetchCities() {
      console.log("Fetching cities...");
      if (this.selectedState.name) {
        this.form.info.state = this.selectedState.name;
      }
      this.$store.state.isLoading = true;
      try {
        if (!this.form.info.state) return;

        const response = await fetch(
          `https://api.countrystatecity.in/v1/countries/IN/states/${this.selectedState.iso2}/cities`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-CSCAPI-KEY":
                "R3BOM1VlOEg4MHR1YnlqVVpJZDRhUXNRbDZ6SWtmNEdNU0hqN0p5VA==",
            },
          }
        );
        const data = await response.json();
        this.cities = data; // Set the cities in dropdown
        this.$store.state.isLoading = false;
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
    fetchStates() {
      fetch("https://api.countrystatecity.in/v1/countries/IN/states", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSCAPI-KEY":
            "R3BOM1VlOEg4MHR1YnlqVVpJZDRhUXNRbDZ6SWtmNEdNU0hqN0p5VA==",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          this.states = result;
          console.log(result); // Populate the states array with the fetched data
        })
        .catch((error) => console.log("Error fetching states:", error));
    },
  },
  resetData() {
    this.form = {
      interestRate: "",
      months: 3,
      loanAmount: "",
      emiCalculated: false,
      calculatedEMI: 0,
      totalRepayment: 0,
      totalInterest: 0,
      info: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        maritalStatus: "",
        phoneNumber: "",
        email: "",
        address: "",
        state: "",
        city: "",
        zip: "",
        gender: "",
        alternatePhoneNumber: "",
      },
      occupation: "",
      employerDetails: "",
      monthlyIncome: "",
      dependents: [],
      loanType: "",

      homeLoanDetails: {
        loanPurpose: "",
        propertyType: "",
        propertyAddress: "",
        builtUpArea: "",
        yearOfConstruction: "",
        propertyPrice: "",
        builderDetails: "",
        builderContact: "",
        builderAddress: "",
        registrationDetails: "",
      },
      vehicleLoanDetails: {
        vehicleType: "",
        makeModel: "",
        manufacturingYear: "",
        variant: "",
        exShowroomPrice: "",
        onRoadPrice: "",
        color: "",
        registrationNumber: "",
        insuranceProvider: "",
        dealerName: "",
        dealerContact: "",
        dealerAddress: "",
        quotationUpload: null,
        downPaymentAmount: "",
        downPaymentSource: "",
      },
      personalLoanDetails: {
        purpose: "",
        hospitalName: "",
        estimatedExpense: "",
        institutionName: "",
        courseName: "",
        duration: "",
        fee: "",
        venueDetails: "",
        otherPurpose: "",
      },
    };
  },

  mounted() {
    this.fetchStates();
  },
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
}
.progress-bar {
  display: flex;

  margin-bottom: 20px;
  flex-direction: row !important;
}
.progress-bar button {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: #f0f0f0;
  transition: background-color 0.3s;
}
.progress-bar button.active-step {
  background-color: #007bff;
  color: white;
}
.loan-specific {
  margin-top: 20px;
}
.error {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}
#donutChart {
  width: 100%;
  height: 300px;
}
.disabled-step {
  background-color: #ddd;
  cursor: not-allowed;
}

.active-step {
  background-color: #4caf50; /* Active stage styling */
}
</style>
