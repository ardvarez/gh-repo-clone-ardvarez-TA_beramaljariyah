import { motion } from "framer-motion";
import { useContext } from "react";

import { TransactionContext } from "../contexts/transactionContext";

import NotFound from "../components/cards/NotFound";
import Countdown from "../components/cards/MyCountdown";
import PendingReport from "../components/cards/PendingReport";
import Footer from "../components/cards/Footer";

function PendingTransactionReport() {
  const [transaction] = useContext(TransactionContext);
  const data = transaction.transaction;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 90 }}
      className="d-flex flex-column align-items-center"
    >
      {data == null ? (
        <NotFound
          title="Tidak ada transaksi yang ditunda"
          style={{ margin: "50px 0" }}
        />
      ) : (
        <>
          <Countdown />
          <PendingReport transaction={data} />
        </>
      )}
      <Footer />
    </motion.div>
  );
}

export default PendingTransactionReport;
