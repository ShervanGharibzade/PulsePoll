import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuestionsList from "./showQuestions";

const Dashboard = () => {
  return (
    <div>
      <QuestionsList />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
