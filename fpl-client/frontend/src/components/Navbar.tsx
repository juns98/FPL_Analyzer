import React, { useState } from "react";
import styled from "styled-components";

// Define a type for the props
type NavLinksProps = {
  isNavExpanded: boolean;
};

// Navbar component
function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <StyledNavbar>
      <NavbarContainer>
        <Logo
          onClick={() => {
            window.location.href = "/";
          }}
        >
          FPL Helper
        </Logo>
        <MenuIcon onClick={() => setIsNavExpanded(!isNavExpanded)}>☰</MenuIcon>
        <NavLinks isNavExpanded={isNavExpanded}>
          <MenuIcon onClick={() => setIsNavExpanded(!isNavExpanded)}>☰</MenuIcon>
          <NavLink>
            <Link href="/">Home</Link>
          </NavLink>
          {/* <NavLink>
            <Link href="/about">About</Link>
          </NavLink> */}
          <NavLink>
            <Link href="/player">Player</Link>
          </NavLink>
          <NavLink>
            <Link href="/team">Team</Link>
          </NavLink>
          <NavLink>
            <Link href="/manager">Manager</Link>
          </NavLink>
        </NavLinks>
      </NavbarContainer>
    </StyledNavbar>
  );
}

export default Navbar;

const StyledNavbar = styled.nav`
  background-color: white;
  color: #333;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 2rem;
  cursor: pointer;
  text-align: right;
  margin-right: 10px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.ul<NavLinksProps>`
  list-style: none;
  display: flex;
  margin: 0;

  @media (max-width: 768px) {
    display: ${({ isNavExpanded }) => (isNavExpanded ? "block" : "none")};
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    background-color: white;
    padding: 1rem;
  }
`;

const NavLink = styled.li`
  padding: 0 15px;
  margin-left: 10px;

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

const Link = styled.a`
  color: black;
  text-decoration: none;

  &:hover {
    color: #4caf50;
  }
`;
