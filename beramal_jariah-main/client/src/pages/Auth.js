import { motion } from "framer-motion";
import { useState } from "react";

import AuthNav from "../components/navbar/AuthNav";
import LoginForm from "../components/Forms/Login";
import RegisterForm from "../components/Forms/Register";

function Auth() {
  const [content, setContent] = useState({
    login: true,
    register: false,
  });

  const changeContent = () => {
    if (content.register) {
      return <RegisterForm />;
    } else {
      return <LoginForm />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height: "100vh" }}
      className="d-flex"
    >
      <AuthNav content={content} setContent={setContent} />
      {changeContent()}
    </motion.div>
  );
}

export default Auth;
