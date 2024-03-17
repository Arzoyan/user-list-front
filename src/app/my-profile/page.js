"use client";
import { useEffect, useState } from "react";
import withAuth from "@/HOC/withAuth";
import { useRouting } from "@/hooks/useRouting";

import "./profileStyles.css";

const PersonalDetailsPage = () => {
  const { redirectToPage } = useRouting();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [syncGoogleReviews, setSyncGoogleReviews] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data?.user) {
      setFirstName(data.user?.firstName || "");
      setLastName(data.user?.lastName || "");
      setCompanyName(data.user?.companyName || "");
      setCompanyAddress(data.user?.companyAddress || "");
      setSyncGoogleReviews(!!data.user?.syncGoogleReviews);
    }
  }, []);

  const getReviews = async () => {
    const randomStart = Math.floor(Math.random() * 11);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_start=${
          randomStart * 10
        }&_limit=50`
      );

      const newList = await response.json();
      return newList;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      firstName,
      lastName,
      companyName,
      companyAddress,
      syncGoogleReviews,
    };
    if (syncGoogleReviews) {
      const reviewList = await getReviews();
      await updateCompanyReviews(
        {
          companyReviews: reviewList,
        },
        data
      );
    } else {
      await updateUserInfo(data);
    }
  };

  const updateUserInfo = async (data) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `http://localhost:1337/api/users/${userData.user.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify({ ...userData, ...user }));
      redirectToPage("/dashboard")
      } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCompanyReviews = async (data, userinfo) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(`http://localhost:1337/api/companys`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      const componyInfo = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await updateUserInfo({ ...userinfo, company_id: componyInfo.data.id });
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <div className={"container"}>
      {loading ? (
        <Loading />
      ) : (
        <form className={"form"} onSubmit={handleSubmit}>
          <h2>Personal Details</h2>
          <input
            className="input"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            disabled={!syncGoogleReviews}
            className="input"
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Company Address"
            disabled={!syncGoogleReviews}
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            required
          />
          <div className={"switch"}>
            <label htmlFor="syncGoogleReviews">Sync Google Reviews</label>
            <input
              className="input"
              type="checkbox"
              id="syncGoogleReviews"
              checked={syncGoogleReviews}
              onChange={() => setSyncGoogleReviews(!syncGoogleReviews)}
            />
          </div>

          <button className="button" type="submit">
            Save
          </button>
          {
            <button
              className="button cancel"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                redirectToPage("/dashboard")
              }}
            >
              back to dashboard
            </button>
          }
        </form>
      )}
    </div>
  );
};

export default withAuth(PersonalDetailsPage);
