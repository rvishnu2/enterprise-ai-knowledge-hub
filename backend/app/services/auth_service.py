from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate

from app.core.security import (
    hash_password,
    verify_password
)

from app.core.jwt import create_access_token


class AuthService:

    @staticmethod
    def register_user(
        db: Session,
        request: UserCreate
    ):

        existing_user = UserRepository.get_by_email(
            db,
            request.email
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

    @staticmethod
    def login_user(
        db: Session,
        email: str,
        password: str
    ):

        print("=" * 50)
        print("LOGIN ATTEMPT")
        print("EMAIL:", email)

        user = UserRepository.get_by_email(
            db,
            email
        )

        print("USER:", user)

        if not user:
            print("USER NOT FOUND")
            raise ValueError(
                "Invalid credentials"
            )

        print("HASH:", user.password_hash)

        is_valid = verify_password(
            password,
            user.password_hash
        )

        print("VERIFY:", is_valid)

        if not is_valid:
            print("PASSWORD MISMATCH")
            raise ValueError(
                "Invalid credentials"
            )

        access_token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email
            }
        )

        print("TOKEN GENERATED")
        print("=" * 50)

        return access_token