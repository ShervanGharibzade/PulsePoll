import { useState } from "react";
import Button from "../../../components/button";
import Input from "../../../components/input";
import clsx from "clsx";
import Check from "../../../assets/icons/check.svg?react";
import Close from "../../../assets/icons/close-icon.svg?react";
import { showToast } from "../../../components/toast";
import { IAnswer, ICreateQuestion } from "../../../types";
import { createQuestions } from "../../../restApi/user/question";

const Questions = () => {
  const [titleQuestion, setTitleQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<IAnswer[]>([
    { id: 0, text: "", isCurrect: false, votePortion: 0 },
    { id: 1, text: "", isCurrect: false, votePortion: 0 },
  ]);
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const index = Number(name.split("-")[1]);

    setAnswers((prev) =>
      prev.map((ans) =>
        ans.id === index ? { ...ans, text: value.trim() } : ans
      )
    );
  };

  const handleCurrentAnswer = (id: number) => {
    setAnswers((prev) =>
      prev.map((ans) => ({
        ...ans,
        isCurrect: ans.id === id,
      }))
    );
    setCurrentAnswer(id);
  };

  const handleRemoveAnswer = (index: number) => {
    setAnswers((prev) => prev.filter((ans) => ans.id !== index));

    if (currentAnswer === index) {
      setCurrentAnswer(null);
    }
  };

  const handleAddAnswer = () => {
    setAnswers((prev) => [
      ...prev,
      { id: prev.length, text: "", isCurrect: false, votePortion: 0 },
    ]);
  };

  const SubmitQuestion = async () => {
    if (!titleQuestion.trim() || answers.some((a) => !a.text.trim())) {
      showToast("Please fill in all fields before submitting", "error");
      return;
    }

    const filteredAnswers = answers.map(({ id, ...rest }) => rest);

    const data: ICreateQuestion = {
      Question: titleQuestion,
      Answers: filteredAnswers,
    };

    try {
      await createQuestions(data);
      showToast("Your question was created successfully!", "success");
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div>
      <div className="text-2xl font-semibold text-center my-20 flex items-center w-full">
        <div className="h-0.5 w-full bg-white mx-2" />
        <h2 className="min-w-[250px]">Create your question</h2>
        <div className="h-0.5 w-full bg-white mx-2" />
      </div>
      <div className="rounded-lg p-5">
        <div className="flex justify-center mx-auto">
          <Input
            name="question"
            className="pr-12 text-white"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitleQuestion(e.target.value.trim())
            }
            placeHolder="Enter your Question title"
          />
        </div>
        <div className={clsx("grid gap-5 mt-5 w-fit mx-auto")}>
          {answers.map((answer) => (
            <Input
              key={answer.id}
              name={`answer-${answer.id}`}
              onChange={onChange}
              className="text-white"
              placeHolder="Enter your answer"
              iconStart={
                <div
                  className="mr-3 cursor-pointer"
                  onClick={() => handleRemoveAnswer(answer.id)}
                >
                  <Close className="w-4 h-4 fill-white" />
                </div>
              }
              iconEnd={
                <Button
                  onClick={() => handleCurrentAnswer(answer.id)}
                  className={clsx(
                    "hover:bg-transparent ml-3 border border-white border-solid rounded-full transition-all duration-300 flex items-center p-1 bg-transparent",
                    currentAnswer === answer.id &&
                      "hover:bg-green-700 bg-green-700 border-none"
                  )}
                  iconEnd={<Check className="w-4 h-4 fill-white" />}
                />
              }
            />
          ))}
          <div className="flex items-center gap-2 w-fit justify-center mx-auto">
            <Button
              onClick={handleAddAnswer}
              title="+"
              className="w-7 h-7 rounded-full bg-gray-500 p-2 mx-auto"
            />
            <Button
              disabled={
                !titleQuestion.trim() || answers.some((a) => !a.text.trim())
              }
              onClick={SubmitQuestion}
              title="Submit"
              className="w-fit h-7 rounded-full p-2 mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
