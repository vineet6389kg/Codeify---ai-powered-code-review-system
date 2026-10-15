import React from "react";
import { BrainCircuit, Sun, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="nav flex items-center justify-between px-[150px] h-[90px] bg-zinc-900" style={{padding: "0px 150px"}}>
      <div className="logo flex items-center gap-[10px]">
        {" "}
        <BrainCircuit size={30} color="oklch(54.1% 0.281 293.009)"/>
        <span className="text-2xl font-bold text-white ml-2">Codeify</span>
      </div>
      <div className="icons flex items-center gap-[20px]">
        <i className="cursor-pointer transition-all hover:text-[#9333ea]"><Sun /></i>
         <i className="user-icon cursor-pointer transition-all hover:text-[#9333ea]"><User /></i>
      </div>
    </div>
  );
};

export default Navbar;
