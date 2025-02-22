import { useState, useMemo } from "react";
import More from "../../assets/icons/menu-dots.svg?react";
import { IOption } from "../../types";
import Option from "../option";
import { showToast } from "../toast";
import { publishedQuestion } from "../../restApi/user/question";
import { useMutation } from "@tanstack/react-query";

const Options = ({ qId }: { qId: string }) => {
  const [open, setOpen] = useState(false);

  const publishQuestion = useMutation({
    mutationKey: ["publishedQuestion"],
    mutationFn: () => publishedQuestion(qId),
    onSuccess: (res) => {
      const isSuccess = res?.status >= 200 && res?.status < 300;
      const message = isSuccess
        ? res?.data?.message || "Published successfully!"
        : "Operation failed";

      showToast(message, isSuccess ? "success" : "error");
      console.log(res, "Success Response");
    },
    onError: (error) => {
      const errorMessage = error?.message || "An error occurred";
      showToast(errorMessage, "error");
      console.error(error, "Error Response");
    },
  });

  const LIST: IOption[] = useMemo(
    () => [
      { title: "Share" },
      { title: "Edit" },
      { title: "Publish", click: () => publishQuestion.mutate() },
    ],
    [publishQuestion]
  );

  return (
    <div className="relative">
      <More
        className="w-6 h-6 fill-white rotate-90 p-1 cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute grid bg-zinc-600 rounded-md p-2 -right-4 top-8 shadow-md">
          {LIST.map((o, index) => (
            <Option key={index} option={o} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Options;
