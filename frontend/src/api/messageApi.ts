import api from "./client";

export const getMessages =
  async (
    chatId: number
  ) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await api.get(
        `/chats/${chatId}/messages`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};

export const askAI = async (
  chatId: number,
  content: string
) => {

  const token =
    localStorage.getItem("token");

  const response =
    await api.post(
      `/chats/${chatId}/ask`,
      {
        content
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
};