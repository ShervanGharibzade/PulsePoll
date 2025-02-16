import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuestionsList from "./showQuestions";
import DashboardLayout from "./layout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <QuestionsList />
      <ToastContainer />
    </DashboardLayout>
  );
};

export default Dashboard;
