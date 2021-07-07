import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import PengelolaCard from "../components/cards/PengelolaCard";
import Footer from "../components/cards/Footer";
import Loading from "../components/cards/Loading";

function Pengelola() {
  const [dataPengelola, setDataPengelola] = useState({
    data: [],
    load: true,
  });

  const getDataPengelola = async () => {
    await axios
      .get("http://localhost:5000/users?role=pengelola")
      .then((result) => {
        setDataPengelola({
          data: result.data,
          load: false,
        });
      });
  };

  useEffect(() => {
    getDataPengelola();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 90 }}
      className="d-flex flex-column align-items-center"
    >
      {dataPengelola.load ? (
        <Loading />
      ) : (
        <PengelolaCard dataPengelola={dataPengelola.data} />
      )}
      <Footer />
    </motion.div>
  );
}

export default Pengelola;
