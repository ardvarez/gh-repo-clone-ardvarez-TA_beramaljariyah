import { Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory } from "react-router";
import { useState, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";

import { UserContext } from "../../contexts/userContext";

import EmailIcon from "../../assets/icon_email.png";
import PasswordIcon from "../../assets/icon_password.png";
import DarkLogoWeb from "../../assets/dark-logo-web.png";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useHistory();

  const [user, setUser] = useContext(UserContext);

  const [load, setLoad] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoad(true);
      const getUser = await axios
        .get(`http://localhost:5000/users?email=${form.email}`)
        .then((result) => result.data[0]);

      if (getUser === undefined) {
        return swal(
          "Error",
          "Email atau kata sandi yang anda masukkan salah",
          "warning"
        ).then(() => setLoad(false));
      }

      if (getUser.password !== form.password) {
        return swal(
          "Error",
          "Email atau kata sandi yang anda masukkan salah",
          "warning"
        ).then(() => setLoad(false));
      }

      setUser({
        type: "LOGIN",
        payload: getUser,
      });

      setLoad(false);
      navigate.push("/");
    } catch (error) {}
  };

  return (
    <div
      initial={{ y: "50px", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="login-form-wrapper w-100 d-flex justify-content-center align-items-center"
    >
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial={{ y: "50px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-50"
        >
          <div
            className="form-wrapper w-100 card-bottom-shadow d-flex flex-column align-items-center"
            style={{ backgroundColor: "#fff", borderRadius: 15, padding: 40 }}
          >
            <img src={DarkLogoWeb} alt="Dark Logo Web" height="85px" />
            <span
              style={{
                fontSize: 40,
                fontWeight: "bolder",
                margin: "-10px 0 20px 0",
              }}
            >
              Selamat Datang
            </span>
            <Form className="w-100">
              <Form.Row>
                <img
                  src={EmailIcon}
                  alt="Email Icon"
                  style={{ marginRight: 15 }}
                />
                <Form.Control
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </Form.Row>
              <Form.Row>
                <img
                  src={PasswordIcon}
                  alt="Password Icon"
                  style={{ marginRight: 15 }}
                />
                <Form.Control
                  type="password"
                  placeholder="Kata Sandi"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  required
                />
              </Form.Row>
              <Form.Row>
                <button
                  type="button"
                  className={
                    load ? "btn btn-success disabled" : "btn btn-success"
                  }
                  style={{
                    width: "100%",
                    backgroundColor: "#00A441",
                    marginTop: 25,
                    paddingTop: 8,
                    paddingBottom: 8,
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    boxShadow: "0 2px 5px rgba(0,0,0,.5)",
                  }}
                  onClick={() => loginSubmit()}
                >
                  <span style={{ fontWeight: "bolder", letterSpacing: 2 }}>
                    Login
                  </span>
                </button>
              </Form.Row>
            </Form>
            <span
              style={{
                textDecoration: "underline",
                marginTop: 10,
                color: "#00A441",
                cursor: "pointer",
              }}
            >
              Lupa password?
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Login;
