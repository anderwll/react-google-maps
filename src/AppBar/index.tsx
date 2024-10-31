import { useState } from "react";
import Icon from "./Icon";

export default function AppBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-zinc-600 p-4 flex justify-between items-center">
      <div className="text-white text-lg">React Google Maps</div>
      <div className="relative">
        <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
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
