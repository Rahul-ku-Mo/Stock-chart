import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const handleSuccess = () => {
    toast.success("🦄 LogOut Successfull!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
    });

    router.push("/login");
  };
  const handleError = (error) => {
    const errorMsg = error.message.split("/")[1].slice(0, -2);

    toast.error(errorMsg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const logOut = async () => {
    signOut(auth)
      .then(() => {
        handleSuccess();
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="flex items-center justify-between">
      <div
        className={`md:text-2xl font-mono tracking-tight font-black customShadow cursor-pointer`}
        onClick={() => {
          router.push("/stockAnalysis")
        }}
      >
        Real-Time-Stock
      </div>
      <div
        className="cursor-pointer flex gap-4 p-2 rounded-md font-mono hover:bg-slate-600 "
        onClick={() => {
          logOut();
        }}
      >
        Sign Out
        <FaUserCircle size={"24px"} />
      </div>
    </div>
  );
};

export default Navbar;
