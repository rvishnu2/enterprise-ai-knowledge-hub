import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

import { useChat } from "../hooks/useChat";

function ChatPage() {

    const {

        chats,

        messages,

        selectedChatId,

        isLoading,

        setSelectedChatId,

        createNewChat,

        sendMessage

    } = useChat();

    return (

        <div className="flex h-screen bg-zinc-950">

            <Sidebar

                chats={chats}

                selectedChatId={selectedChatId}

                onSelectChat={setSelectedChatId}

                onCreateChat={createNewChat}

            />

            <div className="flex flex-col flex-1">

                <ChatWindow

                    messages={messages}

                    isLoading={isLoading}

                />

                <MessageInput

                    onSend={sendMessage}

                />

            </div>

        </div>

    );

}

export default ChatPage;