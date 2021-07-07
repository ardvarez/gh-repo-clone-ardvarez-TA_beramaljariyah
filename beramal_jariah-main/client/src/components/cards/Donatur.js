import { motion } from "framer-motion";
import toRupiah from "@develoka/angka-rupiah-js";
import CustomDate from "../../utils/CustomDate";

function Donatur(props) {
  const data = props.data;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: "80%", margin: "30px 0" }}
    >
      {data.map((item) => {
        return (
          <div className="report-card d-flex">
            <div
              className="report-card-date px-3"
              style={{ textAlign: "right", width: "15%" }}
            >
              <span style={{ position: "relative", top: "-15px" }}>
                {CustomDate(item.date)}
              </span>
            </div>
            <div className="report-card-content" style={{ width: "85%" }}>
              <div className="point"> </div>
              {item.newTransactions.map((item) => {
                return (
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
                          color: "#000",
                          fontSize: 18,
                        }}
                      >
                        {item.user.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "Pathway Gothic One",
                          color: "#00a441",
                          fontWeight: "bolder",
                          fontSize: 24,
                        }}
                      >
                        {toRupiah(parseInt(item.total), { formal: false })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      ;
    </motion.div>
  );
}

export default Donatur;
