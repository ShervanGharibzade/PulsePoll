import { useState } from "react";
import Button from "../../../components/button";
import Input from "../../../components/input";
import clsx from "clsx";
import Check from "../../../assets/icons/check.svg?react";
import {
  createQuestions,
  ICreateQuestion,
} from "../../../restApi/user/question";
import { showToast } from "../../../components/toast";

export interface IAnswer {
  text: string;
  isCurrect: boolean;
  votePortion: number;
}

const Questions = () => {
  const [limitAnswers, setLimitAnswers] = useState(2);
  const [titleQuestion, setTitleQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<IAnswer[]>(
    Array.from({ length: limitAnswers }).map(() => ({
      text: "",
      isCurrect: false,
      votePortion: 0,
    }))
  );
  const [currentAnswer, setCurrentAnswer] = useState<null | Number>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const index = Number(name.split("-")[1]);

    setAnswers((prev) =>
      prev.map((ans, i) =>
        i === index
          ? {
              ...ans,
              text: value.trim(),
              isCurrect: Boolean(i === currentAnswer),
              votePortion: 1,
            }
          : ans
      )
    );
  };

  const handleCurrentAnswer = (index: number) => {
    setAnswers((prev) =>
      prev.map((ans, i) => ({
        ...ans,
        isCurrect: i === index ? true : false, // Only the clicked answer should be marked as correct
      }))
    );
    setCurrentAnswer(index); // Update the current answer index
  };
  console.log(answers);

  const SubmitQuestion = async () => {
    const data: ICreateQuestion = {
      Question: titleQuestion,
      Answers: answers,
    };
    console.log(data);

    try {
      const res = await createQuestions(data);

      showToast("Your question was created successfully!", "success");
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-center my-20">
          Create your question
        </h2>
        <div className="border-solid border rounded-lg p-5">
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
            {Array.from({ length: limitAnswers }).map((_, i) => (
              <Input
                key={i}
                name={`answer-${i}`}
                onChange={onChange}
                className="text-white"
                placeHolder="Enter your answer"
                iconEnd={
                  <Button
                    onClick={() => handleCurrentAnswer(i)}
                    className={clsx(
                      "hover:bg-transparent ml-3 border border-white border-solid rounded-full transition-all duration-300 flex items-center p-1 bg-transparent",
                      currentAnswer === i &&
                        "hover:bg-green-700 bg-green-700 border-none"
                    )}
                    iconEnd={<Check className="w-4 h-4 fill-white " />}
                  />
                }
              />
            ))}
            <div className="flex items-center gap-2 w-fit justify-center mx-auto">
              <Button
                onClick={() => setLimitAnswers((prev) => prev + 1)}
                title="+"
                className="w-7 h-7 rounded-full bg-gray-500 p-2 mx-auto"
              />
              <Button
                disabled={!titleQuestion && !answers[0].text}
                onClick={SubmitQuestion}
                title="submit"
                className="w-fit h-7 rounded-full p-2 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
