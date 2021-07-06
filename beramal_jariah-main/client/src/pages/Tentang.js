import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import TentangCard from "../components/cards/TentangContent";
import SyaratKetentuan from "../components/cards/SyaratKetentuan";
import TentangNav from "../components/navbar/MainProgramNav";
import Footer from "../components/cards/Footer";

function Tentang() {
  const [content, setContent] = useState({
    tentang: true,
    syaratKetentuan: false,
  });

  const switchContent = (state) => {
    if (state.syaratKetentuan) {
      return (
        <AnimatePresence exitBeforeEnter>
          <SyaratKetentuan />
        </AnimatePresence>
      );
    } else {
      return (
        <AnimatePresence exitBeforeEnter>
          <TentangCard />
        </AnimatePresence>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 90 }}
      className="d-flex flex-column align-items-center"
    >
      <TentangNav
        navContent={"tentang"}
        tentangContent={content}
        tentangNavOnChange={setContent}
      />
      {switchContent(content)}
      <Footer />
    </motion.div>
  );
}

export default Tentang;
