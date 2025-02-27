import { apiRoutes } from "../../../routes/routes";
import { buildBaseUrl } from "../../../utils/buildBaseUrl";

const headers = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
};

const submitVote = async (aId: string, userId: number, qId: string) => {
  try {
    const res = await fetch(buildBaseUrl(apiRoutes.vote.submit(qId)), {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        aId,
        userId,
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    console.log("Vote submitted successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to submit vote:", error);
    throw error;
  }
};

export { submitVote };
