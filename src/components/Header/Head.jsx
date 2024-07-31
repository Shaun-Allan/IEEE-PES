import React from "react";
import "./Header.css";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";  // Import NavLink component

const Head = () => {
  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <p className="font-bold text-inherit">IEEE PES</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-10" justify="end">
          <NavbarItem>
            <NavLink
              exact
              to="/"
              className="text-foreground"
              activeClassName="active"
            >
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              to="/events"
              className="text-foreground"
              activeClassName="active"
            >
              Events
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              to="/team"
              className="text-foreground"
              activeClassName="active"
            >
              Team
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              to="/contact"
              className="text-foreground"
              activeClassName="active"
            >
              Contact
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        {/* <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <NavLink to="/login" activeClassName="active">Login</NavLink>
          </NavbarItem>
          <NavbarItem>
            <Button as={NavLink} color="primary" to="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent> */}
      </Navbar>
    </>
  );
};

export default Head;
