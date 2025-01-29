import { apiRoutes } from "../../../routes/routes";
import { buildBaseUrl } from "../../../utils/buildBaseUrl";

interface IUserInfo {
  username: string;
  email: string;
  password: string;
}

export const signUp = async (userInfo: IUserInfo) => {
  try {
    const response = await fetch(buildBaseUrl(apiRoutes.signUp), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }

    // Assuming the backend sends back the token in the response body
    const data = await response.json();
    return data; // Should contain { token: string }
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
