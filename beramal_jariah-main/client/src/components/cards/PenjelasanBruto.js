import { motion } from "framer-motion";

function PenjelasanBruto() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-80 d-flex flex-column"
    >
      <span>Zakat Penghasilan bruto merupakan Metode perhitungan zakat kotor </span>
      <span>dengan menghitung total pendapatan dikali 2.5%</span>
    </motion.div>
  );
}

export default PenjelasanBruto;
