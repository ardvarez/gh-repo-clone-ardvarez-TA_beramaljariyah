import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BrutoRadioButton from "../buttons/Bruto";
import NettoRadioButton from "../buttons/Netto";
import BrutoForm from "../Forms/Bruto";
import NettoFrom from "../Forms/Netto";

function ZakatPenghasilan() {
  const [brutoNetto, changeBrutoNetto] = useState({
    bruto: true,
    netto: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-100"
      style={{ minHeight: "calc(100vh - 249px)" }}
    >
      <div
        className="d-flex flex-column m-auto"
        style={{ backgroundColor: "transparent", width: "80%" }}
      >
        <div className="navigation d-flex">
          <BrutoRadioButton state={brutoNetto} action={changeBrutoNetto} />
          <NettoRadioButton
            state={brutoNetto}
            action={changeBrutoNetto}
            style={{ marginLeft: 30 }}
          />
        </div>
        <div className="zakat-penghasilan-form">
          {brutoNetto.bruto ? (
            <AnimatePresence exitBeforeEnter>
              <BrutoForm />
            </AnimatePresence>
          ) : (
            <AnimatePresence exitBeforeEnter>
              <NettoFrom />
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ZakatPenghasilan;
