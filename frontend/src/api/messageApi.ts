import type { AskResponse } from "../types/askResponse";
import api from "./client";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getMessages = async (
  chatId: number
) => {

  const response = await api.get(
    `/chats/${chatId}/messages`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};

export async function askAI(
    chatId: number,
    content: string
): Promise<AskResponse>{

  const response = await api.post(
    `/chats/${chatId}/ask`,
    {
      content
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};