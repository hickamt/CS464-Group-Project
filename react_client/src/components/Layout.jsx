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

const Layout = () => {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="nav-link" to="/">
            <img
              // src="sql_greyblue_icon.png"
              src="crypto_home.png"
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
              {/* The following list items (<li>) would allow for links to other pages in navbar */}
              <li className="nav-item active fs-4">
                <Link className="nav-link fs-4" to="/nathan">
                  Nathan
                </Link>
              </li>
              <li className="nav-item active fs-4">
                <Link className="nav-link" to="/todd">
                  Todd
                </Link>
              </li>
              <li className="nav-item active fs-4">
                <Link className="nav-link" to="/william">
                  William
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
