import { apiRoutes } from "../../../routes/routes";
import { buildBaseUrl } from "../../../utils/buildBaseUrl";

export const signOut = async (token: string): Promise<void> => {
  try {
    const response = await fetch(buildBaseUrl(apiRoutes.signout), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Sign out failed");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      localStorage.removeItem("authToken");
      const data = await response.json();
      return data;
    } else {
      localStorage.removeItem("authToken");
    }
  } catch (error) {
    console.error("Sign out error:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
