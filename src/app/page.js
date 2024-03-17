"use client";
import Dashboard from "./dashboard/page";
import withAuth from "@/HOC/withAuth";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Dashboard />
    </div>
  );
};

export default withAuth(Home);
