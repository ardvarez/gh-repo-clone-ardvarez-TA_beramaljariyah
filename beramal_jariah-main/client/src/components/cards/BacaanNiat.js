import { motion } from "framer-motion";

function BacaanNiat() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-80 d-flex flex-column"
    >
      <span>“Nawaitu an ukhriza zakata maali fardhan lillahi ta’aala."</span>
      <span>
        Aku niat mengeluarkan zakat hartaku fardhu karena Allah Ta’ala.
      </span>
      <span style={{ marginTop: 10 }}>
        Mohon Isi informasi harta Anda untuk memulai kalkulator zakat sekarang:
      </span>
    </motion.div>
  );
}

export default BacaanNiat;
