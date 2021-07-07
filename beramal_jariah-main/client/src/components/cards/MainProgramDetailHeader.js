/* eslint-disable jsx-a11y/img-redundant-alt */
import toRupiah from "@develoka/angka-rupiah-js";
import { ProgressBar } from "react-bootstrap";

function MainProgramDetailHeader(props) {
  const { danaTerkumpul, targetDana } = props;

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
      <div className="program-information" style={{ width: "60%" }}>
        <div
          className="program-information-title"
          style={{
            fontFamily: "Pathway Gothic One",
            fontSize: 24,
            fontWeight: "bolder",
          }}
        >
          {props.title}
        </div>
        <div className="program-information-pengelola">
          <span>
            Pengelola : &nbsp;
            <span
              style={{
                color: "#00a441",
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
                  fontFamily: "Pathway Gothic One",
                  color: "#00a441",
                  fontWeight: "bolder",
                  fontSize: 16,
                }}
              >
                {props.totalDonatur}
              </span>
            </div>
            <div className="money-section d-flex flex-column">
              <span>Terkumpul</span>
              <span
                style={{
                  fontFamily: "Pathway Gothic One",
                  color: "#00a441",
                  fontWeight: "bolder",
                  fontSize: 16,
                }}
              >
                {toRupiah(parseInt(danaTerkumpul), { formal: false })}
              </span>
            </div>
            <div className="money-section d-flex flex-column">
              <span>Target</span>
              <span
                style={{
                  fontFamily: "Pathway Gothic One",
                  color: "#00a441",
                  fontWeight: "bolder",
                  fontSize: 16,
                }}
              >
                {toRupiah(parseInt(targetDana), { formal: false })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainProgramDetailHeader;
