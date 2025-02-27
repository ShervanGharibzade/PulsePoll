import { IQuestion } from "../../../types";
import { motion as M } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQuestionsPublished } from "../../../restApi/user/question";
import CircleLoading from "../../../components/circleLoading";
import { showToast } from "../../../components/toast";
import { submitVote } from "../../../restApi/user/vote";
import { useState } from "react";

const QuestionPublish = (questionId: string, answerId: number) => {
  const { data, isError, isLoading } = useQuery({
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
    onSuccess: () => {
      console.log("Vote submitted successfully!");
    },
    onError: (error) => {
      console.error("Error submitting vote:", error);
    },
  });

  if (isError) return "error";
  if (isLoading) return <CircleLoading />;

  return (
    <div className="h-screen p-10 flex flex-col gap-4">
      {data?.map((q: IQuestion) => (
        <M.div
          initial={{ scale: 1.02 }}
          animate={{ scale: 1 }}
          key={q.id}
          whileHover={{ scale: 1.05 }}
          className="w-fit gap-5 items-center border border-gray-500 p-4 rounded-lg relative mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-10 text-center">{q.text}</h2>
          <div className="w-fit mx-auto">
            {q.answers.map((a, index) => (
              <div
                key={a.id}
                className="text-base font-semibold my-5 border border-solid rounded-lg px-5 py-2 cursor-pointer"
                onClick={() => {
                  setAnswer(String(a.id));
                  setQuestion(String(q.id));
                  setUser(q.userId);
                  if (canVote()) {
                    console.log(a.id, q.id, q.userId, "lolo");

                    // voteSubmit.mutate();
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
  );
};

export default QuestionPublish;
