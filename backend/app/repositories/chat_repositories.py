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