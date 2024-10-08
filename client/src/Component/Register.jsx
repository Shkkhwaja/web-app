import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Register() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate()

  function registerUser(e) {
    e.preventDefault();
    axios.post('https://web-app-api-nine.vercel.app/register', { name, user, email, pass }).then(result => {console.log(result)
        setTimeout(() => {
          navigate('/login')
        },1000)
        toast.success('register successfull')
  })
      .catch(err => {console.log(err)
        toast.error("Somthing went wrong !!")
      });
  }

  return (
    <div className="h-screen w-full bg-gray-200 flex items-center justify-center">
      <div>
        <h2 className="text-[3em] uppercase text-center relative -top-10">
          Register
        </h2>
        <div className="border-2 border-green-300 h-[22em] w-[20em] flex flex-col p-6 gap-2 bg-slate-300">
          <form onSubmit={registerUser}>
            <h2>Full name</h2>{" "}
            <input
              type="text"
              className="h-8 w-[15em] border-2 border-black focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <h2>Username</h2>{" "}
            <input
              type="text"
              className="h-8 w-[15em] border-2 border-black focus:outline-none"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <h2>Email</h2>{" "}
            <input
              type="email"
              className="h-8 w-[15em] border-2 border-black focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h2>Password</h2>{" "}
            <input
              type="password"
              className="h-8 w-[15em] border-2 border-black focus:outline-none"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="border-2 border-gray-500 mx-20 p-2 capitalize mt-2 bg-black text-white shadow-xl tracking-wide ">
              register
            </button>
          </form>
          <Link to="/login">
            <button className="text-blue-900 underline">login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
