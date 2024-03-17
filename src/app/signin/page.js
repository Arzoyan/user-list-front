"use client";
import { useEffect, useState } from "react";
import Notification from "../../Components/Notifications/Notification";
import useFetch from "@/hooks/useFetch";
import Loading from "@/Components/Loading/Loading";
import { useRouting } from "@/hooks/useRouting";

import "./signInStyles.css";

const SignInPage = () => {
  const { redirectToPage } = useRouting();
  const { fetchData, data, error, clearError, loading } = useFetch(
    `auth/local`,
    "POST"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.clear();
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      redirectToPage("/dashboard");
    }
  }, [data]);

  const handleSubmit = async () => {
    await fetchData({ identifier: email, password });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={"container"}>
          {error && (
            <Notification
              message={error}
              onClose={() => {
                clearError();
              }}
              status="error"
            />
          )}
          <div className={"form"}>
            <h2>Sign In</h2>
            <div>
              <div className="item">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="item">
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>

            <button className="button" type="button" onClick={handleSubmit}>
              Content
            </button>
            <div className={"create-account"}>
              <span>Don't have an account? </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  redirectToPage("/signup")
                }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInPage;
