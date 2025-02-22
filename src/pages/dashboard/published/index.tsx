import { useQuery } from "@tanstack/react-query";
import { getQuestionsPublished } from "../../../restApi/user/question";
import { IQuestion } from "../../../types";
import { motion as M } from "framer-motion";
import Options from "../../../components/options";
import Answer from "../showQuestions/answer";

const QuestionPublish = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getQuestionPublishedList"],
    queryFn: getQuestionsPublished,
  });

  if (isError || isLoading) return "jigare najafi";
  console.log(data, "data");

  return (
    <div className="h-screen p-10 flex flex-col gap-4">
      {data?.map((q: IQuestion) => (
        <M.div
          initial={{ scale: 1.02 }}
          animate={{ scale: 1 }}
          key={q.id}
          whileHover={{
            scale: 1.05,
          }}
          className="w-fit gap-5 items-center border border-gray-500 p-4 rounded-lg relative mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-10 text-center">{q.text}</h2>
          <div className=" w-fit mx-auto">
            {q.answers.map((a, index) => (
              <div className="text-base font-semibold my-5 border border-solid rounded-lg px-5 py-2">
                {++index}. {a.text}
              </div>
            ))}
          </div>
        </M.div>
      ))}
    </div>
  );
};

export default QuestionPublish;
