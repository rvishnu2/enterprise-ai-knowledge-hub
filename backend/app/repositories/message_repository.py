from sqlalchemy.orm import Session

from app.models.message import Message


class MessageRepository:

    @staticmethod
    def create(
        db: Session,
        message: Message
    ):
        db.add(message)
        db.commit()
        db.refresh(message)

        return message

    @staticmethod
    def get_by_chat(
        db: Session,
        chat_id: int
    ):
        return (
            db.query(Message)
            .filter(Message.chat_id == chat_id)
            .all()
        )