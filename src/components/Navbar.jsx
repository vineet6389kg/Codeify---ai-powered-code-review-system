import React from "react";
import { BrainCircuit, Sun, User } from "lucide-react";

const Navbar = () => {
  return (
    <div
      className="nav flex items-center justify-between px-[150px] h-[90px] bg-zinc-900 border-b border-zinc-800"
      style={{ padding: "0px 150px" }}
    >
      <div className="logo flex items-center gap-[10px]">
        {" "}
        {/* CHANGED: logo sits in a soft glowing badge */}
        <div className="logo-badge flex items-center justify-center w-[42px] h-[42px] rounded-xl bg-purple-600/10 border border-purple-500/30">
          <BrainCircuit size={26} color="oklch(54.1% 0.281 293.009)" />
        </div>
        <span className="text-2xl font-bold ml-2 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          Codeify
        </span>
      </div>
      <div className="icons flex items-center gap-[12px]">
        {/* CHANGED: round icon buttons with hover background */}
        <i className="icon-btn cursor-pointer transition-all hover:text-[#9333ea] hover:bg-zinc-800">
          <Sun size={20} />
        </i>
        <i className="icon-btn user-icon cursor-pointer transition-all hover:text-[#9333ea] hover:bg-zinc-800">
          <User size={20} />
        </i>
      </div>
    </div>
  );
};

export default Navbar;

// import React from "react";
// import { BrainCircuit, Sun, User } from "lucide-react";

// const Navbar = () => {
//   return (
//     <div className="nav flex items-center justify-between px-[150px] h-[90px] bg-zinc-900" style={{padding: "0px 150px"}}>
//       <div className="logo flex items-center gap-[10px]">
//         {" "}
//         <BrainCircuit size={30} color="oklch(54.1% 0.281 293.009)"/>
//         <span className="text-2xl font-bold text-white ml-2">Codeify</span>
//       </div>
//       <div className="icons flex items-center gap-[20px]">
//         <i className="cursor-pointer transition-all hover:text-[#9333ea]"><Sun /></i>
//          <i className="user-icon cursor-pointer transition-all hover:text-[#9333ea]"><User /></i>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
