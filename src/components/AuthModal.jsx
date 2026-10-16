import React, { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const inputClass =
  "w-full bg-zinc-950 border border-zinc-700 rounded-lg !px-3 !py-2 text-zinc-200 outline-none focus:border-purple-600 transition-all";

const AuthModal = ({ onClose }) => {
  const { login, signup } = useAuth();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isSignup = mode === "signup";

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (isSignup) {
        await signup(form.name, form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function switchMode() {
    setMode(isSignup ? "login" : "signup");
    setError("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative w-[380px] bg-zinc-900 border border-zinc-800 rounded-2xl !p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-white">
            {isSignup ? "Create account" : "Welcome back"}
          </h2>
          <p className="text-sm text-zinc-400">
            {isSignup
              ? "Sign up to start reviewing your code."
              : "Log in to continue to Codeify."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full !py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-60 transition-all duration-300 font-medium cursor-pointer"
          >
            {submitting ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
          </button>
        </form>

        <p className="text-sm text-zinc-400 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={switchMode}
            className="text-purple-400 hover:text-purple-300 cursor-pointer font-medium"
          >
            {isSignup ? "Log in" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;