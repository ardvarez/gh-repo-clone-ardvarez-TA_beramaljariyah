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
    const getPengelola = await axios
      .get("http://localhost:5000/users?role=pengelola")
      .then((result) => result.data);

    let pengelola = [];

    for (let i = 0; i < getPengelola.length; i++) {
      const programs = await axios
        .get(`http://localhost:5000/users/${getPengelola[i].id}/programs`)
        .then((res) => res.data);

      pengelola.push({
        ...getPengelola[i],
        totalProgram: programs.length,
      });
    }

    setDataPengelola({
      data: pengelola,
      load: false,
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
      <span
        style={{
          fontSize: 32,
          fontWeight: "bold",
          margin: "-10px 0 20px 0",
          color: "#006641",
        }}
      >
        Yayasan Pengelola
      </span>
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
