// Sidbar setup for testing
export default function Sidebar({ getComponent }) {
  return (
    <div className="sidebar bg-dark rounded d-block">
      <p>Sidebar</p>
      <button
        className="card-btn rounded bg-success text-light m-1"
        value="card"
        onClick={(e) => getComponent(e, e.target.value)}>
        Card
      </button>
      <button
        className="card-btn rounded bg-success text-light m-1"
        value="chart"
        onClick={(e) => getComponent(e, e.target.value)}>
        Chart
      </button>
      <button
        className="card-btn rounded bg-success text-light m-1"
        value="table"
        onClick={(e) => getComponent(e, e.target.value)}>
        Table
      </button>
    </div>
  );
}
