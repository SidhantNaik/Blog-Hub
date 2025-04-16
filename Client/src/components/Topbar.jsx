import React from "react";
import WebSiteLogo from "./WebsiteLogo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import SearchBox from "./SearchBox";
import { RouteSignIn } from "@/helpers/RouteName";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div>
        <WebSiteLogo />
      </div>
      <div className="w-[500px]">
        <SearchBox />
      </div>
      <div>
        <Button asChild>
          <Link to={RouteSignIn}>
            <IoLogInOutline />
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
