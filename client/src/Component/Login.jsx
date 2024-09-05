import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const hasAutoLoginChecked = useRef(false);

  // Check for token and autologin on page load
  useEffect(() => {
    if (!hasAutoLoginChecked.current) {
      axios
        .get("https://web-app-api-nine.vercel.app/autologin", { withCredentials: true }) 
        .then((result) => {
          if (result.status === 200) {
            console.log("Autologin successful for user:", result.data.user);
            toast.success("Welcome back, " + result.data.user + "!");
            navigate("/home");
          }
        })
        .catch((err) => {
          console.log("No valid token found, proceed to login", err);
        });

      // Set the ref to true so it doesn't run again
      hasAutoLoginChecked.current = true;
    }
  }, []);



  function handleLogin(e) {
    e.preventDefault();


    
    axios.post('https://web-app-api-nine.vercel.app/login', { user, pass }, { withCredentials: true })
      .then(result => {
        if (result.data.status === 200) { 
          console.log("JWT Token:", result.data.token);
          // Show success message
          toast.success("Login successful!");

          // Navigate to home after a delay
          setTimeout(() => {
            navigate('/home');
          }, 1000);
          
        } else {
          // Handle errors returned by the server
          toast.error(result.data.message || "Login failed.");
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
