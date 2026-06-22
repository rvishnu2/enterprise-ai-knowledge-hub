from sqlalchemy.orm import Session

from app.models.message import Message
from app.repositories.message_repository import MessageRepository


class MessageService:

    @staticmethod
    def create_user_message(
        db: Session,
        chat_id: int,
        content: str
    ):

        message = Message(
            chat_id=chat_id,
            role="user",
            content=content
        )

        return MessageRepository.create(
            db,
            message
        )

    @staticmethod
    def create_assistant_message(
        db: Session,
        chat_id: int,
        content: str
    ):

        message = Message(
            chat_id=chat_id,
            role="assistant",
            content=content
        )

        return MessageRepository.create(
            db,
            message
        )