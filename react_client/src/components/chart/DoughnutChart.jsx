import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: ["red", "blue", "yellow"],
      borderColor: ["red", "blue", "yellow"],
      borderWidth: 1,
    },
  ],
};

function DoughnutChart() {
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
}
export default DoughnutChart;
