/* eslint-disable react/prop-types */

// Sidbar setup for testing
export default function Sidebar({ switchAssetView, switchChartView }) {
  return (
    <div className="sidebar text-center">
      <section className="sidebar-header-space"></section>
      <section className="sidebar-chart-view">
        <p className="sidebar-charts fs-5 mt-1">VISUALIZE</p>
        <button
          className="card-btn rounded m-1"
          value="chart"
          onClick={(e) => switchChartView(e, e.target.value)}>
          Pie Chart
        </button>
        <button
          className="card-btn rounded m-1"
          value="line-chart"
          onClick={(e) => switchChartView(e, e.target.value)}>
          Line Chart
        </button>
        <button
          className="card-btn rounded m-1"
          value="line-compare"
          onClick={(e) => switchChartView(e, e.target.value)}>
         Compare 
        </button>
      </section>

      <section className="sidebar-asset-view">
        <p className="sidebar-analyze fs-5 mt-1">ANALYZE</p>
        <button
          className="card-btn rounded m-1"
          value="card"
          onClick={(e) => switchAssetView(e, e.target.value)}>
          Card
        </button>
        <button
          className="card-btn rounded m-1"
          value="table"
          onClick={(e) => switchAssetView(e, e.target.value)}>
          Table
        </button>
      </section>
    </div>
  );
}
