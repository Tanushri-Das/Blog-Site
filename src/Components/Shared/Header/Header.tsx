// import { useContext, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
// import "./Header.css";
// import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";

// const Header = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const { authInfo } = useContext(AuthContext);
//   const { user, logOut } = authInfo;
//   // Function to toggle the visibility of the responsive menu
//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   // Function to close the responsive menu
//   const closeMenu = () => {
//     setShowMenu(false);
//   };
//   console.log("User", user);
//   const handleLogout = () => {
//     logOut()
//       .then(() => {})
//       .catch((error) => console.error(error));
//   };
//   return (
//     <header>
//       {/* Header container with app name, navigation links, and menu icon */}
//       <div className="header-container">
//         {/* App name with a link to the home page */}
//         <Link to="/" className="app-name">
//           Blog Site
//         </Link>
//         <div className="nav-links">
//           <NavLink to="/" className="home-link" onClick={closeMenu}>
//             Home
//           </NavLink>
//           <NavLink
//             to="/personal-details"
//             className="home-link"
//             onClick={closeMenu}
//           >
//             Personal
//           </NavLink>
//           <NavLink
//             to="/profile"
//             className="home-link"
//             onClick={closeMenu}
//           >
//             Profile
//           </NavLink>

//           <NavLink
//             to="/create-blogs"
//             className="home-link"
//             onClick={closeMenu}
//           >
//             Create Blog
//           </NavLink>
//           <NavLink
//             to="/blogs"
//             className="home-link"
//             onClick={closeMenu}
//           >
//             Blogs
//           </NavLink>

//           {user ? (
//             <div className="user-info">
//               <button className="home-link" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <NavLink to="/login" className="home-link" onClick={closeMenu}>
//               Login
//             </NavLink>
//           )}
//         </div>

//         {/* Menu icon for small screens */}
//         <div className="menu-icon" onClick={toggleMenu}>
//           <FaBars />
//         </div>
//       </div>

//       {/* Responsive menu for small screens */}
//       {showMenu && (
//         <div className="responsive-menu">
//           {/* Responsive navigation links */}
//           <NavLink to="/" className="home-link" onClick={closeMenu}>
//             Home
//           </NavLink>
//           <div className="nav-links">
//             <NavLink to="/" className="home-link" onClick={closeMenu}>
//               Home
//             </NavLink>
//             {user ? (
//               <div className="user-info">
//                 <button className="logout-btn" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <NavLink to="/login" className="home-link" onClick={closeMenu}>
//                 Login
//               </NavLink>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useContext, useState } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";

const Header = () => {
  const { authInfo } = useContext(AuthContext);
  const { user, logOut } = authInfo;
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="shadow-lg">
      <div className="px-4 sm:px-6 py-3 lg:px-14 xl:px-20">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Link to="/">
                <h2 className="text-2xl md:text-3xl font-semibold header-logo-text">
                  Blog Site
                </h2>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden lg:block ml-auto">
              <div className="flex items-baseline space-x-4">
                <NavLink
                  to="/"
                  className="text-lg font-semibold navtext lg:pe-2 xl:pe-[20px]"
                  onClick={closeNavbar}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/personal-details"
                  className="text-lg font-semibold navtext lg:pe-2 xl:pe-[20px]"
                  onClick={closeNavbar}
                >
                  Personal Details
                </NavLink>
                <NavLink
                  to="/profile"
                  className="text-lg font-semibold navtext lg:pe-2 xl:pe-[20px]"
                  onClick={closeNavbar}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/create-blogs"
                  className="text-lg font-semibold navtext lg:pe-2 xl:pe-[20px]"
                  onClick={closeNavbar}
                >
                  Create Blog
                </NavLink>
                <NavLink
                  to="/blogs"
                  className="text-lg font-semibold navtext lg:pe-2 xl:pe-[20px]"
                  onClick={closeNavbar}
                >
                  Blogs
                </NavLink>
                {user ? (
                  <>
                    <li className="flex justify-center">
                      <button
                        onClick={handleLogout}
                        className="login-btn text-lg font-semibold text-white px-8 py-3"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex justify-center">
                      <Link
                        className="login-btn text-lg font-semibold text-white px-8 py-3"
                        to="/login"
                        onClick={closeNavbar}
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </div>
            </div>
            <div className="-mr-2 flex lg:hidden">
              <button
                onClick={toggleNavbar}
                type="button"
                className="bg-[#032174] inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#032174] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-none focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-4 sm:px-6 py-3 lg:px-2">
            <NavLink
              to="/"
              className="text-lg font-semibold navtext block mb-1"
              onClick={closeNavbar}
            >
              Home
            </NavLink>
            <NavLink
              to="/personal-details"
              className="text-lg font-semibold navtext block mb-1"
              onClick={closeNavbar}
            >
              Personal Details
            </NavLink>
            <NavLink
              to="/profile"
              className="text-lg font-semibold navtext block mb-1"
              onClick={closeNavbar}
            >
              Profile
            </NavLink>
            <NavLink
              to="/create-blogs"
              className="text-lg font-semibold navtext block mb-1"
              onClick={closeNavbar}
            >
              Create Blog
            </NavLink>
            <NavLink
              to="/blogs"
              className="text-lg font-semibold navtext block"
              onClick={closeNavbar}
            >
              Blogs
            </NavLink>
            {user ? (
              <div className="">
                <li className="list-none mt-5">
                  <button
                    onClick={handleLogout}
                    className="login-btn text-lg font-semibold text-white px-8 py-3"
                  >
                    Logout
                  </button>
                </li>
              </div>
            ) : (
              <>
                <li className="list-none mb-5 mt-7">
                  <Link
                    className="login-btn text-lg font-semibold text-white px-8 py-3"
                    to="/login"
                    onClick={closeNavbar}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
