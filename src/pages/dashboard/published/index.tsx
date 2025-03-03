import { IQuestion } from "../../../types";
import { motion as M } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQuestionsPublished } from "../../../restApi/user/question";
import CircleLoading from "../../../components/circleLoading";
import { showToast } from "../../../components/toast";
import { submitVote } from "../../../restApi/user/vote";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Menu from "../../home/menu";

const QuestionPublish = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getQuestionsPublished"],
    queryFn: getQuestionsPublished,
  });

  const token = localStorage.getItem("authToken");

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [user, setUser] = useState<number>(0);
  const canVote = () => {
    if (!token) {
      showToast("your not login", "error");
      return false;
    }
    return true;
  };

  const voteSubmit = useMutation({
    mutationFn: () => submitVote(answer, user, question),
    onSuccess: (res) => {
      showToast(res.message ? res.message : res.error.message, "error");
      refetch();
    },
    onError: (error) => {
      showToast(error.message, "error");
      console.error("Error submitting vote:", error);
    },
  });

  if (isError) return "error";
  if (isLoading) return <CircleLoading />;

  return (
    <div className="max-w-[1200px] mx-auto min-h-screen px-10">
      <Menu />
      <div className="h-screen p-10 flex flex-col gap-4">
        {data?.map((q: IQuestion) => (
          <M.div
            initial={{ scale: 1.02 }}
            animate={{ scale: 1 }}
            key={q.id}
            whileHover={{ scale: 1.05 }}
            className="w-fit gap-5 items-center border border-gray-500 p-4 rounded-lg relative mx-auto"
          >
            <h2 className="text-2xl font-semibold mb-10 text-center">
              {q.text}
            </h2>
            <div className=" min-w-[300px] w-fit mx-auto">
              {q.answers.map((a, index) => (
                <div
                  key={a.id}
                  className="text-base font-semibold my-5 border border-solid rounded-lg px-5 py-2 cursor-pointer"
                  onClick={() => {
                    setAnswer(String(a.id));
                    setQuestion(String(q.id));
                    setUser(q.userId);
                    if (canVote()) {
                      voteSubmit.mutate();
                    }
                    return;
                  }}
                >
                  {index + 1}. {a.text} {a.total_vote}
                </div>
              ))}
            </div>
          </M.div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuestionPublish;
