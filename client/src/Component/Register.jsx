import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function registerUser(e) {
    e.preventDefault();
    
    axios.post("https://web-app-drab-three.vercel.app/register", { name, user, email, pass })
      .then(result => {
        console.log(result);
        alert('Registration successful');
        navigate('/login');
      })
      .catch(err => {
        console.error('Error registering:', err);

        if (err.response) {
          const errorMessage = err.response.data.error || 'Registration failed. Please try again.';
          alert(errorMessage);
        } else if (err.request) {
          alert('No response from the server. Please check your network connection.');
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      });
  }

  return (
    <div className="h-screen w-full bg-gray-200 flex items-center justify-center">
      <div>
        <h2 className="text-[3em] uppercase text-center relative -top-10">
          Register
        </h2>
        <div className="border-2 border-green-300 h-[25em] w-[20em] flex flex-col p-6 gap-2 bg-slate-300">
          <form onSubmit={registerUser}>
            <h2>Full name</h2>
            <input
              type="text"
              className="h-8 w-[15em] border-2 border-black focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <h2>Username</h2>
            <input
              type="text"
              className="h-8 w-[15em] border-2 border-black focus:outline-none"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <h2>Email</h2>
            <input
              type="email"
              className="h-8 w-[15em] border-2 border-black focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h2>Password</h2>
            <input
              type="password"
              className="h-8 w-[15em] border-2 border-black focus:outline-none"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="border-2 border-gray-500 mx-20 p-2 capitalize mt-2 bg-black text-white shadow-xl tracking-wide">
              Register
            </button>
          </form>
          <Link to="/login">
            <button className="text-blue-900">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
