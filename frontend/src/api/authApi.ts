import api from "./client";

export const login = (
  email: string,
  password: string
) => {
  return api.post(
    "/auth/login",
    {
      email,
      password
    }
  );
};