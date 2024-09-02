import { Link } from "react-router-dom";
import photo from "../assets/ping_pong.png";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isLoggedIn, userEmail, login, logout } = useAuth();

  return (
    <header className="bg-blue-500 text-white w-full p-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex-shrink-0 mr-4 justify-center">
          <img src={photo} alt="Table Tennis Logo" width={50} height={50} />
        </div>
        <Link to="/">
          <h1 className="text-2xl font-bold text-center">
            Table Tennis Score Tracker
          </h1>
        </Link>
        <div>
          {isLoggedIn ? (
            <button onClick={() => logout()}>Log out</button>
          ) : (
            <button onClick={() => login()}>Sign in</button>
          )}
        </div>
      </div>
    </header>
  );
}
