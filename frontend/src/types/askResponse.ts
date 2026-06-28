import type { Message } from "./message";

export interface AskResponse {

    user_message: Message;

    assistant_message: Message;

    chat_title: string;

}