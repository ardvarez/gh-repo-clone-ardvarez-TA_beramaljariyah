import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Prompt, useHistory, Redirect } from "react-router";
import swal from "sweetalert";

import { TransactionContext } from "../contexts/transactionContext";
import { UserContext } from "../contexts/userContext";

import TransactionReportTop from "../components/cards/TransactionReportTop";
import TransactionMessage from "../components/cards/TransactionMessage";
import TransactionPaymentStep from "../components/cards/TransactionPaymentStep";
import Footer from "../components/cards/Footer";
import Next from "../components/buttons/Next";

function TransactionReport() {
  const [transaction, transactionDispatch] = useContext(TransactionContext);
  const [user] = useContext(UserContext);

  const [preventLeave, setPreventLeave] = useState(true);

  const checkAuth = () => {
    if (user.loginStatus) {
      setPreventLeave(false);
    } else {
      setPreventLeave(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (transaction.transaction == null) {
    return <Redirect path="/" />;
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ paddingTop: 90 }}
        className="d-flex flex-column align-items-center"
      >
        <TransactionReportTop data={transaction} />
        <TransactionMessage />
        <TransactionPaymentStep
          step={transaction.transaction.paymentMethod.step}
        />
        {user.loginStatus ? (
          <UserLoggedBtn />
        ) : (
          <UserNotLoggedBtn
            setPreventLeave={setPreventLeave}
            deleteTransaction={transactionDispatch}
          />
        )}
        <Footer />
        <Prompt
          when={preventLeave}
          message={() =>
            `Are you sure you want to leave this page ? the transaction will be deleted`
          }
        />
      </motion.div>
    );
  }
}

const UserNotLoggedBtn = (props) => {
  const navigate = useHistory();
  const action = () => {
    swal("Success", "Pembayaran telah berhasil", "success").then(() => {
      props.deleteTransaction({ type: "TF_SUCCESS" });
      props.setPreventLeave(false);
      navigate.push("/");
    });
  };

  return (
    <div className="w-80 my-3">
      <Next onClick={() => action()} />
    </div>
  );
};

const UserLoggedBtn = () => {
  const navigate = useHistory();
  return (
    <div className="w-80 my-3">
      <Next onClick={() => navigate.push("/pending-transaction")} />
    </div>
  );
};

export default TransactionReport;
