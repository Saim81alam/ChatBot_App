import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white/15 backdrop-blur-md fixed w-full z-10 shadow-md">
      <div className="text-2xl font-bold text-white">🤖 MyBot</div>
      <div className="space-x-4">
        <button className="px-4 py-2 border border-purple-300 text-cyan-300 rounded hover:bg-purple-500 transition">
          Sign Up
        </button>
        <button className="px-4 py-2 border border-purple-300 text-cyan-300 rounded hover:bg-purple-500 transition">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
