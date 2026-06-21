from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.schemas.user import UserCreate
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    request: UserCreate,
    db: Session = Depends(get_db)
):

    try:
        user = AuthService.register_user(
            db,
            request
        )

        return {
            "id": user.id,
            "email": user.email
        }

    except ValueError as ex:
        raise HTTPException(
            status_code=400,
            detail=str(ex)
        )