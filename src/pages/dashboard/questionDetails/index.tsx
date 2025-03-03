import { useQuery } from "@tanstack/react-query";
import { getDetailsVoted } from "../../../restApi/user/vote";
import { useParams } from "react-router-dom";
import { getQuestions, getQuestionsById } from "../../../restApi/user/question";
import { motion as M } from "framer-motion";
import { IQuestion } from "../../../types";
import CircleLoading from "../../../components/circleLoading";
import Options from "../../../components/options";
import Answer from "../showQuestions/answer";
import Emty from "../../../components/empty";

export const QuestionDetails = () => {
  const { id } = useParams() as { id: string };

  const detailsVoted = useQuery({
    queryKey: ["getDetailsVoted"],
    queryFn: () => getDetailsVoted(id),
  });
  const question = useQuery({
    queryKey: ["getQuestions"],
    queryFn: () => getQuestionsById(Number(id)),
  });

  if (question.isLoading || detailsVoted.isLoading) return <CircleLoading />;
  if (question.isError || detailsVoted.isError) return <Emty />;
  if (question.data.error || detailsVoted.data) return <Emty />;

  return (
    <div className="max-w-6xl mx-auto min-h-screen px-10">
      <M.div
        initial={{ rotate: 30 }}
        animate={{ rotate: 0 }}
        whileHover={{
          scale: 1.05,
        }}
        className="w-full gap-5 items-center border border-gray-500 p-4 rounded-lg relative"
      >
        <div className="absolute top-2 right-1 w-fit h-fit active:bg-white/30 rounded-full cursor-pointer transition-all duration-200">
          <Options qId={question.data.uid} qUid={question.data.uid} />
        </div>
        <h2 className="text-xl font-semibold my-2 flex items-center justify-between">
          {question.data.text}
        </h2>
        <span className="text-sm">qID:{question.data.id}</span>
        <div className="">
          {question.data.answers.map((a: any, index: number) => {
            const voters = detailsVoted.data
              .filter(
                (d: { username: string; answer: number }) => d.answer === a.id
              )
              .map((d: { username: string; answer: number }) => d.username);

            return (
              <div key={a.id}>
                <Answer answer={a} index={index} />
                {voters.length > 0 && (
                  <div className="flex gap-2">
                    voters:{" "}
                    {voters.map((username: string, i: number) => (
                      <span key={i} className="font-bold">
                        {username}
                        {i < voters.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </M.div>
    </div>
  );
};
