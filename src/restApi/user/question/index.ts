import { apiRoutes } from "../../../routes/routes";
import { ICreateQuestion, IQuestion } from "../../../types";
import { buildBaseUrl } from "../../../utils/buildBaseUrl";

const headers = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
};

const getQuestions = async (): Promise<IQuestion[]> => {
  const response = await fetch(buildBaseUrl(apiRoutes.questions.getAll), {
    method: "GET",
    headers: headers(),
  });

  return await response.json();
};

const getQuestionsById = async (id: number) => {
  const response = await fetch(buildBaseUrl(apiRoutes.questions.getById(id)), {
    method: "GET",
    headers: headers(),
  });
  return response.json();
};

const publishedQuestion = async (uid: string) => {
  const response = await fetch(
    buildBaseUrl(apiRoutes.questions.publishQuestion(uid)),
    {
      method: "POST",
      headers: headers(),
    }
  );
  return await response.json();
};

const getQuestionsPublished = async (): Promise<IQuestion[]> => {
  const response = await fetch(
    buildBaseUrl(apiRoutes.questions.publishQuestionList),
    {
      method: "GET",
    }
  );
  return await response.json();
};

const createQuestions = async (question: ICreateQuestion) => {
  try {
    const response = await fetch(buildBaseUrl(apiRoutes.questions.create), {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(question),
    });

    // Check if the response was successful
    if (!response.ok) {
      // Log the error details
      const errorDetails = await response.text();
      console.error("Error response:", errorDetails);
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Parse JSON only if the response is ok
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during question creation:", error);
    throw error; // Rethrow or handle the error accordingly
  }
};

const updateQuestions = async (id: number, text: string) => {
  const response = await fetch(buildBaseUrl(apiRoutes.questions.update(id)), {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ text }),
  });
  return response.json();
};

const deleteQuestions = async (id: number) => {
  const response = await fetch(buildBaseUrl(apiRoutes.questions.delete(id)), {
    method: "DELETE",
    headers: headers(),
  });
  return response.json();
};

export {
  getQuestions,
  getQuestionsById,
  createQuestions,
  updateQuestions,
  deleteQuestions,
  publishedQuestion,
  getQuestionsPublished,
};
