import DemoNav from "@/components/general/DemoNav";
import UserDemo from "@/components/user/UserDemo";
import React from "react";

function UserAuth() {
  return (
    <div className="h-full">
      <DemoNav />
      <div className="h-full flex flex-col items-center justify-center">
        <UserDemo />
      </div>
    </div>
  );
}

export default UserAuth;
