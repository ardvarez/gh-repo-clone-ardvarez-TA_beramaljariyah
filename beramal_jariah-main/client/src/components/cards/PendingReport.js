import toRupiah from "@develoka/angka-rupiah-js";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { useContext } from "react";

import { TransactionContext } from "../../contexts/transactionContext";

import Submit from "../buttons/Submit";

function PendingReport(props) {
  const navigate = useHistory();
  const { transaction } = props;

  const [context, transactionContext] = useContext(TransactionContext);

  const paymentCode = () => {
    const randomNumb = Math.floor(Math.random() * 1000000000);

    if (transaction.programType === "wakaf") {
      const code = "wkf_" + randomNumb;
      return code;
    } else if (transaction.programType === "infak") {
      const code = "ifk_" + randomNumb;
      return code;
    } else if (transaction.programType === "zakat") {
      const code = "zkt_" + randomNumb;
      return code;
    } else {
      const code = "kncln_" + randomNumb;
      return code;
    }
  };

  const total = () => {
    return (
      parseInt(transaction.programCost) +
      parseInt(transaction.infaqPengembangan) +
      parseInt(transaction.uniqueCode)
    );
  };

  const actionButton = () => {
    swal(
      "Pembayaran Sukses",
      "Pembayaran sudah dilakukan, semoga apa yang anda lakukan menjadi suatu keberkahan",
      "success"
    ).then(() => {
      transactionContext({ type: "TF_SUCCESS" });
      navigate.push("/profile");
    });
  };

  return (
    <div className="w-80 transaction-wrapper d-flex flex-column align-items-center p-4 mt-4">
      <div className="code-payment w-100 d-flex justify-content-between">
        <span style={{ fontSize: 24 }}>Kode Pembayaran</span>
        <span style={{ fontSize: 24, fontWeight: "bolder" }}>
          {paymentCode()}
        </span>
      </div>
      <hr className="w-100" />
      <div className="program-cost w-100 d-flex justify-content-between">
        <span
          style={{ fontSize: 24 }}
        >{`Jumlah ${transaction.programType}`}</span>
        <span style={{ fontSize: 24, fontWeight: "bolder" }}>
          {toRupiah(parseInt(transaction.programCost), { formal: false })}
        </span>
      </div>
      <hr className="w-100" />
      <div className="infak-pengembangan w-100 d-flex justify-content-between">
        <span style={{ fontSize: 24 }}>{`Infak Pengembangan Teknologi`}</span>
        <span style={{ fontSize: 24, fontWeight: "bolder" }}>
          {toRupiah(parseInt(transaction.infaqPengembangan), { formal: false })}
        </span>
      </div>
      <hr className="w-100" />
      <div className="code-unique w-100 d-flex justify-content-between">
        <span style={{ fontSize: 24 }}>{`Kode Unik`}</span>
        <span style={{ fontSize: 24, fontWeight: "bolder" }}>
          {toRupiah(parseInt(transaction.uniqueCode), { formal: false })}
        </span>
      </div>
      <hr className="w-100" />
      <div className="code-unique w-100 d-flex justify-content-between">
        <span style={{ fontSize: 24 }}>{`Total Pembayaran`}</span>
        <span style={{ fontSize: 24, fontWeight: "bolder" }}>
          {toRupiah(parseInt(total()), { formal: false })}
        </span>
      </div>
      <Submit
        title={"Selesaikan Pembayaran"}
        style={{ marginTop: 25 }}
        onClick={() => actionButton()}
      />
    </div>
  );
}

export default PendingReport;
