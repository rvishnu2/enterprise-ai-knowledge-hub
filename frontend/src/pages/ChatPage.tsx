import { useState } from "react";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWIndow";
import MessageInput from "../components/MessageInput";

function ChatPage() {

  const [selectedChatId,
    setSelectedChatId] =
      useState<number | null>(null);

  return (

    <div className="h-screen flex">

      <Sidebar
        selectedChatId={
          selectedChatId
        }
        onSelectChat={
          setSelectedChatId
        }
      />

      <div className="flex flex-col flex-1">

        <ChatWindow
          chatId={
            selectedChatId
          }
        />

        <MessageInput
          chatId={
            selectedChatId
          }
        />

      </div>

    </div>
  );
}

export default ChatPage;