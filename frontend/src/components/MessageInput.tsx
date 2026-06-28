import { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface MessageInputProps {

    onSend: (content: string) => void;

}

function MessageInput({

    onSend

}: MessageInputProps) {

    const [

        content,

        setContent

    ] = useState("");

    const handleSend = () => {

        if (!content.trim()) {
            return;
        }

        const message = content;

        setContent("");

        onSend(message);

    };

    return (

        <div className="border-t border-zinc-800 bg-zinc-950 p-5">

            <div className="max-w-5xl mx-auto">

                <div className="flex items-end rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3">

                    <textarea

                        rows={1}

                        value={content}

                        placeholder="Ask anything..."

                        onChange={(e) =>
                            setContent(e.target.value)
                        }

                        onKeyDown={(e) => {

                            if (
                                e.key === "Enter" &&
                                !e.shiftKey
                            ) {

                                e.preventDefault();

                                handleSend();

                            }

                        }}

                        className="flex-1 resize-none bg-transparent outline-none text-white placeholder:text-zinc-500"

                    />

                    <button

                        onClick={handleSend}

                        disabled={!content.trim()}

                        className="ml-3 rounded-full bg-emerald-600 p-3 hover:bg-emerald-500 disabled:bg-zinc-700 transition"

                    >

                        <SendHorizontal size={18} />

                    </button>

                </div>

            </div>

        </div>

    );

}

export default MessageInput;