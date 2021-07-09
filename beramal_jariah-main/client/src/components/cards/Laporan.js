/* eslint-disable jsx-a11y/img-redundant-alt */
import { motion } from "framer-motion";
import toRupiah from "@develoka/angka-rupiah-js";
import { useHistory } from "react-router-dom";
import CustomDate from "../../utils/CustomDate";

import DetailIcon from "../../assets/detail-icon.png";

function Laporan(props) {
  const navigation = useHistory();

  const { data } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: "100%", margin: "30px 0" }}
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
              {item.newLaporan.map((laporan) => {
                return (
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <span className="report-card-title">{laporan.title}</span>
                      <span
                        className="report-card-detail"
                        style={{cursor: "pointer"}}
                        onClick={() =>
                          navigation.push(
                            `/${props.urlProgram}/${props.urlIdProgram}/laporan-detail/${laporan.id}`
                          )
                        }
                      >
                        Selengkapnya <img src={DetailIcon} alt="detail" />
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        padding: 10,
                        backgroundColor: "#e9ecef",
                        borderRadius: 10,
                        padding: "20px 10px 20px 40px",
                      }}
                      className="d-flex flex-column"
                    >
                      <span
                        style={{
                          fontFamily: "Open Sans",
                          color: "#006641",
                          fontSize: 18,
                        }}
                      >
                        Pencairan Dana
                      </span>
                      <span
                        style={{
                          fontFamily: "Open Sans",
                          color: "#006641",
                          fontWeight: "bolder",
                          fontSize: 24,
                        }}
                      >
                        {toRupiah(215000000, { formal: false })}
                      </span>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <img
                        src={laporan.image}
                        alt="laporan image"
                        width="576px"
                        height="368px"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

export default Laporan;
