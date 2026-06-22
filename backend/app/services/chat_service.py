from sqlalchemy.orm import Session

from app.models.chat import Chat
from app.repositories.chat_repositories import ChatRepository


class ChatService:

    @staticmethod
    def create_chat(
        db: Session,
        user_id: int,
        title: str
    ):

        chat = Chat(
            user_id=user_id,
            title=title
        )

        return ChatRepository.create(
            db,
            chat
        )