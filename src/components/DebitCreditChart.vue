<template>
  <div class="chart-container">
    <div class="chart-header">
      <h5>Credit and Debit Transactions Overview</h5>
      <div class="d-flex align-items-center gap-3">
        <span>Sort By:</span>
        <div class="dropdown">
          <button
            class="btn btn-light d-flex align-items-center gap-2 border rounded-pill px-3 py-1 custom-bg-primary-5"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span>{{ selectedFilter }}</span>
            <i class="bi bi-chevron-down"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end duration-300">
            <li
              v-for="option in filterOptions"
              :key="option"
              :class="{ active: selectedFilter === option }"
            >
              <!-- Using @click to set the selected filter when clicked -->
              <a class="dropdown-item" href="#" @click="setFilter(option)">{{
                option
              }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "IncomeExpensesChart",
  data() {
    return {
      transactions: [], // This will hold the data fetched from the backend
      selectedFilter: "Last 1 Year",
      filterOptions: ["Last 7 Days", "Last 1 Month", "Last 1 Year"],
    };
  },
  mounted() {
    const transactionresponce = localStorage.getItem("transactions");

    // Check if the data exists and parse it into an array
    if (transactionresponce) {
      try {
        const transactions = JSON.parse(transactionresponce);
        console.log("Before Map", transactions);
        if (Array.isArray(transactions)) {
          this.transactions = transactions.map(this.transformTransaction);
          console.log("After Map", this.transactions);
        } else {
          console.error("Parsed data is not an array");
          this.transactions = [];
        }
      } catch (error) {
        console.error("Error parsing transactions from localStorage:", error);
        this.transactions = [];
      }
    } else {
      console.error("No transactions found in localStorage.");
      this.transactions = [];
    }
    //render chart
    this.renderChart();
  },
  computed: {
    filteredTransaction() {
      let filtered = this.transactions;
      // Apply date filter
      const now = new Date();
      if (this.selectedFilter === "Last 7 Days") {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7); // Filter for the last 7 days
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.timestamp);
          return transactionDate >= sevenDaysAgo;
        });
      } else if (this.selectedFilter === "Last 1 Month") {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1); // Filter for the last 1 month
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.timestamp);
          return transactionDate >= oneMonthAgo;
        });
      } else if (this.selectedFilter === "Last 1 Year") {
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(now.getFullYear() - 1); // Filter for the last 1 year
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.timestamp);
          return transactionDate >= oneYearAgo;
        });
      }
      return filtered;
    },
  },
  watch: {
    selectedFilter(newFilter, oldFilter) {
      if (newFilter !== oldFilter) {
        this.renderChart(); // Re-render the chart whenever the filter changes
      }
    },
  },
  methods: {
    setFilter(filter) {
      this.selectedFilter = filter;
    },
    formatDate(isoString) {
      const dateObj = new Date(isoString);
      return dateObj.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },

    // Helper function to format time
    formatTime(isoString) {
      const dateObj = new Date(isoString);
      return dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    },

    // Helper function to format amount with commas
    formatAmount(amount) {
      return amount.toLocaleString("en-US", { minimumFractionDigits: 2 });
    },
    transformTransaction(transaction) {
      return {
        name: transaction.toAccount,
        type: transaction.transactionType,
        amount: transaction.amount, // Keep it as a number
        timestamp: transaction.transactionTime, // Keep the raw timestamp for chart processing
        date: this.formatDate(transaction.transactionTime), // Format date for display
        time: this.formatTime(transaction.transactionTime), // Format time for display
        status: "Completed",
      };
    },
    renderChart() {
      // If a chart already exists, destroy it
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.chartCanvas.getContext("2d");

      // Initialize labels for all months
      const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Initialize credit and debit data arrays with zero values for all months
      const creditData = Array(12).fill(0);
      const debitData = Array(12).fill(0);

      // Process the filtered transactions
      this.filteredTransaction.forEach((transaction) => {
        const date = new Date(transaction.timestamp);
        const monthIndex = date.getMonth(); // Get the month index (0-11)
        console.log(monthIndex);
        // Populate credit and debit datasets
        if (transaction.type === "CREDIT") {
          creditData[monthIndex] += transaction.amount;
        } else if (transaction.type === "QUICK_TRANSFER") {
          debitData[monthIndex] += transaction.amount;
        }
      });

      console.log("creditData", creditData);
      console.log("debitData", debitData);
      console.log("filtered Transaction", this.filteredTransaction);

      // Create the chart
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels, // Use the predefined month labels
          datasets: [
            {
              label: "Credit",
              data: creditData,
              borderColor: "#28a745",
              backgroundColor: "rgba(40, 167, 69, 0.2)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Debit",
              data: debitData,
              borderColor: "#ffc107",
              backgroundColor: "rgba(255, 193, 7, 0.2)",
              borderDash: [5, 5],
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value / 1000 + "k";
                },
              },
            },
          },
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              enabled: false, // Default tooltip is enabled

              external: function (context) {
                let tooltipEl = document.getElementById("chartjs-tooltip");
                if (!tooltipEl) {
                  tooltipEl = document.createElement("div");
                  tooltipEl.id = "chartjs-tooltip";
                  tooltipEl.innerHTML = "<table></table>";
                  document.body.appendChild(tooltipEl);
                }

                const tooltipModel = context.tooltip;

                // Hide the tooltip if there is no data
                if (tooltipModel.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
                }

                // Get title and body data
                const titleLines = tooltipModel.title || [];
                const bodyItems = context.tooltip.dataPoints; // Access all datasets for the hovered label

                let innerHtml = "<thead>";
                titleLines.forEach(
                  (title) =>
                    (innerHtml += `<tr style="background: #f0f0f0;"><th>${title}</th></tr>`)
                );
                innerHtml += "</thead><tbody>";

                bodyItems.forEach((item) => {
                  const color =
                    item.dataset.borderColor ||
                    item.element.options.borderColor; // Use dataset color
                  innerHtml += `
      <tr>
        <td>
          <div style="display: flex; align-items: center;">
            <div style="width: 10px; height: 10px; margin-right: 5px; background-color: ${color}; border-radius: 50%;"></div>
            ${item.dataset.label}: ${item.raw.toLocaleString()} 
          </div>
        </td>
      </tr>`;
                });

                innerHtml += "</tbody>";

                const tableRoot = tooltipEl.querySelector("table");
                tableRoot.innerHTML = innerHtml;

                // Set tooltip position
                const position = context.chart.canvas.getBoundingClientRect();
                tooltipEl.style.opacity = 1;
                tooltipEl.style.position = "absolute";
                tooltipEl.style.backgroundColor = "white";
                tooltipEl.style.border = "1px solid grey";
                tooltipEl.style.borderRadius = "5px";
                tooltipEl.style.padding = "10px";
                tooltipEl.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
                tooltipEl.style.left =
                  position.left +
                  window.pageXOffset +
                  tooltipModel.caretX +
                  10 +
                  "px"; // Add spacing
                tooltipEl.style.top =
                  position.top +
                  window.pageYOffset +
                  tooltipModel.caretY +
                  10 +
                  "px"; // Add spacing
                tooltipEl.style.pointerEvents = "none";
                tooltipEl.style.zIndex = "1000";
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.chart-container {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.chart-header h5 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}
</style>
