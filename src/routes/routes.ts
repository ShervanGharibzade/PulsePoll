export const apiRoutes = {
  login: "auth/login",
  signUp: "auth/signup",
  signout: "auth/signout",
  userInfo: "user/info",
  questions: {
    getAll: "questions",
    getById: (id: number) => `questions/${id}`,
    publishQuestionList: "questions/published/questions",
    publishQuestion: (uid: string) => `questions/publish/${uid}`,
    create: "questions/create",
    delete: (id: number) => `questions/${id}`,
    update: (id: number) => `questions/${id}`,
  },
  answers: {
    getAll: (id: number) => `questions/${id}/answers`,
    getById: (id: number) => `questions/answers/${id}`,
    create: (id: number) => `questions/${id}/answers`,
    delete: (queId: number, ansId: number) => `questions/
questions/${queId}/answers/${ansId}`,
    update: (queId: number, ansId: number) => `questions/
questions/${queId}/answers/${ansId}`,
  },
  member: {
    signup: "member/signup",
    voting: "member/voting",
    get: "member/get",
  },
};

export const pageRoutes = {
  login: "/auth/login",
  signUp: "/auth/sign-up",
  dashboard: "/dashboard",
  questionPublishedList: "/dashboard/question/published",
  questionId: "question/:id",
  home: "/",
};
