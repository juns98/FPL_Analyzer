import React from "react";
import styled from "styled-components";

// Navbar component
function Navbar() {
  return (
    <StyledNavbar>
      <NavbarContainer>
        <Logo>FPL Helper</Logo>
        <NavLinks>
          <NavLink>
            <Link href="/">Home</Link>
          </NavLink>
          <NavLink>
            <Link href="/about">About</Link>
          </NavLink>
          <NavLink>
            <Link href="/player">Player</Link>
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

// Styled components
const StyledNavbar = styled.nav`
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
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

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
`;

const NavLink = styled.li`
  padding: 0 15px;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    color: #4caf50;
  }
`;
