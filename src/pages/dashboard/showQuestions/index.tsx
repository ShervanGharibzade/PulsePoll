import { useEffect, useState } from "react";
import { getQuestions } from "../../../restApi/user/question";

const QuestionsList = () => {
  const [questions, setQuestions] = useState<any | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tt = await getQuestions();
        console.log(tt);

        setQuestions(tt);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);
  console.log(questions);

  return (
    <div className="flex flex-wrap gap-5">
      {questions?.map((q, index) => (
        <div key={q.id} className="my-5">
          <h2 className="text-xl font-semibold">
            {++index}.{q.text}
          </h2>
          <div className="grid">
            {q.answers.map((a, index) => (
              <div key={a.id}>
                {++index}.{a.text}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
