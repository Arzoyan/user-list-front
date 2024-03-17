"use client";
import { useState } from "react";
import Notification from "@/Components/Notifications/Notification";
import { useRouting } from "@/hooks/useRouting";

import "./signUpStyles.css";

const SignUpPage = () => {
  const { redirectToPage } = useRouting();

  const { fetchData, data } = useFetch(`auth/local/register`, "POST");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      fetchData({
        email,
        password,
        firstName,
        lastName,
        username: `${new Date().getMilliseconds()}`,
      });
      redirectToPage("/signin");
    } else {
      setConfirmPassword("");
    }
  };

  return (
    <div className={"container"}>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign Up!</h2>
        <div>
          <div className="item">
            <input
              className="input"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="item">
            <input
              className="input"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="item">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="item">
            <input
              minLength={6}
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="item">
            <input
              className="input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="button" type="submit">
          Sign Up
        </button>
      </form>
      <>{data && <Notification onClose />}</>
    </div>
  );
};

export default SignUpPage;
