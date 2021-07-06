import toRupiah from "@develoka/angka-rupiah-js";
import Share from "../buttons/Share";

function MainProgramInformationHeader(props) {
  return (
    <div
      className="d-flex justify-content-around py-4 align-items-center"
      style={{ width: "80%" }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center card-shadow-around"
        style={{ width: "48%", backgroundColor: "#fff", borderRadius: 10 }}
      >
        <span
          style={{
            fontFamily: "open sans",
            fontSize: 20,
          }}
        >
          {props.title} Tersedia
        </span>
        <span
          style={{
            fontFamily: "open sans",
            color: "#006641",
            fontWeight: "bolder",
            fontSize: 24,
          }}
        >
          {props.totalProgram}
        </span>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center card-shadow-around"
        style={{ width: "48%", backgroundColor: "#fff", borderRadius: 10 }}
      >
        <span
          style={{
            fontFamily: "open sans",
            fontSize: 20,
          }}
        >
          Dana Terkumpul & Tersalurkan
        </span>
        <span
          style={{
            fontFamily: "open sans",
            color: "#006641",
            fontWeight: "bolder",
            fontSize: 24,
          }}
        >
          {toRupiah(parseInt(props.totalDana), { formal: false })}
        </span>
        
      </div>
    </div>
  );
}

export default MainProgramInformationHeader;
