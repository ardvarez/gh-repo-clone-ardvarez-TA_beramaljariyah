import CustomDate from "../../utils/CustomDate";
import toRupiah from "@develoka/angka-rupiah-js";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useLocation } from "react-router-dom";

function TransactionSuccessDetail(props) {
  const { transaction } = props;
  const path = useLocation();
  return (
    <div className="w-80 transaction-wrapper d-flex flex-column p-4">
      <span>Pembayaran Untuk :</span>
      <span style={{ fontWeight: "bolder" }}>{transaction.program.title}</span>
      <hr className="w-100" />
      <div className="w-100 d-flex flex-column align-items-center">
        <span
          style={{ fontSize: 22, fontWeight: "bolder" }}
        >{`Alhamdulillah. Anda telah membayar ${transaction.program.type} sebesar`}</span>
        <span style={{ fontSize: 32, fontWeight: "bolder", margin: "15px 0" }}>
          {toRupiah(parseInt(transaction.transaction.total))}
        </span>
        <span>{`Pada tanggal ${CustomDate(
          transaction.transaction.date
        )}`}</span>
        <div
          className="d-flex flex-column"
          style={{ width: 340, marginTop: 30 }}
        >
          <FacebookShareButton
            url={path.pathname}
            style={{
              backgroundColor: "#3b5998",
              flexGrow: 1,
              borderRadius: 20,
              color: "#fff",
              fontWeight: "bolder",
            }}
          >
            <FacebookIcon round size={40} />
            Share to Facebook
          </FacebookShareButton>
          <WhatsappShareButton
            url={path.pathname}
            style={{
              backgroundColor: "#25D366",
              flexGrow: 1,
              borderRadius: 20,
              color: "#fff",
              fontWeight: "bolder",
              marginTop: 10,
            }}
          >
            <WhatsappIcon round size={40} />
            Share to WhatsApp
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
}

export default TransactionSuccessDetail;
