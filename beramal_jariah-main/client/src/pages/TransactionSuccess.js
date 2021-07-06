import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

import TransactionSuccessCard from "../components/cards/TransactionSuccessCard";
import Footer from "../components/cards/Footer";
import Loading from "../components/cards/Loading";

function TransactionSuccess() {
  const [data, setData] = useState({
    transaction: [],
    load: true,
  });

  const getData = async () => {
    await axios
      .get(
        `http://localhost:5000/transactionsUser?userId=${localStorage.token}`
      )
      .then((result) =>
        setData({
          transaction: result.data,
          load: false,
        })
      );
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 70 }}
      className="d-flex flex-column align-items-center"
    >
      <div
        className="w-80 transaction-wrapper d-flex flex-column align-items-center p-4"
        style={{ marginBottom: 20 }}
      >
        <span style={{ fontWeight: "bolder", fontSize: 22 }}>
          Klik transaksi untuk melihat detail transaksi
        </span>
      </div>
      {data.load ? (
        <Loading />
      ) : (
        <TransactionSuccessCard transaction={data.transaction} />
      )}
      <Footer />
    </motion.div>
  );
}

export default TransactionSuccess;
