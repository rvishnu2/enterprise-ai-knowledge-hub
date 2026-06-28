import { useEffect, useState } from "react";

import type { Chat } from "../types/chat";
import type { Message } from "../types/message";

import {
    getChats,
    createChat
} from "../api/chatApi";

import {
    getMessages,
    askAI
} from "../api/messageApi";

export function useChat() {

    const [
        chats,
        setChats
    ] = useState<Chat[]>([]);

    const [
        selectedChatId,
        setSelectedChatId
    ] = useState<number | null>(null);

    const [
        messages,
        setMessages
    ] = useState<Message[]>([]);

    const [
        isLoading,
        setIsLoading
    ] = useState(false);

    useEffect(() => {

        loadChats();

    }, []);

    useEffect(() => {

        if (selectedChatId) {

            loadMessages(selectedChatId);

        } else {

            setMessages([]);

        }

    }, [selectedChatId]);

    const loadChats = async () => {

        try {

            const data = await getChats();

            setChats(data);

            if (
                data.length > 0 &&
                selectedChatId === null
            ) {
                setSelectedChatId(data[0].id);
            }

        } catch (error) {

            console.error(error);

        }

    };

    const loadMessages = async (
        chatId: number
    ) => {

        try {

            const data =
                await getMessages(chatId);

            setMessages(data);

        } catch (error) {

            console.error(error);

        }

    };

    const createNewChat = async () => {

        try {

            const chat =
                await createChat("New Chat");

            await loadChats();

            setSelectedChatId(chat.id);

        } catch (error) {

            console.error(error);

        }

    };
    const sendMessage = async (
        content: string
    ) => {

        if (!content.trim()) {
            return;
        }

        try {

            let chatId = selectedChatId;

            if (!chatId) {

                const chat =
                    await createChat("New Chat");

                chatId = chat.id;

                setSelectedChatId(chatId);

                setChats(prev => [
                    chat,
                    ...prev
                ]);

            }

            setIsLoading(true);

            const result = await askAI(
                chatId,
                content
            );

            setMessages(prev => [

                ...prev,

                result.user_message,

                result.assistant_message

            ]);

            setChats(prev =>

                prev.map(chat =>

                    chat.id === chatId
                        ? {
                            ...chat,
                            title: result.chat_title
                        }
                        : chat

                )

            );

        } catch (error) {

            console.error(error);

        } finally {

            setIsLoading(false);

        }

    };


    return {

        chats,

        messages,

        selectedChatId,

        isLoading,

        setSelectedChatId,

        createNewChat,

        sendMessage

    };

}