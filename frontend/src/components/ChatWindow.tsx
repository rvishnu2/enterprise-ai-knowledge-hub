import { useEffect, useState } from "react";

import { getMessages } from "../api/messageApi";

interface Message {
  id: number;
  content: string;
  role: string;
  chat_id: number;
  created_at: string;
}

interface ChatWindowProps {
  chatId: number | null;
}

function ChatWindow({
  chatId,
}: ChatWindowProps) {

  const [messages,
    setMessages] =
      useState<Message[]>([]);

  useEffect(() => {

    if (!chatId) {
      return;
    }

    loadMessages();

  }, [chatId]);

  const loadMessages =
    async () => {

      try {

        const data =
          await getMessages(
            chatId!
          );

        setMessages(data);

      } catch (error) {

        console.error(error);
      }
    };

  if (!chatId) {

    return (

      <div className="flex-1 flex items-center justify-center">

        Select a chat

      </div>
    );
  }

  return (

    <div className="flex-1 overflow-y-auto p-6">

      {
        messages.map(
          (message) => (

            <div
              key={message.id}
              className={`mb-4 ${
                message.role === "user"
                  ? "text-right"
                  : "text-left"
              }`}
            >

              <div
                className={`inline-block p-3 rounded-lg max-w-[70%] ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >

                {message.content}

              </div>

            </div>
          )
        )
      }

    </div>
  );
}

export default ChatWindow;