import api from "./client";

export const getChats = async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await api.get(
      "/chats",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
};