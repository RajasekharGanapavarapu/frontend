import Carousell from "./utils/carousel";
import Cards from "./utils/Cards";
import Footer from "./utils/footer";
function LandingPage() {
  const getcolor = () => {
    if (localStorage.getItem("darkmode") === "yes") {
      return "text-light";
    }
    return "text-dark";
  };
  return (
    <div className="container-fluid p-0">
      <Carousell />
      <div className={`my-4 text-center ${getcolor()}`}>
        <h3>Recommended Movies</h3>
      </div>
      <Cards />
      <Footer />
    </div>
  );
}
export default LandingPage;