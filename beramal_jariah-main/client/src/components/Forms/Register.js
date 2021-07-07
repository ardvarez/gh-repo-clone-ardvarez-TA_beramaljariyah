import { useState } from "react";
import { Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import NumberFormat from "react-number-format";
import Switch from "react-switch";
import swal from "sweetalert";

import EmailIcon from "../../assets/icon_email.png";
import PasswordIcon from "../../assets/icon_password.png";
import NameIcon from "../../assets/icon_name.png";
import WAIcon from "../../assets/icon_whatsApp.png";
import DarkLogoWeb from "../../assets/dark-logo-web.png";

function Register() {
  const [toggle, setToggle] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  const checkInput = () => {
    if (
      form.name == "" ||
      form.email == "" ||
      form.phone == "" ||
      form.password == "" ||
      form.password2 == ""
    ) {
      return false;
    } else {
      return true;
    }
  };
  const submit = () => {
    swal(
      "Success",
      "Selamat, Anda telah terdaftar sebagai User",
      "success"
    ).then(() =>
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
      })
    );
  };
  return (
    <div
      initial={{ y: "50px", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="register-form-wrapper w-100 d-flex justify-content-center align-items-center"
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
            style={{
              backgroundColor: "#fff",
              borderRadius: 15,
              padding: "20px 40px",
            }}
          >
            <img src={DarkLogoWeb} alt="Dark Logo Web" height="85px" />
            <h1
              style={{
                fontSize: 36,
                fontWeight: "bolder",
                marginTop: "-10px",
              }}
            >
              Daftar Akun
            </h1>
            <Form className="w-100">
                <label style={{
                  fontWeight: "bolder",
                  fontSize: 16
                }}>
                  Nama Pengguna
                </label>
              <Form.Row> 
                {/* <img
                  src={NameIcon}
                  alt="Email Icon"
                  style={{ marginRight: 15 }}
                /> */}
                <Form.Control
                aria-label='Nama'
                  placeholder="Nama"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Row>
              <label style={{
                  fontWeight: "bolder",
                  fontSize: 16
                }}>
                  Email
                </label>
              <Form.Row>
                {/* <img
                  src={EmailIcon}
                  alt="Email Icon"
                  style={{ marginRight: 15 }}
                /> */}
                <Form.Control
                aria-label='Email'
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Form.Row>
              <label style={{
                  fontWeight: "bolder",
                  fontSize: 16
                }}>
                  Nomor WhatsApp
                </label>
              <Form.Row>
                {/* <img
                  src={WAIcon}
                  alt="Email Icon"
                  style={{ marginRight: 15 }}
                /> */}
                <NumberFormat
                aria-label='NoWa'
                  format="####-####-####"
                  mask="_"
                  placeholder="Nomor WhatsApp"
                  customInput={Form.Control}
                  name="phone"
                  value={form.phone}
                  onValueChange={(values) => {
                    const { value } = values;
                    setForm({ ...form, phone: value });
                  }}
                  required
                />
              </Form.Row>
              <label style={{
                  fontWeight: "bolder",
                  fontSize: 16
                }}>
                  Password
                </label>
              <Form.Row>
                {/* <img
                  src={PasswordIcon}
                  alt="Password Icon"
                  style={{ marginRight: 15 }}
                /> */}
                <Form.Control
                aria-label='psw'
                  type="password"
                  placeholder="Kata Sandi"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </Form.Row>
              <label style={{
                  fontWeight: "bolder",
                  fontSize: 16
                }}>
                  Ketik Ulang Password
                </label>
              <Form.Row>
                <Form.Control
                aria-label='ulangPsw'
                  type="password"
                  placeholder="Ulangi Kata Sandi"
                  value={form.password2}
                  onChange={(e) =>
                    setForm({ ...form, password2: e.target.value })
                  }
                  required
                />
              </Form.Row>
              <Form.Row className="d-flex justify-content-between align-items-center">
                <span style={{ fontWeight: "bolder" }}>
                  Saya mau menerima kabar baik melalui WhatsApp
                </span>
                <Switch checked={toggle} onChange={() => setToggle(!toggle)} aria-label='switch'/>
              </Form.Row>
              <Form.Row>
              <button
                  type="button"
                  className={!checkInput() ? "btn btn-success disabled" : "btn btn-success"}
                  style={{
                    width: "100%",
                    backgroundColor: "#006641",
                    paddingTop: 8,
                    paddingBottom: 8,
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    boxShadow: "0 2px 5px rgba(0,0,0,.5)",
                  }}
                  onClick={() => submit()}
                >
                  <span style={{ fontWeight: "bolder", letterSpacing: 2 }}>
                    Daftar
                  </span>
                </button>
              </Form.Row>
            </Form>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Register;
