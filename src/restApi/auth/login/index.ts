import { apiRoutes } from "../../../routes/routes";
import { IUserLogin } from "../../../types";
import { buildBaseUrl } from "../../../utils/buildBaseUrl";

export const login = async (userInfo: IUserLogin): Promise<any> => {
  try {
    const response = await fetch(buildBaseUrl(apiRoutes.login), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log in");
    }

    const responseData = await response.json();

    if (!responseData.token) {
      throw new Error("Invalid response from server");
    }

    localStorage.setItem("authToken", responseData.token);

    return responseData;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
