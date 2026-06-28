import api from "./client";

const getToken = () => localStorage.getItem("token");

export const getChats = async () => {

    const response = await api.get(
        "/chats",
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const createChat = async (
    title: string
) => {

    const response = await api.post(
        "/chats",
        {
            title
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};