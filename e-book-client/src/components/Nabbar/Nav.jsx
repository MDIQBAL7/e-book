import React, { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import {
  FaBookOpen,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

const Nav = () => {
  const { user, googleSignout } = use(AuthContext);
 

  const links = (
    <>
      <li>
        <NavLink
          className="btn-basic"
          to={"/"}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          className="btn-basic"
          to={"/allBooks"}
        >
          Books
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              className="btn-basic"
              to={"/mybooks"}
            >
              My Books
            </NavLink>
          </li>

          <li>
            <NavLink
              className="btn-basic"
              to={"/addbook"}
            >
              Add Book
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const handlegoogleSignout = () => {
    googleSignout()
      .then()
      .catch();
  };

  return (
    <div className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-6 lg:px-8 min-h-[76px]">

        {/* Logo */}
        <div className="navbar-start">
          <NavLink
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <FaBookOpen className="text-lg" />
            </div>

            <div className="leading-none">
              <h1 className="text-xl font-extrabold tracking-tight text-base-content">
                E-BOOKS
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold mt-1">
                Read • Learn • Grow
              </p>
            </div>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-1">
            {links}
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-2">

          {/* Authentication */}
          {user ? (
            <button
              className="btn-basic hidden sm:inline-flex"
              onClick={handlegoogleSignout}
            >
              Sign Out
            </button>
          ) : (
            <>
              <NavLink
                className="hidden sm:inline-flex btn-basic"
                to={"/register"}
              >
                Sign In
              </NavLink>

              <NavLink
                className="hidden sm:inline-flex btn-basic"
                to={"/register"}
              >
                Register
              </NavLink>
            </>
          )}

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:bg-base-200"
            >
              {user?.photoURL ? (
                <div className="w-10 rounded-full ring-2 ring-primary/20">
                  <img
                    src={user.photoURL}
                    alt="Profile"
                  />
                </div>
              ) : (
                <FaUserCircle className="text-3xl text-primary" />
              )}
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-52 p-2 shadow-xl border border-base-300"
            >
              <li>
                <a className="rounded-xl py-3">
                  Profile
                </a>
              </li>

              <li>
                <a className="rounded-xl py-3">
                  Settings
                </a>
              </li>

              <li>
                <a className="rounded-xl py-3 text-error">
                  Logout
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:bg-primary/10"
            >
              <FaBars className="text-xl text-primary" />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-60 p-3 shadow-xl border border-base-300"
            >
              {links}

              <div className="divider my-1"></div>

              {user ? (
                <li>
                  <button
                    onClick={handlegoogleSignout}
                    className="text-error font-semibold"
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">
                      Sign In
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;