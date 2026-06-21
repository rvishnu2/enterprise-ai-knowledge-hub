from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.user import (
    UserCreate
)

from app.schemas.auth import (
    LoginRequest
)

from app.services.auth_service import (
    AuthService
)

from app.core.dependencies import (
    get_current_user
)

from app.models.user import User

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
            "email": user.email,
            "message": "User registered successfully"
        }

    except ValueError as ex:

        raise HTTPException(
            status_code=400,
            detail=str(ex)
        )


@router.post("/login")
def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):

    try:

        token = AuthService.login_user(
            db,
            request.email,
            request.password
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    except ValueError as ex:

        raise HTTPException(
            status_code=401,
            detail=str(ex)
        )

@router.get("/me")
def get_me(
    current_user: User = Depends(
        get_current_user
    )
):

    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name
    }