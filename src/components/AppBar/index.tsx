import React, { useState } from "react";
import Icon from "./Icon";

interface AppBarProps {
  children?: React.ReactNode;
}

export default function AppBar({ children }: AppBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed right-4 top-4 z-50">
      <button
        className="text-zinc-300 bg-white p-3 border rounded"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Icon open={menuOpen} />
      </button>
      {menuOpen && (
        <div className="z-50 absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-base">
          <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
            Home
          </a>
          <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
            Others
          </a>
        </div>
      )}
    </div>
  );
}
