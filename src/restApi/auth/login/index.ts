import { apiRoutes } from "../../../routes/routes";
import { buildBaseUrl } from "../../../utils/buildBaseUrl";

interface IUserInfo {
  username: string;
  password: string;
}

export const login = async (userInfo: IUserInfo): Promise<void> => {
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
      throw new Error("Failed to log in");
    }

    const responseData = await response.json();
    console.log("Logged in successfully:", responseData);

    localStorage.setItem("authToken", responseData.token);
  } catch (error) {
    console.error("Error:", error);
  }
};
