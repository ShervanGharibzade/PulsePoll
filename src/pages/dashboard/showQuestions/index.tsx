import { getQuestions } from "../../../restApi/user/question";
import { useQuery } from "@tanstack/react-query";
import CircleLoading from "../../../components/circleLoading";
import { motion as M } from "framer-motion";
import Options from "../../../components/options";
import Answer from "./answer";
import { IQuestion } from "../../../types";
import Emty from "../../../components/empty";

const QuestionsList = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["get-question"],
    queryFn: getQuestions,
  });

  if (isError) return <Emty />;
  if (isLoading) return <CircleLoading />;

  return (
    <div className="grid grid-cols-3 py-20 gap-4 p-10">
      {data?.map((q: IQuestion) => (
        <M.div
          initial={{ rotate: 30 }}
          animate={{ rotate: 0 }}
          key={q.id}
          whileHover={{
            scale: 1.05,
          }}
          className="w-full gap-5 items-center border border-gray-500 p-4 rounded-lg relative"
        >
          <div className="absolute top-2 right-1 w-fit h-fit active:bg-white/30 rounded-full cursor-pointer transition-all duration-200">
            <Options qUid={q.uid} qId={q.id} />
          </div>
          <h2 className="text-xl font-semibold my-2 flex items-center justify-between">
            {q.text}
          </h2>
          <span className="text-sm">qID:{q.id}</span>
          <div className="">
            {q.answers.map((a, index) => (
              <Answer answer={a} index={index} />
            ))}
          </div>
        </M.div>
      ))}
    </div>
  );
};

export default QuestionsList;
