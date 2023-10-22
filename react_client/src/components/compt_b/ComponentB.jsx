import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
export default function ComponentThree() {

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
  }

  return (
    <>
      <div className="component-three text-center mt-3">
        <h1>CHARTS CHARTS CHARTS!!!!!</h1>
      </div>
      <Doughnut data={data} />
    </>
  );
}
