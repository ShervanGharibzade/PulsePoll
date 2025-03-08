import { pageRoutes } from "../routes/routes";

const isInValidToken = (message: string) => {
  if (message.includes("Invalid token") || message.includes("expired token")) {
    localStorage.removeItem("authToken");
    window.location.href = pageRoutes.login;
  }
};

export default isInValidToken;
