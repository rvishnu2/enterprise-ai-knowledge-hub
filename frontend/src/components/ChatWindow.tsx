import { Bot, User } from "lucide-react";
import { useEffect, useRef } from "react";

interface Message {
    id: number;
    content: string;
    role: string;
    chat_id: number;
    created_at: string;
}

interface ChatWindowProps {
    messages: Message[];
    isLoading: boolean;
}

function ChatWindow({
    messages,
    isLoading
}: ChatWindowProps) {
    const bottomRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, isLoading]);

    if (messages.length === 0 && !isLoading) {

        return (

            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">

                <Bot
                    size={64}
                    className="mb-6 text-zinc-600"
                />

                <h2 className="text-2xl font-semibold text-white">
                    Welcome!
                </h2>

                <p className="mt-2 text-zinc-400">
                    Start a new conversation with your AI assistant.
                </p>

            </div>

        );

    }

    return (

        <div className="flex-1 overflow-y-auto bg-zinc-950 px-8 py-6">

            <div className="max-w-5xl mx-auto space-y-6">

                {

                    messages.map((message) => (

                        <div
                            key={message.id}
                            className={`flex gap-4 ${message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >

                            {

                                message.role !== "user" && (

                                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">

                                        <Bot size={20} />

                                    </div>

                                )

                            }

                            <div
                                className={`max-w-[75%] rounded-2xl px-5 py-4 whitespace-pre-wrap shadow-md ${message.role === "user"
                                    ? "bg-blue-600 text-white"
                                    : "bg-zinc-800 text-zinc-100"
                                    }`}
                            >

                                <div className="text-xs font-semibold mb-2 opacity-70">

                                    {
                                        message.role === "user"
                                            ? "You"
                                            : "Assistant"
                                    }

                                </div>

                                {message.content}

                            </div>

                            {

                                message.role === "user" && (

                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">

                                        <User size={20} />

                                    </div>

                                )

                            }

                        </div>

                    ))



                }
                {
                    isLoading && (

                        <div className="flex gap-4">

                            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">

                                <Bot size={20} />

                            </div>

                            <div className="bg-zinc-800 rounded-2xl px-5 py-4">

                                <div className="text-xs mb-2 opacity-70">

                                    Assistant

                                </div>

                                <div className="flex gap-2">

                                    <span className="animate-bounce">•</span>

                                    <span
                                        className="animate-bounce"
                                        style={{
                                            animationDelay: ".2s"
                                        }}
                                    >
                                        •
                                    </span>

                                    <span
                                        className="animate-bounce"
                                        style={{
                                            animationDelay: ".4s"
                                        }}
                                    >
                                        •
                                    </span>

                                </div>

                            </div>

                        </div>

                    )
                }
                <div ref={bottomRef}></div>

            </div>

        </div>

    );

}

export default ChatWindow;