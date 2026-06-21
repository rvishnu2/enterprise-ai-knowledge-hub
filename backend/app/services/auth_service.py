from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.core.security import hash_password


class AuthService:

    @staticmethod
    def register_user(
        db: Session,
        request: UserCreate
    ):

        existing_user = (
            UserRepository.get_by_email(
                db,
                request.email
            )
        )

        if existing_user:
            raise ValueError(
                "Email already exists"
            )

        user = User(
            email=request.email,
            full_name=request.full_name,
            password_hash=hash_password(
                request.password
            )
        )

        return UserRepository.create(
            db,
            user
        )