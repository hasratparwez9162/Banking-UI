<template>
  <div>
    <div
      class="d-flex flex-wrap align-items-center gap-4 justify-content-between"
    >
      <h4>Card Transactions</h4>
      <div class="filters d-flex align-items-center gap-3 justify-content-end">
        <span>Sort By:</span>
        <div class="custom-select-container">
          <select
            v-model="selectedYear"
            class="custom-select custom-bg-primary-5 btn-light"
            @change="updateChart"
          >
            <option
              class="custom-option"
              v-for="year in years"
              :key="year"
              :value="year"
            >
              {{ year }}
            </option>
          </select>
          <i class="bi bi-chevron-down custom-arrow"></i>
        </div>
      </div>
    </div>

    <canvas id="transactionChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "TransactionChart",
  data() {
    return {
      chart: null,
      years: ["2023", "2024", "2025"],
      selectedYear: "2025",
      transactionData: {
        2023: [500, 700, 800, 600, 900, 1100, 1400, 1000, 950, 800, 700, 600],
        2024: [600, 150, 850, 650, 950, 150, 1250, 150, 1000, 850, 1750, 650],
        2025: [700, 800, 900, 700, 1000, 1200, 1400, 1100, 1050, 900, 800, 700],
      },
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = document.getElementById("transactionChart").getContext("2d");
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

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Cashout Transactions",
              data: this.transactionData[this.selectedYear].map((v) => v - 100),
              backgroundColor: "rgba(255, 200, 97, 0.85)",
              borderWidth: 1,
              fill: true,
            },
            {
              label: "Payment Transactions",
              data: this.transactionData[this.selectedYear].map((v) => v + 100),
              backgroundColor: "#0e777e",
              borderWidth: 1,
              fill: true,
            },
          ],
        },
        options: {
          hoverBackgroundColor: "rgb(200,200,200)",
          responsive: true,
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
                if (tooltipModel.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
                }

                const titleLines = tooltipModel.title || [];
                const bodyLines = tooltipModel.body.map((item) => item.lines);
                const labelColors = tooltipModel.labelColors; // Get label colors

                let innerHtml = "<thead>";
                titleLines.forEach(
                  (title) =>
                    (innerHtml += `<tr style="background: #f0f0f0;"><th>${title}</th></tr>`)
                );
                innerHtml += "</thead><tbody>";

                bodyLines.forEach((body, i) => {
                  const color = labelColors[i]?.backgroundColor || "#000"; // Fallback to black if no color
                  innerHtml += `
      <tr>
        <td>
          <div style="display: flex; align-items: center;">
            <div style="width: 10px; height: 10px; margin-right: 5px; background-color: ${color}; border-radius: 50%;"></div>
            ${body}
          </div>
        </td>
      </tr>`;
                });

                innerHtml += "</tbody>";

                const tableRoot = tooltipEl.querySelector("table");
                tableRoot.innerHTML = innerHtml;

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
    updateChart() {
      if (this.chart) {
        // Destroy the existing chart instance
        this.chart.destroy();
      }
      // Recreate the chart with updated data
      this.createChart();
    },
  },
};
</script>

<style>
.filters {
  margin-bottom: 20px;
}

.custom-select-container {
  position: relative;
  display: inline-block;
}

.custom-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 5px 30px 5px 10px;
  font-size: 16px;

  border-radius: 25px;

  width: 150px;
}
.custom-option:hover {
  background-color: #333 !important;
}
.custom-select:focus-visible {
  outline: transparent !important;
}

.custom-arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #333;
}
#chartjs-tooltip {
  font-size: 14px;
  color: #333;
}

#chartjs-tooltip thead th {
  text-align: left;
  padding: 5px 10px;
  background: #f0f0f0; /* Grey background for header */
  color: #333;
}

#chartjs-tooltip tbody td {
  text-align: left;
  padding: 5px 10px;
}

#chartjs-tooltip table {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
}
</style>
