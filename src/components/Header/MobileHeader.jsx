import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ssnLogo from '../../assets/ssn.png'; // Import the SSN logo image
import headerImage from '../../assets/logo.png'; // Import the new image
import { Button } from "@nextui-org/react";
import { Transition } from "@headlessui/react";
import "./Header.css";

const headerHeight = 60; // Adjust this to match the actual height of your header

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <header className="flex items-center justify-between px-4 py-2 bg-white shadow-lg border-b border-gray-200 z-50" style={{ height: `${headerHeight}px` }}>
        <div className="flex items-center gap-4">
          <img src={headerImage} alt="Header Image" className="h-12" />
        </div>
        <div className="flex items-center gap-4">
          <img src={ssnLogo} alt="SSN Logo" className="h-10" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
      </header>

      <Transition
        show={isOpen}
        enter="transition-transform duration-500 ease-out"
        enterFrom="transform translate-x-[-100%]"
        enterTo="transform translate-x-0"
        leave="transition-transform duration-500 ease-in"
        leaveFrom="transform translate-x-0"
        leaveTo="transform translate-x-[-100%]"
      >
        <div className="fixed top-[60px] left-0 right-0 bg-white z-40" style={{ height: `calc(100vh - ${headerHeight}px)` }}>
          <nav className="flex flex-col items-stretch border-t border-gray-200">
            <NavLink
              to="/"
              className={({ isActive }) => `py-4 px-8 w-full text-center border-b border-gray-200 ${isActive ? "text-[#386c5f] font-bold" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) => `py-4 px-8 w-full text-center border-b border-gray-200 ${isActive ? "text-[#386c5f] font-bold" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setIsOpen(false)}
            >
              Events
            </NavLink>
            <NavLink
              to="/team"
              className={({ isActive }) => `py-4 px-8 w-full text-center border-b border-gray-200 ${isActive ? "text-[#386c5f] font-bold" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setIsOpen(false)}
            >
              Team
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => `py-4 px-8 w-full text-center border-b border-gray-200 ${isActive ? "text-[#386c5f] font-bold" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </Transition>
    </div>
  );
};

export default MobileHeader;
