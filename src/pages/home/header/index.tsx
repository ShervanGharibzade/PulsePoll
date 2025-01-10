import Button from "../../../components/button";
import Input from "../../../components/input";

const Header = () => {
  return (
    <div className="text-white">
      <div className="bg-blue-400 my-5 rounded-lg p-5 flex items-center justify-between">
        <p className="text-2xl font-semibold">Joining as a participant?</p>
        <Input placeHolder="Enter your code" />
      </div>
      <p className="text-5xl font-bold max-w-[500px] text-center leading-[1.5] mx-auto my-5">
        The easiest way to make your meetings interactive
      </p>
      <p className="text-center">
        Engage your participants with live polls, Q&A, quizzes and word clouds —
        whether you meet in the office, online or in-between.
      </p>
      <div className="w-fit mx-auto mt-5">
        <Button title="Try now free!" className="text-2xl" />
      </div>
    </div>
  );
};

export default Header;
