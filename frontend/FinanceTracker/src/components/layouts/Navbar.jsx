import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { useTheme } from "../../context/ThemeContext";
import { LuSun, LuMoon } from "react-icons/lu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="navbar flex items-center justify-between py-4 px-7 sticky top-0 z-30">
      <div className="flex items-center gap-5">
        <button
          className="block lg:hidden text-black"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <LuMoon className="w-5 h-5 text-gray-700" />
        ) : (
          <LuSun className="w-5 h-5 text-yellow-500" />
        )}
      </button>

      {openSideMenu && (
        <div className="fixed top-[61px] left-0 bg-white z-50">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
