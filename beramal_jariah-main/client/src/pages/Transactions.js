import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import TransactionHeaderForm from "../components/cards/TransactionHeaderForm";
import WakafForm from "../components/Forms/WakafForm";
import InfaqForm from "../components/Forms/InfaqForm";
import Footer from "../components/cards/Footer";
import Loading from "../components/cards/Loading";

function Transactions() {
  const { program, idProgram } = useParams();

  const [data, setData] = useState({
    program: {},
    load: true,
  });

  const getData = async () => {
    await axios
      .get(`http://localhost:5000/programs/${idProgram}`)
      .then((result) => {
        setData({
          program: result.data,
          load: false,
        });
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
      {data.load ? (
        <Loading />
      ) : (
        <div className="w-80 transaction-wrapper p-4">
          <TransactionHeaderForm
            title={data.program.title}
            image={data.program.image}
            program={program}
          />
          {program == "wakaf" ? (
            <WakafForm programType={program} />
          ) : (
            <InfaqForm programType={program} />
          )}
        </div>
      )}
      <Footer />
    </motion.div>
  );
}

export default Transactions;
