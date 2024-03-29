import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DashProfile,
  DashSidebar,
  DashPosts,
  DashUsers,
  DashComments,
  DashboardComp,
} from "../components/index";
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile />}
      {/*  posts...*/}
      {tab === "posts" && <DashPosts />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* comments */}
      {tab === "comments" && <DashComments />}
      {/* dashboard components */}
      {tab === "dash" && <DashboardComp />}
    </div>
  );
};

export default Dashboard;
