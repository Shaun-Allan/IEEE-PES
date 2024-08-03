import React from "react";
import { NavLink } from "react-router-dom";
import ssnLogo from '../../assets/ssn.png'; // Import the SSN logo image
import headerImage from '../../assets/logo.png'; // Import the new image
import './Header.css'; // Ensure you have this CSS file
import {Button} from "@nextui-org/react"

const Header = () => {
  return (
    <header className="navbar shadow-lg h-20 flex items-center justify-between px-8 bg-white border-b border-gray-200">
      <div className="flex items-center gap-4">
        <img src={headerImage} alt="Header Image" className="header-image h-12" />
        <p className="heading font-bold">IEEE Power and Energy Society</p>
      </div>
      <nav className="hidden sm:flex gap-14">
        <NavLink exact to="/" className="nav-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/events" className="nav-link" activeClassName="active">
          Events
        </NavLink>
        <NavLink to="/team" className="nav-link" activeClassName="active">
          Team
        </NavLink>
        <NavLink to="/contact" className="nav-link" activeClassName="active">
          Contact
        </NavLink>
      </nav>
      <div className="flex items-center gap-8">
      <Button
            as={NavLink}
            to="/signup"
            variant="flat"
            color="#386c5f"
            className="animated-button"
          >
            Join IEEE PES
          </Button>
        <img src={ssnLogo} alt="SSN Logo" className="navbar-logo h-10" />
      </div>
    </header>
  );
};

export default Header;
