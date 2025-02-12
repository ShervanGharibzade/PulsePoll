import { IAnswer } from "../../../pages/home/questions";
import { apiRoutes } from "../../../routes/routes";
import { buildBaseUrl } from "../../../utils/buildBaseUrl";

const headers = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
};

const getAnswersByQuestionId = async (questionId: number) => {
  const response = await fetch(
    buildBaseUrl(apiRoutes.answers.getAll(questionId)),
    {
      method: "GET",
    }
  );
  return response.json();
};

const getAnswerById = async (id: number) => {
  const response = await fetch(buildBaseUrl(apiRoutes.answers.getById(id)), {
    method: "GET",
  });
  return response.json();
};

const addAnswer = async (id: number, answers: IAnswer[]) => {
  const response = await fetch(buildBaseUrl(apiRoutes.answers.create(id)), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(answers),
  });
  return response.json();
};

const deleteAnswer = async (questionId: number, answerId: number) => {
  const response = await fetch(
    buildBaseUrl(apiRoutes.answers.delete(questionId, answerId)),
    {
      method: "DELETE",
      headers: headers(),
    }
  );
  return response.json();
};

const editAnswer = async (
  questionId: number,
  answerId: number,
  text: string,
  isCorrect: boolean,
  votePortion = 0
) => {
  const response = await fetch(
    buildBaseUrl(apiRoutes.answers.update(questionId, answerId)),
    {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ text, isCorrect, votePortion }),
    }
  );
  return response.json();
};

export {
  getAnswersByQuestionId,
  getAnswerById,
  addAnswer,
  deleteAnswer,
  editAnswer,
};
