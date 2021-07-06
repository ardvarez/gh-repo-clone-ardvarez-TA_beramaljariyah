/* eslint-disable jsx-a11y/img-redundant-alt */
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import UserIcon from "../../assets/user.png";

function Logged() {
  return (
    <>
      <Nav.Link as={Link} to="/profile">
        <img src={UserIcon} alt="User Image" />
      </Nav.Link>
    </>
  );
}

export default Logged;
