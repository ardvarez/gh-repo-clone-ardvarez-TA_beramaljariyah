import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import DefaultImage from "../../assets/default-img.png";

function PengelolaCard(props) {
  const navigation = useHistory();

  return (
    <div
      className="d-flex flex-wrap"
      style={{
        width: "75%",
        paddingTop: 25,
        borderRadius: 10,
      }}
    >
      {props?.dataPengelola.map((item) => {
        return (
          <Card
            style={{
              width: 315,
              height: 390,
              borderRadius: 10,
              marginBottom: 25,
              marginRight: 10,
              marginLeft: 10,
            }}
            className="card-bottom-shadow"
          >
            <Card.Img
              variant="top"
              alt= ""
              src={item.photo}
              style={{
                width: "100%",
                height: "50%",
                cursor: "pointer",
                padding: 15,
                backgroundPosition: "center center",
              }}
              onClick={() => navigation.push(`/pengelola/detail/${item.id}`)}
            />
            <Card.Body>
              <Card.Title
                style={{
                  fontFamily: "Open Sans",
                  fontSize: 18,
                  fontWeight: "bolder",
                  color: "#000",
                }}
              >
                {item.name}
              </Card.Title>
              <Card.Text>
                <button
                  type="button"
                  className="pengelola-detail-button btn btn-success"
                  onClick={() =>
                    navigation.push(`/pengelola/detail/${item.id}`)
                  }
                >
                  Lihat Detail
                </button>
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default PengelolaCard;
