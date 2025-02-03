<template>
  <div class="container mb-3">
    <h4 class="text-start">Card Documentations</h4>
    <table class="mb-3 w-100">
      <thead>
        <tr>
          <td colspan="3" class="p-0">
            <div class="custom-header">
              <div class="p-3 custom-width-45 text-start">Document Type</div>
              <div class="p-3 custom-width-45 text-start">
                Additional Titles/Sections
              </div>
              <div class="p-3 text-start">Action</div>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doc, index) in paginatedDocuments" :key="index">
          <td colspan="3" class="p-0">
            <div class="custom-tr">
              <div class="p-3 text-start custom-width-45">{{ doc.name }}</div>
              <div class="p-3 text-start custom-width-45">
                {{ doc.description }}
              </div>
              <div class="p-3 text-start"><i class="bi bi-download"></i></div>
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
</template>

<script>
export default {
  data() {
    return {
      documents: [
        { name: "Credit Card Agreement", description: "Interest Rates" },
        { name: "Terms and Conditions", description: "Annual Fees" },
        { name: "Cardholder Agreement", description: "Billing and Payment" },
        { name: "Card Issuance Form", description: "Personal Information" },
        { name: "Lost or Stolen Reporting", description: "Incident Details" },
        { name: "Credit Card Statement", description: "Transaction Details" },
        { name: "Activation Instructions", description: "Activation Steps" },
        { name: "Privacy Policy", description: "Data Protection" },
        { name: "Fee Structure", description: "Penalty Charges" },
        { name: "Reward Policy", description: "Points Redemption" },
      ],
      currentPage: 1,
      itemsPerPage: 4,
    };
  },
  computed: {
    totalEntries() {
      return this.documents.length;
    },
    totalPages() {
      return Math.ceil(this.totalEntries / this.itemsPerPage);
    },
    paginatedDocuments() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.documents.slice(start, end);
    },
    showingRange() {
      const start = (this.currentPage - 1) * this.itemsPerPage + 1;
      const end = Math.min(start + this.itemsPerPage - 1, this.totalEntries);
      return `${start} to ${end}`;
    },
  },
  methods: {
    goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>
<style scoped>
.search-bar {
  background-color: #f1f3f5;
  border-radius: 20px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
}
.search-bar input {
  border: none;
  background: none;
  outline: none;
  width: 100%;
}
.search-bar i {
  color: #28a745;
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
</style>
