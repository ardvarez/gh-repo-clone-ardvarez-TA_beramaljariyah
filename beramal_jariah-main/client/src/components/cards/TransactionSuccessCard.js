import { useHistory } from "react-router";
import toRupiah from "@develoka/angka-rupiah-js";

import CustomDate from "../../utils/CustomDate";

import DetailTransaction from "../../assets/tf-detail.png";

function TransactionSuccessCard(props) {
  const { transaction } = props;
  const navigate = useHistory();

  return transaction.map((item) => {
    return (
      <div
        className="w-80 transaction-wrapper d-flex justify-content-between align-items-center p-4"
        style={{ marginTop: 15 }}
      >
        <div className="d-flex flex-column">
          <span style={{ fontWeight: "bolder" }}>{item.codePayment}</span>
          <span>{CustomDate(item.date)}</span>
          <span>{toRupiah(parseInt(item.total), { formal: false })}</span>
        </div>
        <img
          src={DetailTransaction}
          alt="Detail Icon"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate.push(`/profile/transaction/${item.id}/detail/report`)
          }
        />
      </div>
    );
  });
}

export default TransactionSuccessCard;
