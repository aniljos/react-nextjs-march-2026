"use client";

import { SubmitEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  //console.log("login rendered...");
  //useEffect invoked once when the component is mounted
  useEffect(() => {
    console.log("login mounted...");
    usernameRef.current?.focus();
    // callback invoked on unmount
    return () => {
      console.log("login unmounted...");
    }
  }, []) 

  async function handleLogin(evt: SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (username && password) {
      //validate the credentials
      const url = "http://localhost:9000/login";
      try {
        const response = await axios.post(url, { name: username, password });
        console.log("response", response);
        setMessage("");
        router.push("/");

      } catch (error) {
        console.log("errorResponse", error);
        setMessage("Invalid credentials")
      }
      

    } else {
      setMessage("Enter the credentials.");
    }
  }
  return (
    <div>
      <h4>Login</h4>

      {message ? <div className="alert alert-warning">{message}</div> : null}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">UserName</label>
          <input
            ref={usernameRef}
            //autoFocus
            id="username"
            type="text"
            className="form-control"
            placeholder="User ID"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
        <br />
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}
