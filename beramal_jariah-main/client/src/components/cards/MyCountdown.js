import Countdown from "react-countdown";

function MyCountdown() {
  const timer = () => {
    const sec = 1000;
    const minutes = 60 * sec;
    const hours = 60 * minutes;
    const day = 24 * hours;

    return day;
  };

  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div
          className="d-flex justify-content-between my-3"
          style={{ width: 475, height: 123 }}
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center card-bottom-shadow"
            style={{
              backgroundColor: "#842029",
              width: 123,
              height: 123,
              color: "#fff",
              borderRadius: 15,
            }}
          >
            <span style={{ fontWeight: "bolder", fontSize: 40 }}>{hours}</span>
            <span
              style={{ fontWeight: "bolder", fontSize: 22, marginTop: "-10px" }}
            >
              Jam
            </span>
          </div>
          <div
            className="d-flex flex-column align-items-center justify-content-center card-bottom-shadow"
            style={{
              backgroundColor: "#842029",
              width: 123,
              height: 123,
              color: "#fff",
              borderRadius: 15,
            }}
          >
            <span style={{ fontWeight: "bolder", fontSize: 40 }}>
              {minutes}
            </span>
            <span
              style={{ fontWeight: "bolder", fontSize: 22, marginTop: "-10px" }}
            >
              Menit
            </span>
          </div>
          <div
            className="d-flex flex-column align-items-center justify-content-center card-bottom-shadow"
            style={{
              backgroundColor: "#842029",
              width: 123,
              height: 123,
              color: "#fff",
              borderRadius: 15,
            }}
          >
            <span style={{ fontWeight: "bolder", fontSize: 40 }}>
              {seconds}
            </span>
            <span
              style={{ fontWeight: "bolder", fontSize: 22, marginTop: "-10px" }}
            >
              Detik
            </span>
          </div>
        </div>
      );
    }
  };
  return (
    <div
      className="w-80 transaction-wrapper d-flex flex-column align-items-center p-4"
      style={{ backgroundColor: "#F8D7DA" }}
    >
      <span style={{ fontWeight: "bolder", fontSize: 22 }}>
        Menunggu Pembayaran
      </span>
      <Countdown date={Date.now() + timer()} renderer={renderer} />
      <span style={{ fontSize: 22 }}>
        Silahkan selesaikan pembayaran sebelum waktu habis
      </span>
    </div>
  );
}

export default MyCountdown;
