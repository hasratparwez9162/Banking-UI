<template>
  <div class="container">
    <h4 class="text-center">Loan Application Form</h4>
    <FormKit type="form" :actions="false" @submit="handleSubmit" v-model="form">
      <FormKit
        type="multi-step"
        id="multi-step"
        tab-style="progress"
        :allow-incomplete="true"
        class="w-100"
      >
        <!-- Step 1: Applicant Information & Occupation -->

        <FormKit type="step" name="step1" label="Applicant Information">
          <div class="row">
            <div class="col-md-6">
              <FormKit
                type="text"
                name="firstName"
                label="First Name"
                placeholder="Enter First Name"
                maxlength="30"
                v-model="form.info.firstName"
                validation="required|length:2,30|matches:/^[A-Za-z]+( [A-Za-z]+)?$/"
                :validation-messages="{
                  matches:
                    'Enter Valid First Name. (Special Character and number are not allowed)',
                }"
              />
            </div>

            <div class="col-md-6">
              <FormKit
                type="text"
                maxlength="30"
                name="lastName"
                placeholder="Enter Last Name"
                label="Last Name"
                v-model="form.info.lastName"
                validation="required|length:2,30|matches:/^[A-Za-z]+( [A-Za-z]+)?$/"
                :validation-messages="{
                  matches:
                    'Enter Valid Last Name. (Special Character and number are not allowed)',
                }"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <FormKit
                type="date"
                name="dateOfBirth"
                placeholder="DD/MM/YYYY"
                label="Date of Birth"
                v-model="form.info.dateOfBirth"
                :validation="dobValidation"
                :validation-messages="{ date_before: 'Candidate must be 18 +' }"
              />
            </div>

            <div class="col-md-6">
              <FormKit
                type="tel"
                maxlength="10"
                name="phoneNumber"
                placeholder="Enter Number"
                label="Phone Number"
                v-model="form.info.phoneNumber"
                validation="required|number|length:10"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <FormKit
                type="select"
                name="gender"
                placeholder="Select Gender"
                label="Gender"
                v-model="form.info.gender"
                :options="[
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Other', label: 'Other' },
                ]"
                validation="required"
              />
            </div>

            <div class="col-md-6">
              <FormKit
                type="select"
                name="maritalStatus"
                placeholder="Select Merital Status"
                label="Marital Status"
                v-model="form.info.maritalStatus"
                :options="[
                  { value: 'Married', label: 'Married' },
                  { value: 'Single', label: 'Single' },
                ]"
                validation="required"
              />
            </div>
          </div>

          <div v-if="form.info.maritalStatus === 'Married'" class="col-md-6">
            <FormKit
              type="text"
              name="spouseName"
              label="Spouse Name"
              maxlength="30"
              v-model="form.info.spouse"
              validation="required|length:2,40|matches:/^[A-Za-z]+( [A-Za-z]+)?$/"
              :validation-messages="{
                matches:
                  'Enter Valid Name. (Special Character and Number are not allowed)',
              }"
            />
          </div>
          <div class="row">
            <div class="col-md-6">
              <FormKit
                type="text"
                maxlength="30"
                placeholder="Enter Email"
                name="email"
                label="Email"
                v-model="form.info.email"
                validation="required|email"
              />
            </div>

            <div class="col-md-6">
              <FormKit
                type="text"
                maxlength="100"
                placeholder="Enter Address"
                name="address"
                label="Address"
                v-model="form.info.address"
                validation="required | length:5,100"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <FormKit
                placeholder="States"
                type="select"
                name="state"
                label="State"
                v-model="selectedState"
                :options="states"
                @change="fetchCities"
                validation="required"
              />
            </div>

            <div class="col-md-6">
              <FormKit
                placeholder="Cities"
                type="select"
                name="city"
                label="City"
                v-model="form.info.city"
                :options="cities"
                validation="required"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <FormKit
                type="text"
                maxlength="6"
                name="zip"
                label="Pin Code"
                v-model="form.info.zip"
                validation="required | number |length:6"
              />
            </div>

            <div class="col-md-6">
              <FormKit
                type="tel"
                maxlength="10"
                name="alternatePhoneNumber"
                label="Alternate Phone Number (optional)"
                v-model="form.info.alternatePhoneNumber"
                validation="length:10"
              />
            </div>
          </div>
        </FormKit>
        <FormKit type="step" name="occupation" label="Occupation">
          <div class="row">
            <div class="col-md-6">
              <FormKit
                type="select"
                placeholder="Occupation"
                name="occupation"
                label="Occupation"
                v-model="form.occupation.occupation"
                :options="[
                  { value: 'Salaried', label: 'Salaried' },
                  { value: 'Self-Employed', label: 'Self-Employed' },
                  { value: 'Other', label: 'Other' },
                ]"
                validation="required"
              />
            </div>

            <!-- Employer Details -->
            <div class="col-md-6">
              <FormKit
                type="text"
                maxlength="50"
                name="employerDetails"
                label="Employer Details"
                v-model="form.occupation.employerDetails"
                validation="required|length: 3, 50"
              />
            </div>
          </div>

          <!-- Monthly Income -->
          <div class="col-md-6">
            <FormKit
              type="text"
              name="monthlyIncome"
              label="Monthly Income"
              v-model="form.occupation.monthlyIncome"
              validation="required | number"
              maxlength="10"
            />
          </div>
        </FormKit>
        <FormKit type="step" name="step3" label="Dependent">
          <div v-if="form.dependents.length">
            <div class="custom-card">
              <table class="w-100">
                <thead>
                  <tr>
                    <td colspan="8" class="p-0">
                      <div class="custom-header">
                        <div class="p-3 text-start w-20">First Name</div>
                        <div class="p-3 text-start w-20">Last Name</div>
                        <div class="p-3 text-start w-20">Relationship</div>
                        <div class="p-3 text-start w-20">Date of Birth</div>
                        <div class="p-3 text-start w-10">Gender</div>
                        <div class="p-3 text-start w-20">Phone Number</div>
                        <div class="p-3 text-start w-20">Email</div>
                        <div class="p-3 text-start w-10">Action</div>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(dependent, index) in form.dependents"
                    :key="dependent.id"
                  >
                    <td colspan="8" class="p-0">
                      <div class="custom-tr">
                        <div class="p-3 text-start w-20">
                          {{ dependent.firstName }}
                        </div>
                        <div class="p-3 text-start w-20">
                          {{ dependent.lastName }}
                        </div>
                        <div class="p-3 text-start w-20">
                          {{ dependent.relationship }}
                        </div>
                        <div class="p-3 text-start w-20">
                          {{ displayDate(dependent.dob) }}
                        </div>
                        <div class="p-3 text-start w-10">
                          {{ dependent.gender }}
                        </div>
                        <div class="p-3 text-start w-20">
                          {{ dependent.phoneNumber }}
                        </div>
                        <div class="p-3 text-start w-20">
                          {{ dependent.email }}
                        </div>

                        <div class="p-3 text-start gap-3 d-flex w-10">
                          <i
                            @click="editDependent(dependent)"
                            class="bi bi-pencil-square"
                          ></i>
                          <i
                            @click="removeDependent(index)"
                            class="bi bi-trash3"
                          ></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            v-else
            class="d-flex justify-content-between bt-0 fs-5 mb-3"
            style="max-height: 3.25rem"
          >
            <div class="d-flex align-items-baseline">
              <div style="position: relative; bottom: 4px">
                Do You have any Dependent?
              </div>

              <FormKit
                v-model="isDependent"
                type="radio"
                :options="[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                ]"
              />
            </div>

            <div>No Dependent Added !</div>
          </div>

          <div v-if="showdependentForm">
            <hr />
            <FormKit
              type="form"
              action="false"
              @submit="addDependents"
              submit-label="Add/Update Dependent"
              id="dependentForm"
              v-model="selectedDependent"
            >
              <!-- Row 1: First Name and Last Name -->
              <div class="row">
                <div class="col-md-4">
                  <FormKit
                    type="text"
                    name="firstName"
                    maxlength="30"
                    label="First Name"
                    validation="required|length:2,30|matches:/^[A-Za-z]+( [A-Za-z]+)?$/"
                    :validation-messages="{
                      matches:
                        'Enter Valid First Name. (Special Character and number are not allowed)',
                    }"
                    placeholder="Enter first name"
                  />
                </div>
                <div class="col-md-4">
                  <FormKit
                    type="text"
                    name="lastName"
                    maxlength="30"
                    label="Last Name"
                    validation="required|length:2,30|matches:/^[A-Za-z]+( [A-Za-z]+)?$/"
                    :validation-messages="{
                      matches:
                        'Enter Valid Last Name. (Special Character and number are not allowed)',
                    }"
                    placeholder="Enter last name"
                  />
                </div>
                <div class="col-md-4">
                  <FormKit
                    type="select"
                    name="relationship"
                    placeholder="Select Relationship"
                    label="Relationship"
                    :options="[
                      'Father',
                      'Mother',
                      'Brother',
                      'Sister',
                      'Husband',
                      'Wife',
                      'Son',
                      'Daughter',
                    ]"
                    validation="required"
                  />
                </div>
              </div>

              <!-- Row 2: Relationship and Date of Birth -->
              <div class="row">
                <div class="col-md-4">
                  <FormKit
                    type="date"
                    name="dob"
                    label="Date of Birth"
                    :validation="dobValidateToday"
                  />
                </div>

                <div class="col-md-4">
                  <FormKit
                    type="select"
                    name="gender"
                    placeholder="Select Gender"
                    label="Gender"
                    :options="['Male', 'Female', 'Other']"
                    validation="required"
                  />
                </div>
                <div class="col-md-4">
                  <FormKit
                    type="tel"
                    maxlength="10"
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter phone number"
                    validation="required"
                  />
                </div>
              </div>

              <!-- Row 4: Email -->
              <div class="row">
                <div class="col-md-4">
                  <FormKit
                    type="text"
                    name="email"
                    label="Email"
                    maxlength="30"
                    validation="required|email"
                    placeholder="Enter email"
                  />
                </div>
              </div>
            </FormKit>
            <hr />
          </div>
          <button
            v-if="!showdependentForm && form.dependents.length > 0"
            type="button"
            class="btn btn-primary float-end"
            style="margin-left: 1rem"
            @click="showdependent"
          >
            Add More Dependent
          </button>
        </FormKit>
        <FormKit type="step" name="step4" label="Loan Deatails">
          <div class="d-flex justify-content-between align-items-center">
            <FormKit
              type="radio"
              name="loanType"
              :options="[
                { label: 'Home Loan', value: 'Home' },
                { label: 'Auto Loan', value: 'Auto' },
                { label: 'Personal Loan', value: 'Personal' },
              ]"
              v-model="loanType"
              validation="required"
              @update:modelValue="handleLoanTypeChange"
            />
            <div>
              <p><strong>Interest Rate:</strong> {{ form.interestRate }} %</p>
            </div>
          </div>
          <div class="p-3" v-if="form.loanType === 'Home'">
            <div class="text-start">
              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="loanAmount"
                    v-model="loanAmount"
                    label="Loan Amount"
                    validation="required|number"
                    maxlength="10"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="loanMonths"
                    v-model="months"
                    label="Loan Months"
                    validation="required|number"
                    maxlength="3"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="select"
                    name="loanPurpose"
                    v-model="form.homeLoanDetails.loanPurpose"
                    label="Loan Purpose"
                    placeholder="Select Purpose"
                    validation="required"
                    :options="[
                      { label: 'Purchase', value: 'Purchase' },
                      { label: 'Construction', value: 'Construction' },
                      { label: 'Renovation', value: 'Renovation' },
                    ]"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="select"
                    name="propertyType"
                    placeholder="Select Property Type"
                    v-model="form.homeLoanDetails.propertyType"
                    label="Property Type"
                    validation="required"
                    :options="[
                      { label: 'Apartment', value: 'Apartment' },
                      { label: 'House', value: 'House' },
                      { label: 'Land', value: 'Land' },
                    ]"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="propertyAddress"
                    v-model="form.homeLoanDetails.propertyAddress"
                    label="Property Address"
                    maxlength="70"
                    validation="required"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    maxlength="10"
                    name="builtUpArea"
                    v-model="form.homeLoanDetails.builtUpArea"
                    label="Built-up Area (in sq. ft.)"
                    validation="required|number"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    maxlength="4"
                    name="yearOfConstruction"
                    v-model="form.homeLoanDetails.yearOfConstruction"
                    label="Year of Construction"
                    validation="required|number"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="propertyPrice"
                    maxlength="10"
                    v-model="form.homeLoanDetails.propertyPrice"
                    label="Property Price"
                    validation="required|number"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="builderDetails"
                    v-model="form.homeLoanDetails.builderDetails"
                    label="Builder Details (optional)"
                    maxlength="50"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    maxlength="10"
                    name="builderContact"
                    v-model="form.homeLoanDetails.builderContact"
                    label="Builder Contact (optional)"
                    validation="number"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="builderAddress"
                    v-model="form.homeLoanDetails.builderAddress"
                    label="Builder Address (optional)"
                    maxlength="70"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="registrationDetails"
                    v-model="form.homeLoanDetails.registrationDetails"
                    label="Registration Details"
                    maxlength="20"
                    validation="required"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="p-3" v-if="form.loanType === 'Auto'">
            <div class="text-start">
              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="loanAmount"
                    v-model="loanAmount"
                    validation="required | number"
                    maxlength="10"
                    label="Loan Amount"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="loanMonths"
                    v-model="months"
                    validation="required | number"
                    maxlength="3"
                    label="Loan Months"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="select"
                    name="vehicleType"
                    placeholder="Select Vehicle Type"
                    v-model="form.vehicleLoanDetails.vehicleType"
                    validation="required"
                    :options="['Car', 'Bike', 'Truck']"
                    label="Vehicle Type"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="makeModel"
                    v-model="form.vehicleLoanDetails.makeModel"
                    validation="required"
                    maxlength="20"
                    label="Make and Model"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="manufacturingYear"
                    v-model="form.vehicleLoanDetails.manufacturingYear"
                    validation="required | number"
                    maxlength="4"
                    label="Manufacturing Year"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="variant"
                    v-model="form.vehicleLoanDetails.variant"
                    validation="required"
                    maxlength="30"
                    label="Variant"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="exShowroomPrice"
                    v-model="form.vehicleLoanDetails.exShowroomPrice"
                    validation="required | number"
                    maxlength="10"
                    label="Ex-Showroom Price"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="onRoadPrice"
                    v-model="form.vehicleLoanDetails.onRoadPrice"
                    validation="required | number"
                    maxlength="10"
                    label="On-Road Price"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="color"
                    v-model="form.vehicleLoanDetails.color"
                    validation="required"
                    maxlength="20"
                    label="Color"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="registrationNumber"
                    v-model="form.vehicleLoanDetails.registrationNumber"
                    maxlength="30"
                    label="Registration Number (If Required)"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="insuranceProvider"
                    v-model="form.vehicleLoanDetails.insuranceProvider"
                    validation="required"
                    maxlength="30"
                    label="Insurance Provider"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="dealerName"
                    v-model="form.vehicleLoanDetails.dealerName"
                    validation="required"
                    maxlength="30"
                    label="Dealer Name"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="dealerContact"
                    v-model="form.vehicleLoanDetails.dealerContact"
                    validation="required | number"
                    maxlength="10"
                    label="Dealer Contact"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="dealerAddress"
                    v-model="form.vehicleLoanDetails.dealerAddress"
                    validation="required"
                    maxlength="70"
                    label="Dealer Address"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="downPaymentAmount"
                    v-model="form.vehicleLoanDetails.downPaymentAmount"
                    validation="required |number"
                    maxlength="10"
                    label="Down Payment Amount"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    name="downPaymentSource"
                    v-model="form.vehicleLoanDetails.downPaymentSource"
                    validation="required"
                    maxlength="30"
                    label="Source of Down Payment"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="p-3" v-if="form.loanType === 'Personal'">
            <div class="text-start">
              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    id="loanAmount"
                    v-model="loanAmount"
                    validation="required|*number"
                    maxlength="10"
                    label="Loan Amount"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    id="loanMonths"
                    v-model="months"
                    validation="required|number"
                    maxlength="3"
                    label="Loan Months"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <FormKit
                    type="select"
                    placeholder="Select Purpose"
                    id="purpose"
                    v-model="form.personalLoanDetails.purpose"
                    :options="[
                      { label: 'Medical', value: 'Medical' },
                      { label: 'Education', value: 'Education' },
                      { label: 'Marriage', value: 'Marriage' },
                      { label: 'Other', value: 'Other' },
                    ]"
                    validation="required"
                    label="Purpose of Loan"
                  />
                </div>
              </div>

              <div
                v-if="form.personalLoanDetails.purpose === 'Medical'"
                class="row"
              >
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    id="hospitalName"
                    v-model="form.personalLoanDetails.hospitalName"
                    validation="required"
                    maxlength="100"
                    label="Hospital Name and Address"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    id="estimatedExpense"
                    v-model="form.personalLoanDetails.estimatedExpense"
                    validation="required|number"
                    maxlength="10"
                    label="Estimated Expense"
                  />
                </div>
              </div>

              <div
                v-if="form.personalLoanDetails.purpose === 'Education'"
                class="row"
              >
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    id="institutionName"
                    v-model="form.personalLoanDetails.institutionName"
                    validation="required"
                    maxlength="100"
                    label="Institution Name and Address"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    id="courseName"
                    v-model="form.personalLoanDetails.courseName"
                    validation="required"
                    maxlength="40"
                    label="Course Name"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    id="duration"
                    v-model="form.personalLoanDetails.duration"
                    validation="required"
                    maxlength="10"
                    label="Duration"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    id="fee"
                    v-model="form.personalLoanDetails.fee"
                    validation="required|number"
                    maxlength="10"
                    label="Fee"
                  />
                </div>
              </div>

              <div
                v-if="form.personalLoanDetails.purpose === 'Marriage'"
                class="row"
              >
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    id="venueDetails"
                    v-model="form.personalLoanDetails.venueDetails"
                    validation="required"
                    maxlength="50"
                    label="Venue Details"
                  />
                </div>
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    id="estimatedExpense"
                    v-model="form.personalLoanDetails.estimatedExpense"
                    validation="required|number"
                    maxlength="10"
                    label="Estimated Expense"
                  />
                </div>
              </div>

              <div
                v-if="form.personalLoanDetails.purpose === 'Other'"
                class="row"
              >
                <div class="col-md-6">
                  <FormKit
                    type="text"
                    id="otherPurpose"
                    v-model="form.personalLoanDetails.otherPurpose"
                    validation="required"
                    maxlength="100"
                    label="Specify the Purpose"
                  />
                </div>
              </div>
            </div>
          </div>
        </FormKit>
        <FormKit type="step" name="step5" label="File Upload">
          <div class="container">
            <div class="p-3">
              <h4>Document Upload</h4>
              <div>
                <p>{{ form.idProof || "na" }}</p>
                <p>{{ form.addressProof || "na" }}</p>
                <p>{{ form.incomeProof || "na" }}</p>
                <p>{{ form.bankStatements || "na" }}</p>
                <p>{{ form.profilePicture || "na" }}</p>
              </div>
              <hr />

              <div class="row">
                <div class="col-md-6 col-12 mb-3">
                  <div class="form-group text-start fs-5">
                    <FormKit
                      type="file"
                      v-model="profilePicture"
                      id="profilePicture"
                      name="profilePicture"
                      class="form-control mt-3"
                      accept="image/jpeg, image/png"
                      label="Profile Picture"
                      :validation-rules="{ fileValidationImg, fileMaxSize }"
                      validation="fileValidationImg | fileMaxSize | required"
                      :validation-messages="{
                        fileValidationImg:
                          'Invalid File type , Only png and jpeg  are allowed.',
                        fileMaxSize:
                          'File exceeds the maximum size of 5 Mb Allowed.',
                      }"
                      @change="handleFileUpload('profilePicture')"
                    />
                  </div>
                </div>
                <div class="col-md-6 col-12 mb-3">
                  <div class="form-group text-start fs-5">
                    <FormKit
                      type="file"
                      id="idProof"
                      v-model="idProof"
                      class="form-control mt-3"
                      accept="image/jpeg, image/png, application/pdf"
                      label="ID Proof"
                      :validation-rules="{ fileValidationDoc, fileMaxSize }"
                      validation="fileValidationDoc | required"
                      :validation-messages="{
                        fileValidationDoc:
                          'Invalid File type , Only png, jpeg and pdf are allowed.',
                        fileMaxSize:
                          'File exceeds the maximum size of 5 Mb Allowed.',
                      }"
                    />
                  </div>
                </div>

                <div class="col-md-6 col-12 mb-3">
                  <div class="form-group text-start fs-5">
                    <FormKit
                      type="file"
                      v-model="addressProof"
                      id="addressProof"
                      class="form-control mt-3"
                      accept="image/jpeg, image/png, application/pdf"
                      label="Address Proof"
                      :validation-rules="{ fileValidationDoc, fileMaxSize }"
                      validation="fileValidationDoc | required"
                      :validation-messages="{
                        fileValidationDoc:
                          'Invalid File type , Only png, jpeg and pdf are allowed.',
                        fileMaxSize:
                          'File exceeds the maximum size of 5 Mb Allowed.',
                      }"
                    />
                  </div>
                </div>

                <div class="col-md-6 col-12 mb-3">
                  <div class="form-group text-start fs-5">
                    <FormKit
                      type="file"
                      v-model="incomeProof"
                      id="incomeProof"
                      class="form-control mt-3"
                      accept="image/jpeg, image/png, application/pdf"
                      label="Income Proof"
                      :validation-rules="{ fileValidationDoc, fileMaxSize }"
                      validation="fileValidationDoc | required"
                      :validation-messages="{
                        fileValidationDoc:
                          'Invalid File type , Only png, jpeg and pdf are allowed.',
                        fileMaxSize:
                          'File exceeds the maximum size of 5 Mb Allowed.',
                      }"
                    />
                  </div>
                </div>

                <div class="col-md-6 col-12 mb-3">
                  <div class="form-group text-start fs-5">
                    <FormKit
                      type="file"
                      id="bankStatements"
                      v-model="bankStatements"
                      class="form-control mt-3"
                      accept="image/jpeg, image/png, application/pdf"
                      label="Bank Statements"
                      :validation-rules="{ fileValidationDoc, fileMaxSize }"
                      validation="fileValidationDoc | required"
                      :validation-messages="{
                        fileValidationDoc:
                          'Invalid File type , Only png, jpeg and pdf are allowed.',
                        fileMaxSize:
                          'File exceeds the maximum size of 5 Mb Allowed.',
                      }"
                    />
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </FormKit>

        <FormKit type="step" name="step6" label="Review & Submit">
          <ReviewForm :form="form" />
          <template #stepNext>
            <FormKit type="submit" />
          </template>
        </FormKit>
      </FormKit>
    </FormKit>
  </div>
