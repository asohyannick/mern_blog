import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import {useDispatch} from 'react-redux';
import { signOutSuccess } from "../redux/user/userSlice";
const DashSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");
  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  const handleSignOut = async() => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if(!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }

    } catch(error) {
      console.log(error.message);
    }
  }
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup >
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} 
          labelColor="cursor-pointer"
          onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
