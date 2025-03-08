import { apiRoutes } from "../../routes/routes";
import { buildBaseUrl } from "../../utils/buildBaseUrl";

export const userInfo = async (
  token: string | null
): Promise<{ username: string; email: string; userId: number } | null> => {
  if (!token) {
    console.error("Token is required");
    return null;
  }

  try {
    const response = await fetch(buildBaseUrl(apiRoutes.userInfo), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user info");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching user info:", error.message || error);
    throw error;
  }
};
