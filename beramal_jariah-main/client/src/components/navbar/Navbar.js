import { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import { UserContext } from "../../contexts/userContext";

import Logged from "./Logged";
import NotLogged from "./NotLogged";

import Search from "../buttons/Search";
import Logo from "../../assets/web-logo.png";

function MyNavbar() {
  const location = useLocation();

  const [user] = useContext(UserContext);

  const navbarShowedStyle = {
    backgroundColor: "#006641",
    padding: "0 30px",
  };

  const navbarHiddenStyle = {
    display: "none",
  };
  return (
    <Navbar
      fixed="top"
      expand="lg"
      variant="dark"
      className="justify-content-between"
      style={
        location.pathname === "/auth" ? navbarHiddenStyle : navbarShowedStyle
      }
    >
      <Nav className="mr-auto align-items-center">
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="Brand" height="32px" />
        </Navbar.Brand>
        <Nav.Link as={Link} to="/">
          Beranda
        </Nav.Link>
        <Nav.Link as={Link} to="/zakat">
          Zakat
        </Nav.Link>
        <Nav.Link as={Link} to="/infak">
          Infak
        </Nav.Link>
        <Nav.Link as={Link} to="/wakaf">
          Wakaf
        </Nav.Link>
        <Nav.Link as={Link} to="/pengelola">
          Pengelola
        </Nav.Link>
        <Nav.Link as={Link} to="/tentang">
          Tentang
        </Nav.Link>
      </Nav>
      <Nav className="align-items-center">
        <Search />
        {user.loginStatus ? <Logged /> : <NotLogged />}
      </Nav>
    </Navbar>
  );
}

export default MyNavbar;
