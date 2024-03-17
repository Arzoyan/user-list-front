import { useState } from "react";

const useFetch = (url, method) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = () => {
    setError(null);
  };

  const fetchData = async (data = {}) => {
    console.log("%ctask-frontsrchooks.js:13 Object", "color: #26bfa5;");
    setLoading(true);
    const userData = JSON.parse(localStorage.getItem("user"));
    const headers = {
      "Content-Type": "application/json",
    };
    if (userData) {
      headers.Authorization = `Bearer ${userData.jwt}`;
    }
    const options = { method, headers };
    if (method !== "GET" && data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`http://localhost:1337/api/${url}`, options);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // console.log( 'color: white; background-color: #26bfa5;', error);
      setError(`error`);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, data, loading, error, clearError };
};

export default useFetch;
