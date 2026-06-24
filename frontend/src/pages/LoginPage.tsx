import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/client";
import { login } from "../api/authApi";

console.log(api);

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

const response = await login(
  email,
  password
);

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/chat");

    } catch (error) {

      console.error(error);

      alert("Login failed");
    }
  };

  return (

    <div className="h-screen flex justify-center items-center">

      <div className="flex flex-col gap-4 w-80">

        <input
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          placeholder="Password"
          type="password"
          className="border p-2"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white p-2"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default LoginPage;