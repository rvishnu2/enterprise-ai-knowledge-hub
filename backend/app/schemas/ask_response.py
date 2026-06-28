from pydantic import BaseModel

from app.schemas.message import MessageResponse


class AskResponse(BaseModel):

    user_message: MessageResponse

    assistant_message: MessageResponse

    chat_title: str