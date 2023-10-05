/* eslint-disable react/prop-types */

// Sidbar setup for testing
export default function Sidebar({ switchComponentView }) {
  return (
    <div className="sidebar bg-dark rounded">
      {/* <p className="fs-4">Sidebar</p> */}
      <section className="sidebar-main-view">
        <p className="fs-6 mt-1">Main View</p>
        <button
          className="card-btn rounded bg-primary text-light m-1"
          value="card"
          onClick={(e) => switchComponentView(e, e.target.value)}>
          Card
        </button>
        <button
          className="card-btn rounded bg-primary text-light m-1"
          value="chart"
          onClick={(e) => switchComponentView(e, e.target.value)}>
          Chart
        </button>
        <button
          className="card-btn rounded bg-primary text-light m-1"
          value="table"
          onClick={(e) => switchComponentView(e, e.target.value)}>
          Table
        </button>
      </section>
    </div>
  );
}
