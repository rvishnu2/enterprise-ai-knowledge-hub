


from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.core.dependencies import get_current_user

from app.models.user import User

from app.schemas.chat import ChatCreate, ChatUpdate

from app.services.chat_service import ChatService

from app.schemas.message import MessageCreate
from app.services.message_service import MessageService

from app.repositories.message_repository import MessageRepository
from app.services.ai_service import AIService
from app.repositories.chat_repositories import ChatRepository


router = APIRouter(
    prefix="/chats",
    tags=["Chats"]
)


@router.post("")
def create_chat(
    request: ChatCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    chat = ChatService.create_chat(
        db,
        current_user.id,
        request.title
    )

    return {
        "id": chat.id,
        "title": chat.title
    }

@router.post("/{chat_id}/messages")
def create_message(
    chat_id: int,
    request: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    message = MessageService.create_user_message(
        db,
        chat_id,
        request.content
    )

    return {
        "id": message.id,
        "role": message.role,
        "content": message.content
    }

@router.get("/{chat_id}/messages")
def get_messages(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    messages = (
        MessageRepository.get_by_chat(
            db,
            chat_id
        )
    )

    return messages

@router.post("/{chat_id}/ask")
def ask_ai(
    chat_id: int,
    request: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    MessageService.create_user_message(
        db,
        chat_id,
        request.content
    )

    history = MessageRepository.get_by_chat(
        db,
        chat_id
    )

    messages = []

    for message in history:

        messages.append(
            {
                "role": message.role,
                "content": message.content
            }
        )

    ai_response = AIService.generate_response(
        messages
    )

    MessageService.create_assistant_message(
        db,
        chat_id,
        ai_response
    )

    return {
        "response": ai_response
    }

@router.get("")
def get_chats(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    chats = ChatRepository.get_by_user(
        db,
        current_user.id
    )

    return chats

@router.get("/{chat_id}/messages")
def get_messages(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    chat = ChatRepository.get_by_id(
        db,
        chat_id
    )

    if not chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    if chat.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return MessageRepository.get_by_chat(
        db,
        chat_id
    )

@router.put("/{chat_id}")
def rename_chat(
    chat_id: int,
    request: ChatUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    chat = ChatRepository.get_by_id(
        db,
        chat_id
    )

    if not chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    if chat.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    chat.title = request.title

    updated_chat = ChatRepository.update(
        db,
        chat
    )

    return updated_chat

@router.delete("/{chat_id}")
def delete_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    chat = ChatRepository.get_by_id(
        db,
        chat_id
    )

    if not chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    if chat.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    ChatRepository.delete(
        db,
        chat
    )

    return {
        "message": "Chat deleted successfully"
    }