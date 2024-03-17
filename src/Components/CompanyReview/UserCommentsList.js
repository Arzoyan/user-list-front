"use client";
import Loading from "@/Components/Loading/Loading";
import NoData from "@/Components/NoData/NoData";
import Notification from "@/Components/Notifications/Notification";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";

const UserCommentsList = ({ selectedUser, activeUser }) => {
  const {
    fetchData,
    data: commentList,
    loading,
    error,
    clearError,
  } = useFetch(`users/${selectedUser.id}?populate=company_id`, "GET");

  useEffect(() => {
    fetchData();
  }, [selectedUser]);

  return (
    <div className="custom-scroll comment-container">
      <div className="comment-header">
        <div className="user-details">
          <h2>{selectedUser.companyName} </h2>
          <div className="comments-header-content">
            <img
              className="location-icon"
              src="/Icon-system.svg"
              alt="location icon"
              width={180}
              height={37}
              priority
            />
            <p>{selectedUser.companyAddress || "Company address"}</p>
          </div>
        </div>
        <button
          className="close-button"
          onClick={(e) => {
            e.preventDefault();
            activeUser(null);
          }}
        >
          <img src={"/close-icon.svg"} alt={`close-icon`} />
        </button>
      </div>
      <div className="comment-list">
        {loading || !commentList ? (
          <Loading />
        ) : !commentList.company_id?.companyReviews?.length ? (
          <NoData />
        ) : (
          commentList.company_id.companyReviews.map((comment) => (
            <div key={comment.id} className="item">
              <div className="comment-item-header">
                <div className="comment-item-header-user-info">
                  <div className="user-image">
                    <img src={"/userImg.png"} alt={`user img`} />
                  </div>
                  <h2>{comment.email}</h2>
                </div>
                <div className="comment-item-header-user-date">A wick ago</div>
              </div>
              <p>{comment.body}</p>
            </div>
          ))
        )}
      </div>
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

export default UserCommentsList;
