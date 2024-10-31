import React, { useState } from "react";
import Icon from "./Icon";

interface AppBarProps {
  children?: React.ReactNode;
}

export default function AppBar({ children }: AppBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 inset-x-0 p-4 flex  items-start justify-between">
      <div className="hidden text-zinc-950 text-lg sm:block">
        React Google Maps
      </div>
      {children}
      <div className="relative">
        <button
          className="text-zinc-400 bg-white p-3 border rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon open={menuOpen} />
        </button>
        {menuOpen && (
          <div className="z-50 absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Home
            </a>
            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Others
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
