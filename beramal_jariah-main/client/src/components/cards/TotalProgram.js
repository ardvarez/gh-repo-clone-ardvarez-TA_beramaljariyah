import toRupiah from "@develoka/angka-rupiah-js";

function TotalProgram(props) {
  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-2 card-bottom-shadow"
      style={{
        background: "#fff",
        borderRadius: 10,
        width: 1037,
        ...props.style,
      }}
    >
      <div className="total-program-section w-50 d-flex flex-column text-center">
        <span
          style={{
            fontFamily: "open sans",
            fontSize: 20,
          }}
        >
          TOTAL PROGRAM
        </span>
        <span
          style={{
            fontFamily: "open sans",
            color: "#006641",
            fontWeight: "bolder",
            fontSize: 28,
          }}
        >
          {props.totalProgram}
        </span>
      </div>
      <div className="dana-terkumpul-section w-50 d-flex flex-column text-center">
        <span
          style={{
            fontFamily: "open sans",
            fontSize: 20,
          }}
        >
          DANA TERKUMPUL
        </span>
        <span
          style={{
            fontFamily: "open sans",
            color: "#006641",
            fontWeight: "bolder",
            fontSize: 28,
          }}
        >
          {toRupiah(parseInt(props.totalDana), { formal: false })}
        </span>
      </div>
    </div>
  );
}

export default TotalProgram;