</template>

<script setup>
const fileValidationDoc = function (node) {
  console.log("node", node);
  let file = node.value[0];
  return (
    file.file.type === "application/pdf" ||
    file.file.type === "image/png" ||
    file.file.type === "image/jpeg"
  );
};
const fileValidationImg = function (node) {
  console.log("node", node);
  let file = node.value[0];
  return file.file.type === "image/png" || file.file.type === "image/jpeg";
};
const fileMaxSize = function (node) {
  let file = node.value[0];
  const maxSize = 5 * 1024 * 1024;
  console.log("maxSize", maxSize);
  console.log("File size", file.file.size);

  return file.file.size <= maxSize;
};
</script>

<script>
import ReviewForm from "./ReviewForm.vue";
import AWS from "aws-sdk";
export default {
  components: {
    ReviewForm,
  },
  data() {
    return {
      bankStatements: "",
      incomeProof: "",
      addressProof: "",
      idProof: "",
      profilePicture: "",
      selectedDependent: "",
      isDependent: false,
      showdependentForm: false,
      loanAmount: "",
      months: "",
      selectedState: "", // Holds the selected state
      loanType: "Home Loan",
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
          firstName: "Rahul",
          lastName: "Kumar",
          dateOfBirth: "",
          maritalStatus: "Single",
          phoneNumber: "8754219635",
          email: "test@gmail.com",
          spouse: "",
          address: "abc street",
          state: "bihar",
          city: "saran",
          zip: "841311",
          gender: "Male",
          alternatePhoneNumber: "",
        },
        occupation: {
          occupation: "",
          employerDetails: "Abc Pvt",
          monthlyIncome: "4000",
        },
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
          hospitalName: "Abc hospital",
          estimatedExpense: "4000",
          institutionName: "",
          courseName: "",
          duration: "",
          fee: "",
          venueDetails: "",
          otherPurpose: "",
        },
      },
      states: [],
      cities: [],
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
          id: "profilePicture",
          label: "Profile Picture",
          required: false,
          maxSize: 5,
          acceptedTypes: ["image/jpeg", "image/png"],
        },
      ],
      errors: {},
    };
  },
  computed: {
    monthlyInterestRate() {
      return this.form.interestRate / 100 / 12;
    },

    calculatedEMI() {
      const P = this.form.loanAmount;
      const r = this.monthlyInterestRate;
      const n = this.form.months;

      if (r === 0) {
        return P / n; // If the interest rate is 0
      }

      return ((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)).toFixed(
        2
      ); // EMI, rounded to 2 decimal places
    },

    totalRepayment() {
      return (this.calculatedEMI * this.form.months).toFixed(2); // Total Repayment
    },

    totalInterest() {
      const totalRepayment = parseFloat(this.totalRepayment);
      return (totalRepayment - this.form.loanAmount).toFixed(2); // Total Interest
    },
    filevalidator(node) {
      // Log the entire node
      console.log("Node ", node);

      // Log specific file properties (assuming node has a file property)
      if (node && node.file) {
        console.log("Files attached: ", node.file);
      } else {
        console.log("No file found in the node.");
      }

      // Ensure the file is a real file object (it might be wrapped in a Proxy)
      const files = Array.isArray(node.file) ? node.file : [node.file]; // Ensure it's an array

      // If no files are uploaded, return a message
      if (!files.length) {
        console.log("No files uploaded.");
        return "Please upload a file.";
      }

      // Iterate over each file and perform the validation
      for (const fileProxy of files) {
        // Accessing the underlying file object from the Proxy
        const file = fileProxy && fileProxy.$ ? fileProxy.$ : fileProxy; // Unwrap the Proxy if needed
        // const file = fileProxy.$ || fileProxy;

        console.log("Validating file: ", file);
        console.log("Validating file.file: ", file.file);
        console.log(
          "Validating file.file.name: ",
          file.file ? (file.file.name ? file.file.name : "na") : "missing file"
        );
        console.log("Validating file.size: ", file.size);
        console.log("Validating file.type: ", file.type);

        // Check if file is valid and has size/type properties
        if (!file || !file.size || !file.type) {
          console.log("File is missing required properties.");
          return "Invalid file.";
        }

        // Check if file size is larger than 2 MB
        if (file.size > 2 * 1024 * 1024) {
          console.log("File size exceeded. Size: ", file.size);
          return "File size should not exceed 2 MB.";
        }

        // Check if file type is allowed (PNG or JPEG)
        if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
          console.log("Invalid file type: ", file.type);
          return "Only PNG and JPEG images are allowed.";
        }

        console.log("File validated successfully:", file);
      }
      return true;
    },
    minDate() {
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 18); // Subtract 18 years
      return minDate;
    },
    minDatedependent() {
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 5); // Subtract 18 years
      return minDate;
    },
    dobValidation() {
      // Ensure the date is in YYYY-MM-DD format
      const year = this.minDate.getFullYear();
      const month = (this.minDate.getMonth() + 1).toString().padStart(2, "0");
      const day = this.minDate.getDate().toString().padStart(2, "0");
      return `required | date_before:${year}-${month}-${day}`;
    },
    dobValidateToday() {
      const year = this.minDatedependent.getFullYear();
      const month = (this.minDatedependent.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const day = this.minDatedependent.getDate().toString().padStart(2, "0");
      return `required | date_before:${year}-${month}-${day}`;
    },
    interestRateComp() {
      if (this.loanType === "Home") {
        return 5.5;
      } else if (this.loanType === "Auto") {
        return 6.0;
      } else if (this.loanType === "Personal") {
        return 8.5;
      } else {
        return 0;
      }
    },
  },
  watch: {
    loanType(newVal) {
      // Update form values based on loan type
      this.form.loanType = newVal;
      this.form.interestRate = this.interestRateComp; // Use computed property
    },
    loanAmount(newVal) {
      this.form.loanAmount = newVal;
    },
    months(newVal) {
      this.form.months = newVal;
    },
    selectedDependent(newVal) {
      this.selectedDependent = newVal;
    },
    isDependent(newVal) {
      if (newVal) {
        this.showdependentForm = true;
      } else {
        this.showdependentForm = false;
      }
    },
  },
  methods: {
    formatAcceptedTypes(acceptedTypes) {
      return acceptedTypes.map((type) => type.split("/")[1]);
    },
    // handleFileUpload(field) {
    //   const fileInput = document.getElementById(field);
    //   const file = fileInput.files[0];
    //   this.errors[field] = null; // Clear any previous error

    //   if (file) {
    //     // Validate file size
    //     if (
    //       file.size >
    //       this.fileFields.find((f) => f.id === field).maxSize * 1024 * 1024
    //     ) {
    //       this.errors[field] = `File size should not exceed ${
    //         this.fileFields.find((f) => f.id === field).maxSize
    //       }MB.`;
    //       return;
    //     }

    //     // Validate file type
    //     const acceptedTypes = this.fileFields.find(
    //       (f) => f.id === field
    //     ).acceptedTypes;
    //     if (!acceptedTypes.includes(file.type)) {
    //       this.errors[
    //         field
    //       ] = `Only the following file types are allowed: ${this.formatAcceptedTypes(
    //         acceptedTypes
    //       ).join(", ")}.`;
    //       return;
    //     }

    //     // Store file if it's valid
    //     this.form[field] = file;
    //   }
    // },
    showdependent() {
      this.selectedDependent = "";
      this.showdependentForm = true;
    },
    formatDate(date) {
      const d = new Date(date);
      if (isNaN(d)) {
        throw new Error("Invalid date format. Please provide a valid date.");
      }
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(d.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    displayDate(date) {
      const d = new Date(date);
      if (isNaN(d)) {
        throw new Error("Invalid date format. Please provide a valid date.");
      }
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(d.getDate()).padStart(2, "0");

      return `${day}-${month}-${year}`;
    },
    editDependent(data) {
      this.showdependentForm = true;
      console.log("Edit Dependent", data);
      this.selectedDependent = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        relationship: data.relationship,
        dob: this.formatDate(data.dob),
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        email: data.email,
      };
      console.log("updated Data", this.selectedDependent);
    },
    handleLoanTypeChange(value) {
      this.form.loanType = value;
    },
    addDependents(data) {
      console.log("Dependent Add/Update", data);

      if (data.id) {
        // If an ID exists, update the existing dependent
        const index = this.form.dependents.findIndex((d) => d.id === data.id);
        if (index !== -1) {
          this.form.dependents[index] = {
            ...this.form.dependents[index],
            ...data,
          };

          this.showdependentForm = false;
          console.log("Dependent updated", this.form.dependents[index]);
        } else {
          console.warn("No dependent found with the given ID.");
        }
      } else {
        // If no ID exists, generate a new ID and add the dependent
        const newId = this.form.dependents.length
          ? Math.max(...this.form.dependents.map((d) => d.id)) + 1
          : 1;
        this.form.dependents.push({
          id: newId,
          ...data,
        });
        this.showdependentForm = false;
        console.log("New dependent added", {
          id: newId,
          ...data,
        });
      }

      // Reset the form after adding/updating
      this.$formkit.reset("dependentForm");
    },

    removeDependent(index) {
      this.form.dependents.splice(index, 1);
    },
    handleFileUpload(field) {
      const fileInput = document.getElementById(field);
      const file = fileInput.files[0];
      this.errors[field] = null;
      if (file) {
        this.form[field] = file;
      }
    },
    extractFiles(proxyArray) {
      if (Array.isArray(proxyArray) && proxyArray.length > 0) {
        return proxyArray.map((item) => item.file || item);
      }
      return [];
    },
    handleSubmit(formdata) {
      console.log(this.form.profilePicture);
      const payload = {
        userId: this.form.userId,
        interestRate: this.form.interestRate,
        months: this.form.months,
        loanAmount: this.form.loanAmount,
        loanType: this.form.loanType,
        personalDetails: {
          firstName: this.form.info.firstName,
          lastName: this.form.info.lastName,
          dateOfBirth: this.form.info.dateOfBirth,
          maritalStatus: this.form.info.maritalStatus,
          phoneNumber: this.form.info.phoneNumber,
          email: this.form.info.email,
          alternatePhoneNumber: this.form.info.alternatePhoneNumber,
          address: this.form.info.address,
          city: this.form.info.city,
          state: this.form.info.state,
          zip: this.form.info.zip,
          gender: this.form.info.gender,
          spouse: this.form.info.spouse,
        },
        occupationDetails: {
          occupation: this.form.occupation.occupation,
          employerDetails: this.form.occupation.employerDetails,
          monthlyIncome: this.form.occupation.monthlyIncome,
        },
        dependents: this.form.dependents,

        homeLoanDetails:
          this.form.loanType === "Home Loan"
            ? {
                loanPurpose: this.form.homeLoanDetails.loanPurpose,
                propertyType: this.form.homeLoanDetails.propertyType,
                propertyAddress: this.form.homeLoanDetails.propertyAddress,
                builtUpArea: this.form.homeLoanDetails.builtUpArea,
                yearOfConstruction:
                  this.form.homeLoanDetails.yearOfConstruction,
                propertyPrice: this.form.homeLoanDetails.propertyPrice,
                builderDetails: this.form.homeLoanDetails.builderDetails,
                builderContact: this.form.homeLoanDetails.builderContact,
                builderAddress: this.form.homeLoanDetails.builderAddress,
                registrationDetails:
                  this.form.homeLoanDetails.registrationDetails,
              }
            : null,
        vehicleLoanDetails:
          this.form.loanType === "Vehicle Loan"
            ? {
                vehicleType: this.form.vehicleLoanDetails.vehicleType,
                makeModel: this.form.vehicleLoanDetails.makeModel,
                manufacturingYear:
                  this.form.vehicleLoanDetails.manufacturingYear,
                variant: this.form.vehicleLoanDetails.variant,
                exShowroomPrice: this.form.vehicleLoanDetails.exShowroomPrice,
                onRoadPrice: this.form.vehicleLoanDetails.onRoadPrice,
                color: this.form.vehicleLoanDetails.color,
                registrationNumber:
                  this.form.vehicleLoanDetails.registrationNumber,
                insuranceProvider:
                  this.form.vehicleLoanDetails.insuranceProvider,
                dealerName: this.form.vehicleLoanDetails.dealerName,
                dealerContact: this.form.vehicleLoanDetails.dealerContact,
                dealerAddress: this.form.vehicleLoanDetails.dealerAddress,
                quotationUpload: this.form.vehicleLoanDetails.quotationUpload,
                downPaymentAmount:
                  this.form.vehicleLoanDetails.downPaymentAmount,
                downPaymentSource:
                  this.form.vehicleLoanDetails.downPaymentSource,
              }
            : null,
        personalLoanDetails:
          this.form.loanType === "Personal Loan"
            ? {
                purpose: this.form.personalLoanDetails.purpose,
                hospitalName: this.form.personalLoanDetails.hospitalName,
                estimatedExpense:
                  this.form.personalLoanDetails.estimatedExpense,
                institutionName: this.form.personalLoanDetails.institutionName,
                courseName: this.form.personalLoanDetails.courseName,
                duration: this.form.personalLoanDetails.duration,
                fee: this.form.personalLoanDetails.fee,
                venueDetails: this.form.personalLoanDetails.venueDetails,
                otherPurpose: this.form.personalLoanDetails.otherPurpose,
              }
            : null,
      };
      console.log("payload", payload);

      console.log("Form submitted successfully:", formdata);
      this.uploadFiles();
      alert("Form Submitted Successfully!");
    },
    async uploadFiles() {
      this.$store.state.isLoading = true;

      const applicationNumber = 123;
      if (!applicationNumber) {
        alert("Please submit the form data first.");
        return;
      }

      try {
        // Upload files individually
        const filePaths = {};
        const idProof = this.extractFiles(this.idProof);
        const profilePicture = this.extractFiles(this.profilePicture);
        const addressProof = this.extractFiles(this.addressProof);
        const bankStatements = this.extractFiles(this.bankStatements);
        const incomeProof = this.extractFiles(this.incomeProof);
        if (profilePicture) {
          filePaths.profilePicturePath = await this.uploadFileToS3(
            profilePicture,
            applicationNumber,
            "profilePicture"
          );
        }
        if (idProof) {
          filePaths.idProofPath = await this.uploadFileToS3(
            idProof,
            applicationNumber,
            "idProof"
          );
        }
        if (addressProof) {
          filePaths.addressProofPath = await this.uploadFileToS3(
            addressProof,
            applicationNumber,
            "addressProof"
          );
        }
        if (incomeProof) {
          filePaths.incomeProofPath = await this.uploadFileToS3(
            this.form.incomeProof,
            applicationNumber,
            "incomeProof"
          );
        }
        if (bankStatements) {
          filePaths.bankStatementsPath = await this.uploadFileToS3(
            this.form.bankStatements,
            applicationNumber,
            "bankStatements"
          );
        }

        this.$store.state.isLoading = false;
      } catch {
        this.$store.state.isLoading = false;
        console.log("Error in Upload File");
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
    async fetchCities() {
      if (!this.selectedState || !this.selectedState.iso2) {
        this.cities = []; // Clear the cities if no state is selected
        return;
      }
      if (this.selectedState.name) {
        this.form.info.state = this.selectedState.name;
        console.log(this.form.info.state);
      }

      console.log("Fetching cities...");
      this.$store.state.isLoading = true;
      try {
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
        if (data && data.length) {
          this.cities = data.map((city) => ({
            value: city.name,
            label: city.name,
          })); // Set the cities in dropdown
        } else {
          this.cities = []; // No cities found for the selected state
        }
        this.$store.state.isLoading = false;
      } catch (error) {
        console.error("Error fetching cities:", error);
        this.$store.state.isLoading = false;
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
          // Map the result into a state array with id, name, and iso2
          this.states = result.map((state) => ({
            value: state,
            label: state.name,
            iso2: state.iso2, // Ensuring we keep track of iso2 for city fetching
          }));
        })
        .catch((error) => console.log("Error fetching states:", error));
    },
  },
  mounted() {
    this.fetchStates(); // Fetch states when the component is mounted
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: auto;
}
.custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ebecef;
  border-radius: 10px;
  margin-bottom: 10px; /* Adds spacing below the header */
  background-color: #20b75730;
}

.custom-tr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ebecef;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}
.custom-tr:hover {
  background-color: #20b7571a;
}
.bi:hover {
  cursor: pointer;
}
.invalid-feedback {
  font-size: 13px !important;
}
</style>
