import { useContext, useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Header = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "fantasy",
  );

  const { user, logOut } = useContext(AuthContext);

  const handleTheme = (e) => {
    if (e.target.checked) {
      setTheme("fantasy");
    } else {
      setTheme("sunset");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">About</NavLink>
      </li>
      <li>
        <NavLink to="/results">Results</NavLink>
      </li>
      {!user && (
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
      )}
      {user && (
        <li className="cursor-pointer select-none" onClick={logOut}>
          Log Out
        </li>
      )}
      <li>
        <NavLink to="/careers">Careers</NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-primary py-2 text-primary-content">
      <div className="nav-content container-center flex items-center justify-between gap-5">
        {/* Only visible on large devices. hidden for small devices */}
        <div className="navLinksLarge hidden list-none items-center gap-8 lg:flex">
          {navLinks}
        </div>
        {/* Menu // Only visible on small devices, hidden for large devices*/}
        <div className="drawer relative z-50 w-5/12 lg:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button"
            >
              {/* hamburger icon */}
              <span className="block text-4xl font-bold">
                <IoMdMenu />
              </span>
            </label>
          </div>

          <div className="drawer-side  lg:w-auto">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu-mobile menu min-h-full w-80 gap-4 bg-base-200 p-4 pt-8 text-base-content">
              {/* Sidebar content here */}
              {navLinks}
            </ul>
          </div>
        </div>

        <div className="nav-content-end flex items-center gap-4">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={handleTheme}
              checked={theme === "fantasy"}
            />

            {/* sun icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className=" swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {!user && (
            <NavLink
              to="/signup"
              className="btn btn-outline border border-white text-lg text-primary-content hover:btn-secondary"
            >
              Sign Up
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
