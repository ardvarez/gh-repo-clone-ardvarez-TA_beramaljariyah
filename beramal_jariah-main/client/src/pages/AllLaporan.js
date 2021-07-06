import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";

import Program from "../components/cards/Program";
import TotalProgram from "../components/cards/TotalProgram";
import Footer from "../components/cards/Footer";

function AllLaporan() {
  const [data, setData] = useState({
    laporan: [],
    totalAllProgramsTransactions: 0,
    totalAllPrograms: 0,
    load: true,
  });

  const navigate = useHistory();

  const getData = async () => {
    //get all transactions total and total program
    const allPrograms = await axios
      .get("http://localhost:5000/programs")
      .then((result) => result.data);

    const getTotalTransactions = await axios
      .get("http://localhost:5000/transactionsUser")
      .then((result) => result.data);

    let totalDana = 0;

    for (let a = 0; a < getTotalTransactions.length; a++) {
      totalDana += getTotalTransactions[a].total;
    }

    //get laporan data
    const getLaporan = await axios
      .get("http://localhost:5000/laporan")
      .then((result) => result.data);

    let getLaporanProgram = [];

    for (let i = 0; i < getLaporan.length; i++) {
      let modifiedData = {};
      await axios
        .get(`http://localhost:5000/programs?id=${getLaporan[i].programId}`)
        .then(
          (result) =>
            (modifiedData = {
              laporan: getLaporan[i],
              program: result.data[0],
            })
        );

      getLaporanProgram.push(modifiedData);
    }

    let laporanProgramTransaction = [];

    for (let x = 0; x < getLaporanProgram.length; x++) {
      const dataTransaction = await axios
        .get(
          `http://localhost:5000/programs/${getLaporanProgram[x].laporan.id}/transactionsUser`
        )
        .then((result) => result.data);

      let totalTransaction = 0;

      for (let y = 0; y < dataTransaction.length; y++) {
        totalTransaction += dataTransaction[y].total;
      }

      const newDataTransaction = {
        ...getLaporanProgram[x],
        danaTerkumpul: totalTransaction,
        donatur: dataTransaction.length,
      };

      laporanProgramTransaction.push(newDataTransaction);
    }

    setData({
      laporan: laporanProgramTransaction,
      totalAllProgramsTransactions: totalDana,
      totalAllPrograms: allPrograms.length,
      load: false,
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 90 }}
      className="d-flex flex-column align-items-center"
    >
      <TotalProgram
        totalProgram={data.totalAllPrograms}
        totalDana={data.totalAllProgramsTransactions}
      />
      <div className="w-80 d-flex flex-wrap justify-content-around py-4 align-items-center">
        {data.load
          ? "Loading..."
          : data.laporan.map((item) => {
              return (
                <Program
                  withPengelola={false}
                  title={item.laporan.title}
                  image={item.laporan.image}
                  donatur={item.donatur}
                  danaTerkumpul={item.danaTerkumpul}
                  target={item.program.target}
                  style={{ marginBottom: 15, width: "20rem" }}
                  action={() =>
                    navigate.push(
                      `/${item.program.type}/${item.program.id}/laporan-detail/${item.laporan.id}`
                    )
                  }
                />
              );
            })}
      </div>
      <Footer />
    </motion.div>
  );
}

export default AllLaporan;
