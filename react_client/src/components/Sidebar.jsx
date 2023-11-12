/* eslint-disable react/prop-types */
import { useAuth } from "../context(s)/AuthContext";
// Sidbar setup for testing
export default function Sidebar({ switchAssetView, switchChartView }) {
  const { currentUser, login, logout } = useAuth();
  return (
    <div className="sidebar text-center">
      <section className="sidebar-header-space"></section>
      <section className="sidebar-chart-view">
        <p className="sidebar-charts fs-5 mt-1">VISUALIZE</p>
        <button
          className="card-btn rounded m-1"
          value="chart"
          onClick={(e) => switchChartView(e, e.target.value)}
        >
          Pie Chart
        </button>
        <button
          className="card-btn rounded m-1"
          value="line-chart"
          onClick={(e) => switchChartView(e, e.target.value)}
        >
          Line Chart
        </button>
        <button
          className="card-btn rounded m-1"
          value="line-compare"
          onClick={(e) => switchChartView(e, e.target.value)}
        >
          Compare
        </button>
      </section>

      <section className="sidebar-asset-view">
        <p className="sidebar-analyze fs-5 mt-1">ANALYZE</p>
        <button
          className="card-btn rounded m-1"
          value="card"
          onClick={(e) => switchAssetView(e, e.target.value)}
        >
          Card
        </button>
        <button
          className="card-btn rounded m-1"
          value="table"
          onClick={(e) => switchAssetView(e, e.target.value)}
        >
          Table
        </button>
      </section>
      <section className="d-flex flex-column">
        {currentUser ? (
          <p className="text-center">
            {currentUser.username !== "Crypto Crazy" ? "Please login" : "Crypto Crazy"}
          </p>
        ) : null}
        {currentUser ? (
          <button className="btn btn-primary mb-3 mx-auto" onClick={logout}>
            Logout
          </button>
        ) : (
          <button className="btn btn-primary mb-3 mx-auto" onClick={login}>
            Login
          </button>
        )}
      </section>
    </div>
  );
}
