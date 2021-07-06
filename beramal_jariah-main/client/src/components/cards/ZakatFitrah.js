import { motion } from "framer-motion";

import FitrahForm from "../Forms/Fitrah";

function ZakatFitrah() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-100 bg-light"
      style={{ minHeight: "calc(100vh - 249px)", marginTop: 90 }}
    >
      <div
        className="d-flex flex-column m-auto"
        style={{ backgroundColor: "transparent", width: "80%" }}
      >
        <FitrahForm />
      </div>
    </motion.div>
  );
}

export default ZakatFitrah;
