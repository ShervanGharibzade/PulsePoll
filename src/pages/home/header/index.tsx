import { useState } from "react";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [qID, setQID] = useState<number>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);

    setQID(Number(value));
  };

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && qID) {
      navigate(`/question/${qID}`);
    }
  };

  return (
    <div className="text-white">
      <div className="bg-blue-400 my-5 rounded-lg p-5 flex items-center justify-between">
        <p className="text-2xl font-semibold">Joining as a participant?</p>
        <Input
          placeHolder="Enter ID & press Enter"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={qID}
          className="text-white"
        />
      </div>
      <p className="text-5xl font-bold max-w-[500px] text-center leading-[1.5] mx-auto my-5">
        The easiest way to make your meetings interactive
      </p>
      <p className="text-center">
        Engage your participants with live polls, Q&A, quizzes and word clouds —
        whether you meet in the office, online or in-between.
      </p>
    </div>
  );
};

export default Header;
