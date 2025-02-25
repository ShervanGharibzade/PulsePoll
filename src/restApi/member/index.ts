import { apiRoutes } from "../../routes/routes";
import { buildBaseUrl } from "../../utils/buildBaseUrl";

const headers = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
};

const memberSignup = async (email: string) => {
  const res = await fetch(buildBaseUrl(apiRoutes.member.signup), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, is_voted: false }),
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status} - ${res.statusText}`);
  }

  const data = await res.json();
  return data;
};

const memberVoting = async (
  email: string,
  questionId: string | number,
  answerId: number
) => {
  const res = await fetch(buildBaseUrl(apiRoutes.member.voting), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, qUid: questionId, aId: answerId }),
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status} - ${res.statusText}`);
  }
  const data = await res.json();
  return data;
};
const getMember = async () => {
  const res = await fetch(buildBaseUrl(apiRoutes.member.get), {
    method: "POST",
    headers: headers(),
  });
  const data = await res.json();
  return data;
};
export { memberSignup, memberVoting, getMember };
