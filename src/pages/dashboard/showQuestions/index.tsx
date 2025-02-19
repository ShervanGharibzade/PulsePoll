import { getQuestions } from "../../../restApi/user/question";
import Check from "../../../assets/icons/check.svg?react";
import { useQuery } from "@tanstack/react-query";
import CircleLoading from "../../../components/circleLoading";
import { motion as M } from "framer-motion";
import Options from "../../../components/options";

interface IAnswer {
  id: number;
  text: string;
  isCurrect: boolean;
  votePortion: number;
}

export interface IQuestion {
  id: number;
  text: string;
  answers: IAnswer[];
}

const LIST = [{ title: "Share" }, { title: "Edit" }];

const QuestionsList = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["get-question"],
    queryFn: getQuestions,
  });
  console.log(data);
  if (isError) return "error";
  if (isLoading) return <CircleLoading />;

  return (
    <div className="grid grid-cols-3 py-20 gap-4">
      {data?.map((q) => (
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
            <Options list={LIST} />
          </div>
          <h2 className="text-xl font-semibold my-2 flex items-center justify-between">
            {q.text}
          </h2>
          <span className="text-sm">qID:{q.id}</span>
          <div className="">
            {q.answers.map((a, index) => (
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
        </M.div>
      ))}
    </div>
  );
};

export default QuestionsList;
