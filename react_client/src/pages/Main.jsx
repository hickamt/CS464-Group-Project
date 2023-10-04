import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import MainView from "../components/MainView";
import Header from "../components/Header";

function Main() {
  // const [animation, setAnimation] = useState(false);

  // const postQuery = (e, value) => {
  //   e.preventDefault();
  //   setAnimation(true); // animation while fetching data

  //   // Makes the API Call: "../api/expressQueryAPI.jsx"
  //   expressQueryAPI(value, setExpressData, setIsData, setAnimation);
  // };

  return (
    <>
      <div className="dashboard-container text-center mt-3">
        {/* {animation && <FetchAnimation />} */}
        <Header />
        <MainView />
        <Sidebar />
        <Footer />
      </div>
    </>
  );
}

export default Main;
