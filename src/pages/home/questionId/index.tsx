import { useEffect, useState } from "react";
import Check from "../../../assets/icons/check.svg?react";
import { useParams } from "react-router-dom";
import { getQuestionsById } from "../../../restApi/user/question";
import { IQuestion } from "../../../types";

const QuestionId = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<IQuestion>();

  useEffect(() => {
    const getQuestion = async () => {
      const q = await getQuestionsById(Number(id));
      setQuestion(q);
    };
    getQuestion();
  }, []);

  return (
    <div className="h-screen">
      <div className="border  border-gray-400 rounded-lg p-5">
        {question?.text}qID:{id}
        {question?.answers.map((a, index) => (
          <div key={a.id} className="flex items-center gap-3 my-2">
            <span className="min-w-10">
              <h3 className="text-base font-medium">
                {++index}. {a.text}
              </h3>
            </span>
            <span className="min-w-10">
              vote: {a.votePortion > 0 && a.votePortion}
            </span>
            {a.isCurrect && (
              <Check className="w-6 h-6 bg-green-700 p-1 fill-white rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionId;
