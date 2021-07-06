import { useHistory } from "react-router-dom";

import ActiveLogin from "../../assets/active_login.png";
import InactiveLogin from "../../assets/inactive_login.png";
import ActiveRegister from "../../assets/active_register.png";
import InactiveRegister from "../../assets/inactive_register.png";

function AuthNav(props) {
  const location = useHistory();

  const navItems = ["Login", "Register"];

  const changeNav = (content) => {
    if (content === "Register") {
      props.setContent({
        login: false,
        register: true,
      });
    } else {
      props.setContent({
        login: true,
        register: false,
      });
    }
  };

  const changeIcon = (content) => {
    if (content == "Register") {
      if (props.content[`${content.toLowerCase()}`]) {
        return (
          <img src={ActiveRegister} alt="Register Icon" className="mx-2" />
        );
      } else {
        return (
          <img src={InactiveRegister} alt="Register Icon" className="mx-2" />
        );
      }
    } else {
      if (props.content[`${content.toLowerCase()}`]) {
        return <img src={ActiveLogin} alt="Login Icon" className="mx-2" />;
      } else {
        return <img src={InactiveLogin} alt="Login Icon" className="mx-2" />;
      }
    }
  };

  return (
    <div
      className="auth-nav-wrapper d-flex flex-column align-items-end"
      style={{
        position: "relative",
        height: "100%",
        width: "20%",
        paddingTop: 100,
      }}
    >
      {navItems.map((item) => {
        return (
          <button
            type="button"
            style={{
              width: 150,
              paddingTop: 15,
              paddingBottom: 15,
              borderColor: "transparent",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            className={
              props.content[`${item.toLowerCase()}`]
                ? "active-auth-nav d-flex align-items-center"
                : "inactive-auth-nav d-flex align-items-center"
            }
            onClick={() => changeNav(item)}
          >
            {changeIcon(item)}
            {item}
          </button>
        );
      })}
      <button
        type="button"
        className="beranda-btn absolute-center"
        style={{
          position: "absolute",
          bottom: 30,
          width: 150,
          backgroundColor: "#00A441",
          paddingTop: 8,
          paddingBottom: 8,
          color: "#fff",
          border: "none",
          borderRadius: 10,
          boxShadow: "0 2px 5px rgba(0,0,0,.5)",
        }}
        onClick={() => location.push("/")}
      >
        Beranda
      </button>
    </div>
  );
}

export default AuthNav;
