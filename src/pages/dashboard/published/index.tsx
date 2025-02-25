import { useMutation, useQuery } from "@tanstack/react-query";
import { getQuestionsPublished } from "../../../restApi/user/question";
import { IQuestion } from "../../../types";
import { motion as M } from "framer-motion";
import { useState, useEffect } from "react";
import Input from "../../../components/input";
import Button from "../../../components/button";
import Check from "../../../assets/icons/close-icon.svg?react";
import { getMember, memberSignup, memberVoting } from "../../../restApi/member";
import { showToast } from "../../../components/toast";

const QuestionPublish = () => {
  // Queries for questions and member data
  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    isError: isErrorQuestions,
  } = useQuery({
    queryKey: ["getQuestionPublishedList"],
    queryFn: getQuestionsPublished,
  });

  const { data: memberData } = useQuery({
    queryKey: ["getMember"],
    queryFn: getMember,
  });

  // State management
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(memberData?.email || "");
  console.log(memberData);

  useEffect(() => {
    if (memberData?.email) {
      setEmail(memberData.email); // Initialize with the member's email if logged in
    }
  }, [memberData]);

  // Check if the user is logged in
  const checkExistToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) return false;
    setShowModal(true);
    return true;
  };

  // Signup mutation
  const signupMutation = useMutation({
    mutationKey: ["memberSignup"],
    mutationFn: () => memberSignup(email),
    onSuccess: (res) => {
      localStorage.setItem("authToken", res.member.token);
      setEmail(res.member.email); // Set email after successful login
      showToast("You are logged in successfully", "success");
      setShowModal(false);
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  // Voting mutation
  const votingMutation = useMutation({
    mutationKey: ["memberVoting"],
    mutationFn: ({
      questionId,
      answerId,
    }: {
      questionId: string;
      answerId: number;
    }) => memberVoting(email, questionId, answerId),
    onSuccess: () => {
      showToast("Voting successfully done", "success");
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const canMemberVoting = (questionId: string, answerId: number) => {
    if (checkExistToken()) return;
    votingMutation.mutate({ questionId, answerId });
  };

  if (isLoadingQuestions || isErrorQuestions) return "Loading...";

  return (
    <div className="h-screen p-10 flex flex-col gap-4">
      {questionsData?.map((q: IQuestion) => (
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
                onClick={() => canMemberVoting(q.uid, a.id)}
              >
                {index + 1}. {a.text} {a.votePortion}
              </div>
            ))}
          </div>
        </M.div>
      ))}

      {showModal && (
        <div className="absolute top-0 left-0 bg-black/40 w-full h-full flex flex-col items-center justify-center">
          <div className="max-w-[400px] bg-zinc-600 rounded-lg flex flex-col gap-4 p-5">
            <div className="flex items-center">
              <div className="text-center flex-1">You are not logged in</div>
              <Check
                className="w-5 fill-white cursor-pointer"
                onClick={() => setShowModal(false)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                name="email"
                isDisabled={signupMutation.isPending || !!email}
                value={email}
                className="bg-zinc-800 text-white"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <Button
                title="Submit"
                onClick={() => signupMutation.mutate()}
                disabled={!email || signupMutation.isPending}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPublish;
