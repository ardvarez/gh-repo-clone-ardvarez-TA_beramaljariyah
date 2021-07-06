import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";

import Program from "../components/cards/Program";
import TotalProgram from "../components/cards/TotalProgram";
import Footer from "../components/cards/Footer";

function AllPrograms() {
  const [data, setData] = useState({
    programs: [],
    totalAllProgramsTransactions: 0,
    totalAllPrograms: 0,
    load: true,
  });

  const navigation = useHistory();

  const getData = async () => {
    const programs = await axios
      .get("http://localhost:5000/programs")
      .then((result) => result.data);

    const getTransactions = await axios
      .get("http://localhost:5000/transactionsUser")
      .then((result) => result.data);

    let totalAllProgramsTransactions = 0;

    for (let i = 0; i < getTransactions.length; i++) {
      totalAllProgramsTransactions += getTransactions[i].total;
    }

    let modifiedPrograms = [];
    for (let i = 0; i < programs.length; i++) {
      let newData = {};

      const pengelola = await axios
        .get(`http://localhost:5000/users/${programs[i].userId}`)
        .then((result) => result.data);

      const allTransactions = await axios
        .get(
          `http://localhost:5000/transactionsUser?programId=${programs[i].id}`
        )
        .then((result) => result.data);

      let totalProgramCost = 0;

      for (let x = 0; x < allTransactions.length; x++) {
        totalProgramCost += allTransactions[x].total;
      }

      newData = {
        ...programs[i],
        pengelola,
        totalTransactions: totalProgramCost,
        totalDonatur: allTransactions.length,
      };

      modifiedPrograms.push(newData);
    }

    setData({
      programs: modifiedPrograms,
      totalAllProgramsTransactions,
      totalAllPrograms: modifiedPrograms.length,
      load: false,
    });
  };

  const navigateTo = (program, idProgram) => {
    return navigation.push(`/${program}/${idProgram}`);
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
          ? "Load..."
          : data.programs.map((program) => {
              return (
                <Program
                  withPengelola={true}
                  pengelola={program.pengelola.name}
                  title={program.title}
                  target={program.target}
                  image={program.image}
                  danaTerkumpul={program.totalTransactions}
                  donatur={program.totalDonatur}
                  style={{ marginBottom: 15, width: "21rem" }}
                  action={() => navigateTo(program.type, program.id)}
                />
              );
            })}
      </div>
      <Footer />
    </motion.div>
  );
}

export default AllPrograms;
