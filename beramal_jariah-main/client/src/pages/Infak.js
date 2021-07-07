import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import MainProgramInformationHeader from "../components/cards/MainProgramInformationHeader";
import Program from "../components/cards/Program";
import Footer from "../components/cards/Footer";
import Loading from "../components/cards/Loading";

function Infak() {
  const navigation = useHistory();
  const [infaqPrograms, setInfaqPrograms] = useState({
    data: [],
    totalDana: 0,
    totalProgram: 0,
    load: true,
  });

  const getData = async () => {
    try {
      const dataPrograms = await axios
        .get("http://localhost:5000/programs?type=infak")
        .then((result) => result.data);

      let dataModified = [];

      for (let i = 0; i < dataPrograms.length; i++) {
        const getPengelola = await axios
          .get(`http://localhost:5000/users?id=${dataPrograms[i].userId}`)
          .then((result) => result.data[0]);

        const getTotalTransaction = await axios
          .get(
            `http://localhost:5000/programs/${dataPrograms[i].id}/transactionsUser`
          )
          .then((result) => result.data);

        let total = 0;

        for (let x = 0; x < getTotalTransaction.length; x++) {
          total += getTotalTransaction[x].total;
        }

        const modifiedData = {
          program: dataPrograms[i],
          pengelola: getPengelola,
          danaTerkumpul: total,
          donatur: getTotalTransaction.length,
        };

        dataModified.push(modifiedData);
      }

      let totalDana = 0;

      for (let x = 0; x < dataModified.length; x++) {
        totalDana += dataModified[x].danaTerkumpul;
      }

      setInfaqPrograms({
        data: dataModified,
        totalDana,
        totalProgram: dataPrograms.length,
        load: false,
      });
      console.log(infaqPrograms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigateTo = (program, idProgram) => {
    return navigation.push(`/${program}/${idProgram}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 90 }}
      className="d-flex flex-column align-items-center w-100"
    >
      {infaqPrograms.load ? (
        <Loading />
      ) : (
        <>
          <MainProgramInformationHeader
            title="Infak"
            totalDana={infaqPrograms.totalDana}
            totalProgram={infaqPrograms.totalProgram}
          />

          <div
            className="d-flex flex-wrap justify-content-around py-4 align-items-center"
            style={{
              width: "80%",
              borderRadius: 10,
            }}
          >
            {infaqPrograms.data.map((item) => {
              return (
                <Program
                  withPengelola={true}
                  pengelola={item.pengelola.name}
                  title={item.program.title}
                  target={item.program.target}
                  image={item.program.image}
                  danaTerkumpul={item.danaTerkumpul}
                  donatur={item.donatur}
                  style={{ marginBottom: 15, width: "21rem" }}
                  action={() => navigateTo(item.program.type, item.program.id)}
                />
              );
            })}
          </div>
          <Footer />
        </>
      )}
    </motion.div>
  );
}

export default Infak;
