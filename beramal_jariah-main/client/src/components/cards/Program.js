import { Card, ProgressBar } from "react-bootstrap";
import toRupiah from "@develoka/angka-rupiah-js";

function Program(props) {
  const { danaTerkumpul } = props;
  const persentage = Math.ceil(
    (parseInt(props.danaTerkumpul) / parseInt(props.target)) * 100
  );

  return (
    <Card
      style={{
        cursor: "pointer",
        borderRadius: 10,
        ...props.style,
      }}
      className="card-bottom-shadow"
      onClick={() => props.action()}
    >
      <Card.Img variant="top" src={props?.image} width="340px" height="246px" alt=""/>
      <Card.Body>
        <Card.Title
          style={{
            fontFamily: "Pathway Gothic One",
            fontSize: 24,
            fontWeight: "bolder",
          }}
        >
          {props?.title?.substr(0, 50) + "  ..."}
        </Card.Title>
        <Card.Text>
          {props.withPengelola ? (
            <span>
              Pengelola : &nbsp;
              <span
                style={{
                  fontFamily: "Pathway Gothic One",
                  color: "#00a441",
                  fontWeight: "bolder",
                  fontSize: 14,
                }}
              >
                {props?.pengelola}
              </span>
            </span>
          ) : null}
        </Card.Text>
        <Card.Text>
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
                  color: "#006641",
                  fontWeight: "bolder",
                  fontSize: 16,
                }}
              >
                {props.donatur}
              </span>
            </div>
            <div className="money-section d-flex flex-column">
              <span>Terkumpul</span>
              <span
                style={{
                  fontFamily: "Pathway Gothic One",
                  color: "#006641",
                  fontWeight: "bolder",
                  fontSize: 16,
                }}
              >
                {toRupiah(parseInt(danaTerkumpul), { formal: false })}
              </span>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Program;
