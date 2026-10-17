import React, { useState } from "react";
import { BrainCircuit, Sun, Moon, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleUserClick() {
    if (user) {
      setMenuOpen(!menuOpen);
    } else {
      setModalOpen(true);
    }
  }

  function handleLogout() {
    logout();
    setMenuOpen(false);
  }

  return (
    <div className="nav flex items-center justify-between !px-4 md:!px-10 lg:!px-[150px] h-[90px] bg-zinc-900 border-b border-zinc-800">
      <div className="logo flex items-center gap-[10px]">
        {" "}
        <div className="logo-badge flex items-center justify-center w-[42px] h-[42px] rounded-xl bg-purple-600/10 border border-purple-500/30">
          <BrainCircuit size={26} color="oklch(54.1% 0.281 293.009)" />
        </div>
        <span className="text-2xl font-bold ml-2 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          Codeify
        </span>
      </div>

      <div className="icons flex items-center gap-[12px]">
        <i
          onClick={toggleTheme}
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          className="icon-btn cursor-pointer transition-all hover:text-[#9333ea] hover:bg-zinc-800"
        >
          {theme === "dark" ?
            <Sun size={20} />
          : <Moon size={20} />}
        </i>

        <div className="relative">
          <i
            onClick={handleUserClick}
            className="icon-btn user-icon cursor-pointer transition-all hover:text-[#9333ea] hover:bg-zinc-800"
          >
            {user ?
              <span className="w-[28px] h-[28px] rounded-full bg-purple-600 text-white text-sm font-semibold flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </span>
            : <User size={20} />}
          </i>

          {user && menuOpen && (
            <div className="absolute right-0 top-[50px] w-[220px] bg-zinc-900 border border-zinc-800 rounded-xl !p-3 z-50 flex flex-col gap-2">
              <div>
                <p className="text-sm font-semibold text-zinc-200 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-zinc-400 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-sm !py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all duration-300 cursor-pointer"
              >
                <LogOut size={16} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {modalOpen && <AuthModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Navbar;
