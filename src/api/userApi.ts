import { UpdateUserPayload, UpdateUserResponse } from "@/types/user.type";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BACKEND_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in environment variables"
  );
}

// export const getUser = async (id: string, token: string): Promise<UserResponse> => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/users/me/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to fetch user data");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error in getUser:", error);
//     throw error;
//   }
// };

export const updateUser = async (id: string, payload: UpdateUserPayload): Promise<UpdateUserResponse> => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("jotoken") : null;

        const response = await fetch(`${BACKEND_URL}/user/me/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
        throw new Error(data.message || "Failed to update user data");
        }
    
        return data;
    } catch (error) {
        console.error("Error in updateUser:", error);
        throw error;
    }
}
