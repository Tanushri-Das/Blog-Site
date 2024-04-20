import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Header.css";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { authInfo } = useContext(AuthContext);
  const { user, logOut } = authInfo;
  // Function to toggle the visibility of the responsive menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Function to close the responsive menu
  const closeMenu = () => {
    setShowMenu(false);
  };
  console.log("User", user);
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };
  return (
    <header>
      {/* Header container with app name, navigation links, and menu icon */}
      <div className="header-container">
        {/* App name with a link to the home page */}
        <Link to="/" className="app-name">
          Blog Site
        </Link>
        <div className="nav-links">
          <NavLink to="/" className="home-link" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink
            to="/personal-details"
            className="home-link"
            onClick={closeMenu}
          >
            Personal
          </NavLink>
          <NavLink
            to="/create-blogs"
            className="home-link"
            onClick={closeMenu}
          >
            Create Blog
          </NavLink>
          <NavLink
            to="/blogs"
            className="home-link"
            onClick={closeMenu}
          >
            Blogs
          </NavLink>
         
          {user ? (
            <div className="user-info">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="home-link" onClick={closeMenu}>
              Login
            </NavLink>
          )}
        </div>

        {/* Menu icon for small screens */}
        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </div>

      {/* Responsive menu for small screens */}
      {showMenu && (
        <div className="responsive-menu">
          {/* Responsive navigation links */}
          <NavLink to="/" className="home-link" onClick={closeMenu}>
            Home
          </NavLink>
          <div className="nav-links">
            <NavLink to="/" className="home-link" onClick={closeMenu}>
              Home
            </NavLink>
            {user ? (
              <div className="user-info">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="home-link" onClick={closeMenu}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
