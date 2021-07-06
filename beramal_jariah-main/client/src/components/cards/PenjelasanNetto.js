import { motion } from "framer-motion";

function PenjelasanNetto() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-80 d-flex flex-column"
    >
      <span>Zakat Penghasilan Netto merupakan Metode perhitungan zakat bersih dengan </span>
      <span>dikurangi biaya operasional dan hutang</span>
    </motion.div>
  );
}

export default PenjelasanNetto;
