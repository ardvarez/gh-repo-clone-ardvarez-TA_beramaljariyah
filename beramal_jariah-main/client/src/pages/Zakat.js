import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MainProgramNav from "../components/navbar/MainProgramNav";
import ZakatPenghasilan from "../components/cards/ZakatPenghasilan";
import ZakatMaal from "../components/cards/ZakatMaal";
import BacaanNiat from "../components/cards/BacaanNiat";
import Footer from "../components/cards/Footer";
import PenjelasanBruto from "../components/cards/PenjelasanBruto";

function Zakat() {
  const [content, setContent] = useState({
    penghasilan: true,
    maal: false,
  });

  useEffect(() => {
    document.title="Zakat | beramaljariyah"
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 90 }}
      className="d-flex flex-column align-items-center w-100"
      
    >
      
      <h1
      style={{
        fontFamily:"open sans",
        color: "#006641",
        fontWeight: "bold",
        fontSize: "36",
      }}>Formulir Zakat</h1>
      <MainProgramNav
        navContent={"zakat"}
        zakatNavOnChange={setContent}
        zakatContent={content}
      />
      
      {section(content)}
      <Footer />
    </motion.div>
  );
}

const section = (state) => {
  if (state.maal) {
    return (
      <AnimatePresence exitBeforeEnter>
        <BacaanNiat />
        <span></span>
        <ZakatMaal />
      </AnimatePresence>
    );
  } else {
    return (
      <AnimatePresence exitBeforeEnter>
        <BacaanNiat />
        <span></span>
        <ZakatPenghasilan />
      </AnimatePresence>
    );
  }
};

export default Zakat;
