import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./header";
import Questions from "./questions";

const Home = () => {
  return (
    <div>
      <Header />
      <Questions />
      <ToastContainer />
    </div>
  );
};

export default Home;
