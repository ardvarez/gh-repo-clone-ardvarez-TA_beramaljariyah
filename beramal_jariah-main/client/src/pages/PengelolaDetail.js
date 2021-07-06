import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";

import Program from "../components/cards/Program";
import Footer from "../components/cards/Footer";
import Loading from "../components/cards/Loading";

function PengelolaDetail() {
  const { id } = useParams();

  const [pengelolaDetail, setPengelolaDetail] = useState({
    data: {},
    program: [],
    load: true,
  });

  const getDataPengelola = async () => {
    const pengelola = await axios
      .get(`http://localhost:5000/users/${id}`)
      .then((result) => result.data);

    const pengelolaPrograms = await axios
      .get(`http://localhost:5000/users/${id}/programs`)
      .then((result) => result.data);

    let dataModified = [];

    for (let i = 0; i < pengelolaPrograms.length; i++) {
      const getTotalTransaction = await axios
        .get(
          `http://localhost:5000/programs/${pengelolaPrograms[i].id}/transactionsUser`
        )
        .then((result) => result.data);

      let total = 0;

      for (let x = 0; x < getTotalTransaction.length; x++) {
        total += getTotalTransaction[x].total;
      }

      const modifiedData = {
        ...pengelolaPrograms[i],
        danaTerkumpul: total,
        donatur: getTotalTransaction.length,
      };

      dataModified.push(modifiedData);
    }

    setPengelolaDetail({
      data: pengelola,
      program: dataModified,
      load: false,
    });
  };

  useEffect(() => {
    getDataPengelola();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 90 }}
      className="d-flex flex-column align-items-center"
    >
      {pengelolaDetail.load ? (
        <Loading />
      ) : (
        <>
          <Header
            photo={pengelolaDetail.data.photo}
            name={pengelolaDetail.data.name}
          />
          <Information description={pengelolaDetail.data.description} />
          <AllPrograms programs={pengelolaDetail.program} />
        </>
      )}
      <Footer />
    </motion.div>
  );
}

const Header = (props) => {
  return (
    <div
      className="header-wrapper p-3 d-flex justify-content-between align-items-center card-bottom-shadow"
      style={{ width: "80%" }}
    >
      <img
        src={props?.photo}
        alt="default image"
        width="400px"
        height="200px"
      />
      <span
        style={{
          fontFamily: "Pathway Gothic One",
          color: "#000",
          fontWeight: "bolder",
          fontSize: 46,
          letterSpacing: 2,
          width: "80%",
          textAlign: "center",
        }}
      >
        {props?.name}
      </span>
    </div>
  );
};

const Information = (props) => {
  return (
    <div
      className="information-wrapper d-flex flex-column my-4"
      style={{ width: "80%" }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: props?.description }}
        style={{ textAlign: "justify" }}
      ></div>
    </div>
  );
};

const AllPrograms = (props) => {
  const { programs } = props;
  const navigate = useHistory();

  return (
    <div className="d-flex flex-column" style={{ width: "80%", marginTop: 30 }}>
      <div
        className="w-100 text-center py-2"
        style={{ backgroundColor: "#00a441" }}
      >
        <span
          style={{
            fontFamily: "Pathway Gothic One",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: 18,
          }}
        >
          Daftar Program yang Tersedia :
        </span>
      </div>
      <div className="w-100 d-flex justify-content-around mt-3">
        {programs.map((item) => {
          return (
            <Program
              withPengelola={false}
              title={item.title}
              target={item.target}
              image={item.image}
              danaTerkumpul={item.danaTerkumpul}
              donatur={item.donatur}
              style={{ marginBottom: 15, width: "21rem" }}
              action={() => navigate.push(`/${item.type}/${item.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PengelolaDetail;
