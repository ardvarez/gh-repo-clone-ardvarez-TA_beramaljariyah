import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MainProgramNav from "../components/navbar/MainProgramNav";
import ZakatPenghasilan from "../components/cards/ZakatPenghasilan";
import ZakatMaal from "../components/cards/ZakatMaal";
import BacaanNiat from "../components/cards/BacaanNiat";
import Footer from "../components/cards/Footer";

function Zakat() {
  const [content, setContent] = useState({
    penghasilan: true,
    maal: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 90 }}
      className="d-flex flex-column align-items-center w-100"
    >
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
        <ZakatMaal />
      </AnimatePresence>
    );
  } else {
    return (
      <AnimatePresence exitBeforeEnter>
        <BacaanNiat />
        <ZakatPenghasilan />
      </AnimatePresence>
    );
  }
};

export default Zakat;
