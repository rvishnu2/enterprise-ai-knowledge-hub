import { useEffect, useState } from "react";

import { getChats } from "../api/chatApi";


interface SidebarProps {
    selectedChatId: number | null;
    onSelectChat: (
        chatId: number
    ) => void;
}


function Sidebar({ selectedChatId,
    onSelectChat
}: SidebarProps) {

    const [chats, setChats] =
        useState<any[]>([]);

    useEffect(() => {

        loadChats();

    }, []);

    const loadChats = async () => {

        try {

            const data =
                await getChats();

            setChats(data);

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div className="w-64 bg-gray-900 text-white p-4">

            <button
                className="w-full bg-gray-700 p-2 rounded"
            >
                + New Chat
            </button>

            <div className="mt-4 space-y-2">

                {
                    chats.map(
                        (chat) => (

                            <div
                                key={chat.id}
                                onClick={() =>
                                    onSelectChat(chat.id)
                                }
                                className={`
    p-2 rounded cursor-pointer
    ${selectedChatId === chat.id
                                        ? "bg-gray-700"
                                        : "bg-gray-800"
                                    }
  `}
                            >
                                {chat.title}
                            </div>
                        )
                    )
                }

            </div>

        </div>
    );
}

export default Sidebar;

