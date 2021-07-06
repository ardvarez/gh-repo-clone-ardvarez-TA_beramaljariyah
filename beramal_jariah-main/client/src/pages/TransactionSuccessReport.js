/* eslint-disable eqeqeq */
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";

import TransactionSuccessDetail from "../components/cards/TransactionSuccessDetail";
import Footer from "../components/cards/Footer";
import Loading from "../components/cards/Loading";

function TransactionSuccessReport() {
  const { id } = useParams();

  const [data, setData] = useState({
    transaction: {},
    program: {},
    load: true,
  });

  const getData = async () => {
    const getTransaction = await axios
      .get(`http://localhost:5000/transactionsUser/${id}`)
      .then((result) => result.data);

    let programData = {};

    if (getTransaction.zakatId == 0) {
      await axios
        .get(`http://localhost:5000/programs/${getTransaction.programId}`)
        .then((result) => (programData = result.data));
    } else {
      await axios
        .get(`http://localhost:5000/zakat/${getTransaction.zakatId}`)
        .then((result) => (programData = result.data));
    }

    setData({
      transaction: getTransaction,
      program: programData,
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
      {data.load ? (
        <Loading />
      ) : (
        <TransactionSuccessDetail transaction={data} />
      )}
      <Footer />
    </motion.div>
  );
}

export default TransactionSuccessReport;
