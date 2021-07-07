import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
import toRupiah from "@develoka/angka-rupiah-js";
import CustomDate from "../utils/CustomDate";

import MainProgramDetailHeader from "../components/cards/MainProgramDetailHeader";
import Gallery from "../components/cards/Gallery";
import Footer from "../components/cards/Footer";
import Loading from "../components/cards/Loading";

function LaporanDetail() {
  const { idProgram, idLaporan } = useParams();
  const [data, setData] = useState({
    laporan: {},
    program: {},
    pengelola: {},
    galleries: [],
    danaTerkumpul: 0,
    donatur: 0,
    load: true,
  });

  const getData = async () => {
    //get laporan by id
    const laporan = await axios
      .get(`http://localhost:5000/laporan/${idLaporan}`)
      .then((result) => result.data);

    //get laporan program by id program
    const program = await axios
      .get(`http://localhost:5000/programs/${idProgram}`)
      .then((result) => result.data);

    //get dana terkumpul and total donatur by laporan program
    const transactions = await axios
      .get(`http://localhost:5000/programs/${idProgram}/transactionsUser`)
      .then((result) => result.data);

    let totalTransaction = 0;

    for (let i = 0; i < transactions.length; i++) {
      totalTransaction += transactions[i].total;
    }

    //get pengelola laporan program by userId in program
    const pengelola = await axios
      .get(`http://localhost:5000/users/${program.userId}`)
      .then((result) => result.data);

    //get photo galleries of laporan
    const galleries = await axios
      .get(`http://localhost:5000/laporan/${idLaporan}/galleries`)
      .then((result) => result.data);

    setData({
      laporan,
      program,
      pengelola,
      galleries,
      danaTerkumpul: totalTransaction,
      donatur: transactions.length,
      load: false,
    });
  };
  console.log(data);

  useEffect(() => {
    getData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="d-flex flex-column align-items-center w-100"
      style={{ paddingTop: 90 }}
    >
      {data.load ? (
        <Loading />
      ) : (
        <>
          <MainProgramDetailHeader
            pengelola={data.pengelola.name}
            image={data.program.image}
            targetDana={data.program.target}
            title={data.program.title}
            danaTerkumpul={data.danaTerkumpul}
            totalDonatur={data.donatur}
          />
          <div className="d-flex flex-column" style={{ width: "80%" }}>
            <div className="my-3 w-100">
              <Card>
                <Card.Header
                  style={{
                    fontFamily: "Pathway Gothic One",
                    fontWeight: "bolder",
                  }}
                >
                  <span>Laporan</span>
                </Card.Header>
                <Card.Body style={{ fontFamily: "Pathway Gothic One" }}>
                  {CustomDate(data.laporan.date)}
                </Card.Body>
              </Card>
              <div className="d-flex flex-column w-100 my-2 bg-light">
                <div
                  style={{
                    width: "100%",
                    padding: 10,
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
              <div
                className="w-100 d-flex flex-column text-justify"
                dangerouslySetInnerHTML={{ __html: data.laporan.description }}
              ></div>
            </div>
          </div>
          <Gallery photos={data.galleries} />
        </>
      )}
      <Footer />
    </motion.div>
  );
}

export default LaporanDetail;
