"use client";
import Loading from "@/Components/Loading/Loading";
import NoData from "@/Components/NoData/NoData";
import Notification from "@/Components/Notifications/Notification";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";

const UserList = ({ activeUser, selectedUser }) => {
  const {
    fetchData,
    data: users,
    loading,
    error,
    clearError,
  } = useFetch("users", "GET");

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="custom-scroll user-list">
      {loading || !users ? (
        <Loading />
      ) : !users?.length ? (
        <NoData />
      ) : (
        users.map((user) => {
          console.log(
            "%cuser-list-frontsrcComponentsUerListUserList.js:20 user",
            "color: white; background-color: #26bfa5;",
            user
          );
          return (
            <div
              className={`${
                !user.companyName ? "disabled" : ""
              } user-list-item-container `}
              key={user.id}
              onClick={(e) => {
                e.preventDefault();
                if (user.companyName) {
                  activeUser(user);
                }
              }}
            >
              <div
                className={`user-item ${
                  user.id === selectedUser?.id ? " user-item-active" : ""
                }`}
              >
                <div className="user-item-info">
                  <div className="user-image">
                    <img
                      priority="true"
                      src={"/userImg.png"}
                      alt={`user img`}
                    />
                  </div>
                  <div className="user-details">
                    <h2>
                      {user.firstName ?? "firstName"}
                      {user.lastName ?? "lastName"}
                    </h2>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="user-item-icon">
                  <img
                    className="location-icon"
                    src="/arrow.svg"
                    alt="location icon"
                    priority
                  />
                </div>
              </div>
            </div>
          );
        })
      )}

      {error && (
        <Notification
          message={error}
          onClose={() => {
            clearError("");
          }}
          status="error"
        />
      )}
    </div>
  );
};

export default UserList;
