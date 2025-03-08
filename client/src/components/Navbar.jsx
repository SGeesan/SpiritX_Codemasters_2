import React, { useState } from "react";
import UserSidebar from "./UserSidebar";

function Navbar() {
  const [fillColor, setFillColor] = useState("black");

  return (
    <div className="flex flex-row justify-center">
      <nav className="bg-white w-full z-20 top-0 start-0 border-b border-gray-200  mx-5 lg:mx-10 mt-1 rounded-lg shadow-xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 py-1" >
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/logo.png" className="h-14 w-17 " alt="Logo" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
            <UserSidebar />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;