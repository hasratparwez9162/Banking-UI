<template>
  <div class="manage-beneficiary">
    <div class="mb-4 d-flex justify-content-between">
      <h2 class="text-start">Manage Beneficiary</h2>
      <button
        @click="openModel"
        class="btn-primary rounded-pill gap-2 d-flex align-items-center px-3"
      >
        <i class="bi bi-plus-circle text-base md:text-lg"></i>Add Beneficiary
      </button>
    </div>
    <div class="custom-card">
      <table class="table">
        <thead>
          <tr>
            <td colspan="6" class="p-0">
              <div class="custom-header">
                <div class="p-3 text-start w-10">#</div>
                <div class="p-3 text-start w-20">Name</div>
                <div class="p-3 text-start w-20">Account</div>
                <div class="p-3 text-start w-20">Bank Name</div>
                <div class="p-3 text-start w-20">IFSC Code</div>
                <div class="p-3 text-start w-15">Action</div>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="beneficiary in paginatedBeneficiaries"
            :key="beneficiary.id"
          >
            <td colspan="6" class="p-0">
              <div class="custom-tr">
                <div class="p-3 text-start w-10">
                  {{ beneficiary.id }}
                </div>
                <div class="p-3 text-start w-20">
                  {{ beneficiary.name }}
                </div>
                <div class="p-3 text-start w-20">
                  {{ beneficiary.accountNumber }}
                </div>
                <div class="p-3 text-start w-20">
                  {{ beneficiary.bankName }}
                </div>
                <div class="p-3 text-start w-20">
                  {{ beneficiary.ifscCode }}
                </div>

                <div class="p-3 text-start gap-3 d-flex w-15">
                  <i
                    @click="editBeneficiary(beneficiary)"
                    class="bi bi-pencil-square"
                  ></i
                  ><i
                    @click="deleteBeneficiary(beneficiary.id)"
                    class="bi bi-trash3"
                  ></i>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-between align-items-center">
        <span> Showing {{ showingRange }} of {{ totalEntries }} entries </span>
        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{ disabled: currentPage === 1 }"
              @click="goToPage(currentPage - 1)"
            >
              <a class="page-link" href="javascript:void(0)">
                <i class="bi bi-chevron-left"></i>
              </a>
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              class="page-item"
              :class="{ active: page === currentPage }"
              @click="goToPage(page)"
            >
              <a class="page-link" href="javascript:void(0)">{{ page }}</a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
              @click="goToPage(currentPage + 1)"
            >
              <a class="page-link" href="javascript:void(0)">
                <i class="bi bi-chevron-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <BaseModel :is-open="isopen" @close="closeModel">
      <AddBeneficiary
        :selectedBeneficiary="selectedBeneficiary"
        @submit="handleAddBeneficiary"
        @update="handleUpdateBeneficiary"
      />
    </BaseModel>
  </div>
</template>

<script>
import AddBeneficiary from "./AddBeneficiary.vue";
import BaseModel from "./BaseModel.vue";

export default {
  name: "ManageBeneficiary",
  components: {
    AddBeneficiary,
    BaseModel,
  },
  data() {
    return {
      isopen: false,
      selectedBeneficiary: "",
      beneficiaries: [
        // Sample data for testing
        {
          id: 1,
          name: "John Doe",
          accountNumber: "123456789",
          bankName: "Aditi Bank",
          ifscCode: "ADITI001234",
        },
        {
          id: 2,
          name: "Jane Smith",
          accountNumber: "987654321",
          bankName: "HDFC Bank",
          ifscCode: "HDFC0004585",
        },
        {
          id: 3,
          name: "Rakesh Kumar",
          accountNumber: "123456789",
          bankName: "Aditi Bank",
          ifscCode: "ADITI001234",
        },
        {
          id: 4,
          name: "Rekha Kumari",
          accountNumber: "987654321",
          bankName: "HDFC Bank",
          ifscCode: "HDFC0004585",
        },
        {
          id: 5,
          name: "Rahul Kumar",
          accountNumber: "123456789",
          bankName: "Aditi Bank",
          ifscCode: "ADITI001234",
        },
        {
          id: 6,
          name: "Jane Foster",
          accountNumber: "987654321",
          bankName: "HDFC Bank",
          ifscCode: "HDFC0004585",
        },
        // Add more entries here for pagination testing
      ],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.beneficiaries.length / this.itemsPerPage);
    },
    paginatedBeneficiaries() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.beneficiaries.slice(start, end);
    },
    showingRange() {
      const start = (this.currentPage - 1) * this.itemsPerPage + 1;
      const end = Math.min(
        this.currentPage * this.itemsPerPage,
        this.beneficiaries.length
      );
      return `${start} - ${end}`;
    },
    totalEntries() {
      return this.beneficiaries.length;
    },
  },
  methods: {
    openModel() {
      this.isopen = true;
    },
    closeModel() {
      this.isopen = false;
    },
    handleAddBeneficiary(data) {
      if (typeof data === "object") {
        this.beneficiaries.push({
          id: this.beneficiaries.length + 1,
          ...data,
        });
        this.closeModel();
      }
    },
    handleUpdateBeneficiary(data) {
      if (typeof data === "object" && data.id) {
        const index = this.beneficiaries.findIndex(
          (beneficiary) => beneficiary.id === data.id
        );
        if (index !== -1) {
          this.beneficiaries.splice(index, 1, {
            ...this.beneficiaries[index],
            ...data,
          });
        }
      }
      this.closeModel();
    },
    editBeneficiary(beneficiary) {
      this.selectedBeneficiary = beneficiary;
      this.openModel();
    },
    deleteBeneficiary(id) {
      if (confirm("Are you sure you want to delete this beneficiary?")) {
        this.beneficiaries = this.beneficiaries.filter(
          (beneficiary) => beneficiary.id !== id
        );
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages || 1;
        }
      }
    },
    goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>

<style scoped>
.manage-beneficiary {
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
td {
  border-style: none;
}
.table th {
  background-color: #f1f3f5;
}
.pagination .page-item.active .page-link {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
}
.pagination .page-link {
  color: #28a745;
}
.pagination .page-link:hover {
  color: #28a745;
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
.custom-width-45 {
  width: 45%;
}
.bi:hover {
  cursor: pointer;
}

.btn {
  margin: 0 5px;
}
</style>
