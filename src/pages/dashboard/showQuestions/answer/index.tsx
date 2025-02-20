import Check from "../../../../assets/icons/check.svg?react";
import { IAnswer } from "../../../../types";

const Answer = ({ answer, index }: { answer: IAnswer; index: number }) => {
  return (
    <div className="flex items-center gap-3 my-2">
      <span className="min-w-10">
        <h3 className="text-base font-medium">
          {++index}. {answer.text}
        </h3>
      </span>
      <span className="min-w-10">
        vote: {answer.votePortion > 0 && answer.votePortion}
      </span>
      {answer.isCurrect && (
        <Check className="w-6 h-6 bg-green-700 p-1 fill-white rounded-full" />
      )}
    </div>
  );
};

export default Answer;
