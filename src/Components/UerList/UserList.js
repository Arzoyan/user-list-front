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

  // const users = useMemo(() => data, [data]);

  // const getUsers = async () => {
  //   const userData = JSON.parse(localStorage.getItem("user"));
  //   try {
  //     const response = await fetch(`http://localhost:1337/api/users`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${userData.jwt}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const json = await response.json();

  //     setUsers(json);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  return (
    <div className="custom-scroll user-list">
      {loading || !users ? (
        <Loading />
      ) : !users?.length ? (
        <NoData />
      ) : (
        users.map((user) => (
          <div
            className="user-list-item-container"
            key={user.id}
            onClick={(e) => {
              e.preventDefault();
              activeUser(user);
            }}
          >
            <div
              className={`user-item ${
                user.id === selectedUser?.id ? " user-item-active" : ""
              }`}
            >
              <div className="user-item-info">
                <div className="user-image">
                  <img priority="true" src={"/userImg.png"} alt={`user img`} />
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
        ))
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
