import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
import toRupiah from "@develoka/angka-rupiah-js";

import DetailIcon from "../../assets/detail-icon.png";

function LaporanDetail(props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: "80%" }}
      className="my-3"
    >
      <Card>
        <Card.Header
          style={{ fontFamily: "Pathway Gothic One", fontWeight: "bolder" }}
        >
          <span>Laporan</span>
        </Card.Header>
        <Card.Body style={{ fontFamily: "Pathway Gothic One" }}>
          30 Mei 2021
        </Card.Body>
      </Card>
      <div className="d-flex flex-column my-2">
        <div
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#C4C4C4",
            borderRadius: 10,
            padding: "20px 10px 20px 40px",
          }}
          className="d-flex flex-column"
        >
          <span
            style={{
              fontFamily: "Pathway Gothic One",
              color: "#00a441",
              fontSize: 18,
            }}
          >
            Pencairan Dana
          </span>
          <span
            style={{
              fontFamily: "Pathway Gothic One",
              color: "#00a441",
              fontWeight: "bolder",
              fontSize: 24,
            }}
          >
            {toRupiah(215000000, { formal: false })}
          </span>
        </div>
      </div>
      <div className="w-100 d-flex flex-column text-justify">
        <span
          style={{
            fontFamily: "Pathway Gothic One",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
        <span
          style={{
            fontFamily: "Pathway Gothic One",
            fontSize: 18,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim
          facilisis gravida neque convallis a cras semper auctor. Dignissim enim
          sit amet venenatis. Suscipit tellus mauris a diam maecenas sed enim
          ut. Ornare aenean euismod elementum nisi. Tellus in hac habitasse
          platea dictumst vestibulum rhoncus est. Sollicitudin nibh sit amet
          commodo nulla. Ultrices mi tempus imperdiet nulla malesuada
          pellentesque elit eget gravida. Erat imperdiet sed euismod nisi porta
          lorem. Purus viverra accumsan in nisl nisi scelerisque eu ultrices
          vitae. Sit amet purus gravida quis blandit turpis cursus in hac. Purus
          in massa tempor nec feugiat nisl pretium. Lacinia quis vel eros donec
          ac odio tempor orci. Dui sapien eget mi proin sed libero enim sed
          faucibus. Proin fermentum leo vel orci porta non. Egestas quis ipsum
          suspendisse ultrices gravida dictum fusce ut. Cras adipiscing enim eu
          turpis egestas pretium aenean. Dictum non consectetur a erat nam.
          Blandit cursus risus at ultrices. Ipsum dolor sit amet consectetur
          adipiscing elit pellentesque habitant. Vel facilisis volutpat est
          velit egestas. Sit amet nulla facilisi morbi tempus iaculis urna id
          volutpat. Orci eu lobortis elementum nibh tellus molestie nunc non
          blandit. Amet porttitor eget dolor morbi non arcu risus quis.
          Venenatis lectus magna fringilla urna porttitor rhoncus. Ante in nibh
          mauris cursus mattis molestie a iaculis at. Massa ultricies mi quis
          hendrerit dolor magna. Nunc consequat interdum varius sit amet mattis
          vulputate enim nulla. Placerat in egestas erat imperdiet sed euismod.
          Nisi vitae suscipit tellus mauris a.
        </span>
      </div>
    </motion.div>
  );
}

export default LaporanDetail;
