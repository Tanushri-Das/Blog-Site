import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Function to toggle the visibility of the responsive menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Function to close the responsive menu
  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header>
      {/* Header container with app name, navigation links, and menu icon */}
      <div className="header-container">
        {/* App name with a link to the home page */}
        <Link to="/" className="app-name">
          Blog Site
        </Link>

        {/* Navigation links for larger screens */}
        <div className="nav-links">
          <NavLink to="/" className="home-link" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/login" className="home-link" onClick={closeMenu}>
            Login
          </NavLink>
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
          <NavLink to="/login" className="home-link" onClick={closeMenu}>
            Login
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
