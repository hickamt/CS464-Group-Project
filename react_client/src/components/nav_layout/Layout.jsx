// React Navbar Docs: https://react-bootstrap.github.io/docs/components/navbar
/**
 * For react-bootstrap add the following import to the /App.jsx file:
 * import 'bootstrap/dist/css/bootstrap.min.css'
 */

/*
  Add a new link in /App.jsx as follows:

  import NewLink from "./pages/NewLink";
  <Routes>
    <Route path="newLink" element={<NewLink />} />
  </Routes

  Then, add the new link below as:
  <li className="nav-item active fs-4">
    <Link className="nav-link fs-4" to="/newLink">
      New Link Title
    </Link>
  </li>
*/

import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/blue_logo_abstract.png"

const Layout = () => {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-md navbar-dark">
        <div className="container-fluid">
          <Link className="nav-link" to="/">
            <img
              src={logo}
              alt="cryptocurrency logo"
              className="d-inline-block align-top navLogo"
            />
          </Link>
          <button
            className="navbar-toggler"
            id="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* The following list items (<li>) are the navbar links to new pages */}
              <li className="nav-item active fs-4">
                <Link className="nav-link fs-4" to="/card">
                  Card
                </Link>
              </li>
              <li className="nav-item active fs-4">
                <Link className="nav-link" to="/chart">
                 Chart 
                </Link>
              </li>
              <li className="nav-item active fs-4">
                <Link className="nav-link" to="/table">
                 Table 
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
