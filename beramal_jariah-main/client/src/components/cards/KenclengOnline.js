import { useState } from "react";

import KenclengModal from "../modal/Kencleng";

import KenclengOnlineBg from "../../assets/kencleng-online.png";

function KenclengOnline() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className="card-shadow-bold d-flex justify-content-end"
        style={{
          backgroundImage: `url(${KenclengOnlineBg})`,
          backgroundSize: "cover",
          backgroundColor: "#CAF1FF",
          width: 1037,
          height: 450,
          borderRadius: 15,
          marginTop: 30,
          cursor: "pointer",
        }}
        onClick={() => setShow(true)}
      >
        <div
          className="d-flex flex-column"
          style={{ paddingTop: 50, width: "55%" }}
        >
          <span
            style={{
              color: "#00a441",
              fontWeight: 900,
              fontSize: 55,
            }}
          >
            KENCLENG ONLINE
          </span>
          <span
            style={{
              color: "#00a441",
              fontSize: 26,
              marginTop: "-5px",
            }}
          >
            Sumbang tanpa ribet
          </span>
          <span
            style={{
              color: "#00a441",
              fontSize: 26,
              marginTop: "-15px",
            }}
          >
            berapapun kamu mau!
          </span>
          <span
            style={{
              color: "#00a441",
              fontWeight: "bolder",
              fontSize: 32,
              marginTop: 10,
            }}
          >
            Klik untuk sumbang
          </span>
          <span
            style={{
              color: "#00a441",
              fontWeight: "bolder",
              fontSize: 32,
              marginTop: "-20px",
            }}
          >
            sekarang!
          </span>
        </div>
      </div>
      <KenclengModal show={show} setShow={setShow} />
    </>
  );
}

export default KenclengOnline;
