import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotLogged() {
  return (
    <>
      <Nav.Link as={Link} to="/auth">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/auth">
        Register
      </Nav.Link>
    </>
  );
}

export default NotLogged;
