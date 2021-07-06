/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import toRupiah from "@develoka/angka-rupiah-js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toast } from "react-bootstrap";

function TransactionReportTop(props) {
  const { data } = props;
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);

  const jumlahBayar = () => {
    const total =
      parseInt(data.transaction.programCost) +
      data.transaction.paymentCost +
      parseInt(data.transaction.infaqPengembangan) +
      data.transaction.uniqueCode;
    return total;
  };

  const copiedToast = () => {
    return (
      <Toast
        style={{
          border: "none",
          height: 32,
          position: "fixed",
          bottom: 10,
          backgroundColor: "rgba(0,0,0,.7)",
          width: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClose={() => setToast(false)}
        show={toast}
        animation={true}
        delay={2000}
        autohide
      >
        <span style={{ color: "#fff" }}>Berhasil Disalin</span>
      </Toast>
    );
  };

  const rincianPembayaran = () => {
    return (
      <div
        className="d-flex flex-column align-items-center my-3"
        style={{ width: 620 }}
      >
        <span>Rincian Pembayaran</span>
        <hr style={{ width: "100%" }} />
        <div className="w-100 d-flex justify-content-between">
          <span
            style={{ fontWeight: "bolder" }}
          >{`Jumlah ${data.transaction.programType}`}</span>
          <span style={{ fontWeight: "bolder" }}>{`${toRupiah(
            parseInt(data.transaction.programCost),
            { formal: false }
          )}`}</span>
        </div>
        <hr style={{ width: "100%" }} />
        <div className="w-100 d-flex justify-content-between">
          <span style={{ fontWeight: "bolder" }}>
            Infak Pengembangan Teknologi
          </span>
          <span style={{ fontWeight: "bolder" }}>{`${toRupiah(
            parseInt(data.transaction.infaqPengembangan),
            { formal: false }
          )}`}</span>
        </div>
        <hr style={{ width: "100%" }} />
        <div className="w-100 d-flex justify-content-between">
          <span style={{ fontWeight: "bolder" }}>Kode Unik</span>
          <span style={{ fontWeight: "bolder" }}>{`${toRupiah(
            parseInt(data.transaction.uniqueCode),
            { formal: false }
          )}`}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-80 transaction-wrapper d-flex flex-column align-items-center p-4">
      <div
        className="total-cost w-100 d-flex flex-column"
        style={{ textAlign: "center" }}
      >
        <span style={{ fontSize: 26 }}>Jumlah Yang Harus Dibayar</span>
        <div className="d-flex w-100 justify-content-center my-3">
          <span style={{ fontSize: 22, fontWeight: 700, marginRight: 8 }}>
            {toRupiah(parseInt(jumlahBayar(), { formal: false }))}
          </span>
          <CopyToClipboard
            text={toRupiah(parseInt(jumlahBayar(), { formal: false }))}
            onCopy={() => setCopied(true)}
          >
            <button
              type="button"
              className="btn-sm btn-secondary"
              onClick={() => setToast(true)}
            >
              Salin
            </button>
          </CopyToClipboard>
          {toast && copiedToast()}
        </div>
        <span style={{ fontStyle: "italic" }}>
          (Lakukan pembayaran sesuai jumlah tagihan di atas hingga 3 digit
          terakhir)
        </span>
      </div>
      {rincianPembayaran()}
      <span>Silahkan selesaikan pembayaran dengan transfer ke rekening:</span>
      <div style={{ marginTop: 5 }}>
        <img
          src={data.transaction.paymentMethod.image}
          alt="Payment Image"
          width="284px"
        />
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ zIndex: 9, marginTop: "0" }}
        >
          <span style={{ fontWeight: "bolder", marginRight: 8, fontSize: 24 }}>
            {data.transaction.paymentMethod.norek}
          </span>
          <CopyToClipboard
            text={data.transaction.paymentMethod.norek}
            onCopy={() => setCopied(true)}
          >
            <button
              type="button"
              className="btn-sm btn-secondary"
              onClick={() => setToast(true)}
            >
              Salin
            </button>
          </CopyToClipboard>
          {toast && copiedToast()}
        </div>
        <p
          style={{
            margin: "20px 0 0",
            textAlign: "center",
            fontWeight: "bolder",
            fontSize: 20,
          }}
        >
          a/n Yayasan Sahabat Beramal Jariah
        </p>
      </div>
    </div>
  );
}

export default TransactionReportTop;
