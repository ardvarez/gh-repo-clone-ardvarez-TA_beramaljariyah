import ExampleImage from "../../assets/example.png";

function Penerima() {
  return (
    <div
      className="d-flex flex-column align-items-center card-bottom-shadow"
      style={{ width: "80%", marginTop: 30, padding: "10px 0" }}
    >
      <span
        style={{
          fontFamily: "Pathway Gothic One",
          fontSize: 24,
          fontWeight: "bolder",
        }}
      >
        Penerima Manfaat
      </span>
      <div className="penerima-manfaat-information d-flex align-items-center">
        <img
          src={ExampleImage}
          alt="example image"
          width="32px"
          height="32px"
        />
        <div className="information-text d-flex flex-column mx-2">
          <span
            style={{
              fontFamily: "Pathway Gothic One",
              fontSize: 18,
              fontWeight: "bolder",
            }}
          >
            123
          </span>
          <span
            style={{
              fontFamily: "Pathway Gothic One",
              fontSize: 18,
              marginTop: "-10px",
            }}
          >
            Tunawisma
          </span>
        </div>
      </div>
    </div>
  );
}

export default Penerima;
