from sqlalchemy.orm import Session

from app.models.chat import Chat


class ChatRepository:

    @staticmethod
    def create(
        db: Session,
        chat: Chat
    ):
        db.add(chat)
        db.commit()
        db.refresh(chat)

        return chat

    @staticmethod
    def get_by_user(
        db: Session,
        user_id: int
    ):
        return (
            db.query(Chat)
            .filter(Chat.user_id == user_id)
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        chat_id: int
    ):
        return (
            db.query(Chat)
            .filter(Chat.id == chat_id)
            .first()
        )

    @staticmethod
    def delete(
        db: Session,
        chat: Chat
    ):
        db.delete(chat)
        db.commit()

    @staticmethod
    def update(
        db: Session,
        chat: Chat
    ):
        db.commit()
        db.refresh(chat)

        return chat
