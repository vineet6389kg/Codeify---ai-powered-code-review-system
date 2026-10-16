import React from "react";
import { Lock, X } from "lucide-react";

const LimitModal = ({ limit, onClose, onLogin }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative w-[380px] bg-zinc-900 border border-zinc-800 rounded-2xl !p-6 flex flex-col items-center text-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="w-[56px] h-[56px] rounded-full bg-purple-600/10 border border-purple-500/30 flex items-center justify-center">
          <Lock size={26} color="#a855f7" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-white">Free limit reached</h2>
          <p className="text-sm text-zinc-400">
            You only get {limit} free reviews without an account. Log in to
            keep reviewing your code.
          </p>
        </div>

        <button
          onClick={onLogin}
          className="w-full !py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all duration-300 font-medium cursor-pointer"
        >
          Log in / Sign up
        </button>

        <button
          onClick={onClose}
          className="text-sm text-zinc-400 hover:text-zinc-200 cursor-pointer"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
};

export default LimitModal;