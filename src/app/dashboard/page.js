"use client";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useState } from "react";
import Loading from "@/Components/Loading/Loading";
import Header from "../../Components/Header/Header";

import "./dashboardStyles.css";
import withAuth from "@/HOC/withAuth";

const DynamicUserList = dynamic(() =>
  import("../../Components/UerList/UserList")
);
const DynamicUserCommentsList = dynamic(() =>
  import("../../Components/CompanyReview/UserCommentsList")
);

const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const activeUser = useCallback(
    (user) => setSelectedUser(user),
    [selectedUser]
  );

  return (
    <div>
      <Header />
      <div className={"container"}>
        <Suspense fallback={<Loading />}>
          <div className="list">
            <DynamicUserList
              activeUser={activeUser}
              selectedUser={selectedUser}
            />
          </div>
        </Suspense>

        {selectedUser && (
          <Suspense fallback={<Loading />}>
            <DynamicUserCommentsList
              selectedUser={selectedUser}
              activeUser={activeUser}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
