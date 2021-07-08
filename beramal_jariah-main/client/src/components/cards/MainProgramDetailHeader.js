/* eslint-disable jsx-a11y/img-redundant-alt */
import toRupiah from "@develoka/angka-rupiah-js";
import { ProgressBar } from "react-bootstrap";
import { useLocation } from "react-router";

import Share from "../buttons/Share";

function MainProgramDetailHeader(props) {
  const { danaTerkumpul, targetDana } = props;
  const urlShare = useLocation()

  const persentage = Math.ceil(
    (parseInt(danaTerkumpul) / parseInt(targetDana)) * 100
  );

  return (
    <div className="d-flex justify-content-between" style={{ width: "80%" }}>
      <div className="program-image">
        <img
          src={props.image}
          alt="example image"
          width="340px"
          height="246px"
        />
      </div>
      <div className="program-information d-flex flex-column" style={{ width: "65%",position: "relative" }}>
        <div
          className="program-information-title"
          style={{
            fontFamily: "open sans",
            fontSize: 24,
            fontWeight: "bolder",
          }}
        >
          {props.title}
        </div>
        <div className="program-information-pengelola">
          <span style={{
            fontWeight: "normal",
          }}>
            Pengelola : &nbsp;
            <span
              style={{
                color: "#006641",
                fontWeight: "bolder",
              }}
            >
              {props.pengelola}
            </span>
          </span>
        </div>
        <div className="program-information-donation">
          <ProgressBar
            animated
            variant="success"
            now={persentage}
            style={{ height: 5, marginBottom: 10, marginTop: 25 }}
          />
          <div className="w-100 d-flex justify-content-between align-items-center">
            <div className="donate-section d-flex flex-column">
              <span>Donatur</span>
              <span
                style={{
                  fontFamily: "open sans",
                  color: "#006641",
                  fontWeight: "bolder",
                  fontSize: 18,
                }}
              >
                {props.totalDonatur}
              </span>
            </div>
            <div className="money-section d-flex flex-column">
              <span>Terkumpul</span>
              <span
                style={{
                  fontFamily: "open sans",
                  color: "#006641",
                  fontWeight: "bolder",
                  fontSize: 18,
                }}
              >
                {toRupiah(parseInt(danaTerkumpul), { formal: false })}
              </span>
            </div>
            <div className="money-section d-flex flex-column">
              <span>Target</span>
              <span
                style={{
                  fontFamily: "open sans",
                  color: "#006641",
                  fontWeight: "bolder",
                  fontSize: 18,
                }}
              >
                {toRupiah(parseInt(targetDana), { formal: false })}
              </span>
            </div>
          </div>
        </div>
        <Share url={urlShare} style={{ position: "absolute", bottom: 0, width: "100%" }} />
      </div>
    </div>
  );
}

export default MainProgramDetailHeader;
