import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    axios.post('https://web-app-api-nine.vercel.app/login', { user, pass })
      .then(result => {
        if (result.data === "Success") {
          toast.success("Login successful!");
          setTimeout(() => {
            window.location.href = 'https://fridaycharm.vercel.app/'
          }, 1000);
        } else {
          toast.error(result.data); // Show the error returned from the server
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("An error occurred during login. Please try again.");
      });
  }

  function newRegister() {
    navigate('/');
  }

  return (
    <div className="h-screen w-full bg-gray-200 flex items-center justify-center">
      <div>
        <h2 className="text-[3em] uppercase text-center relative -top-10">
          Login
        </h2>
        <div className="border-2 border-yellow-300 h-[15em] w-[20em] flex flex-col p-6 gap-2 bg-orange-400">
          <form onSubmit={handleLogin}>
            <h2>Username</h2>
            <input
              type="text"
              className="h-8 w-[15em] border-2 border-black focus:outline-none"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <h2>Password</h2>
            <input
              type="password"
              className="h-8 w-[15em] border-2 border-black focus:outline-none"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
            <button type="submit" className="border-2 border-gray-500 mx-24 p-2 capitalize mt-4 bg-black text-white shadow-xl tracking-wide">
              Login
            </button>
          </form>
          <h2 className="capitalize text-blue-700 underline relative -left-4 cursor-pointer" onClick={newRegister}>
            New Register
          </h2>
        </div>
      </div>
    </div>
  );
}
