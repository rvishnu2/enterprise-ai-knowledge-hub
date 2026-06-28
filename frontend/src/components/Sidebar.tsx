import { MessageSquarePlus, MessageCircle } from "lucide-react";

interface Chat {
    id: number;
    title: string;
}

interface SidebarProps {
    chats: Chat[];
    selectedChatId: number | null;
    onSelectChat: (chatId: number) => void;
    onCreateChat: () => void;
}

function Sidebar({
    chats,
    selectedChatId,
    onSelectChat,
    onCreateChat
}: SidebarProps) {

    return (

        <div className="w-72 bg-zinc-950 text-white flex flex-col border-r border-zinc-800">

            {/* Header */}
            <div className="p-4">

                <button
                    onClick={onCreateChat}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 py-3 font-medium transition"
                >
                    <MessageSquarePlus size={18} />
                    New Chat
                </button>

            </div>

            {/* Divider */}

            <div className="border-b border-zinc-800"></div>

            {/* Chats */}

            <div className="flex-1 overflow-y-auto p-3">

                <h2 className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                    Conversations
                </h2>

                <div className="space-y-2">

                    {chats.map((chat) => (

                        <div
                            key={chat.id}
                            onClick={() => onSelectChat(chat.id)}
                            className={`flex items-center gap-3 rounded-lg px-3 py-3 cursor-pointer transition-all duration-200
                            ${
                                selectedChatId === chat.id
                                    ? "bg-zinc-800"
                                    : "hover:bg-zinc-900"
                            }`}
                        >

                            <MessageCircle
                                size={18}
                                className="text-zinc-400"
                            />

                            <span className="truncate flex-1">
                                {chat.title}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );
}

export default Sidebar;