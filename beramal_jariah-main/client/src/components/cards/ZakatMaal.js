import { motion } from "framer-motion";

import MaalForm from "../Forms/Maal";

function ZakatMaal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-100 bg-light"
      style={{ minHeight: "calc(100vh - 249px)" }}
    >
      <div
        className="d-flex flex-column m-auto"
        style={{ backgroundColor: "transparent", width: "80%" }}
      >
        <span>Zakat Maal merupakan zakat yang dikenakan atas harta yang dimiliki oleh individu</span>
        <MaalForm />
      </div>
    </motion.div>
  );
}

export default ZakatMaal;
