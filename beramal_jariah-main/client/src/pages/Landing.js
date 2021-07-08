import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

import Slider from "../components/slider/Slider";
import Program from "../components/cards/Program";
import LandingBottom from "../components/cards/TotalProgram";
import KenclengOnline from "../components/cards/KenclengOnline";
import MainProgram from "../components/cards/MainProgram";
import Footer from "../components/cards/Footer";
import Loading from "../components/cards/Loading";

import LgDetailIcon from "../assets/lg-detail-icon.png";

function Landing() {
  const navigate = useHistory();

  const [datas, setDatas] = useState({
    programs: [],
    laporans: [],
    wakaf: [],
    infak: [],
    totalDana: 0,
    totalProgram: 0,
    load: true,
  });

  const getDataPrograms = async () => {
    //get program data
    let getPrograms = await axios
      .get("http://localhost:5000/programs?_start=0&_end=3")
      .then((result) => result.data);

    let getProgramTransactions = [];

    for (let i = 0; i < getPrograms.length; i++) {
      const getTotalTransaction = await axios
        .get(
          `http://localhost:5000/programs/${getPrograms[i].id}/transactionsUser`
        )
        .then((result) => result.data);
      let total = 0;

      for (let x = 0; x < getTotalTransaction.length; x++) {
        total += getTotalTransaction[x].total;
      }

      const modifiedData = {
        ...getPrograms[i],
        danaTerkumpul: total,
        donatur: getTotalTransaction.length,
      };

      getProgramTransactions.push(modifiedData);
    }

    //get wakaf program
    const wakafProgram = await axios
      .get("http://localhost:5000/programs?type=wakaf&_start=0&_end=3")
      .then((res) => res.data);
      console.log("wakaf :", wakafProgram);

    let wakafProgramTransaction = [];

    for (let i = 0; i < wakafProgram.length; i++) {
      const getTotalTransaction = await axios
        .get(
          `http://localhost:5000/programs/${wakafProgram[i].id}/transactionsUser`
        )
        .then((result) => result.data);
      let total = 0;

      for (let x = 0; x < getTotalTransaction.length; x++) {
        total += getTotalTransaction[x].total;
      }

      const modifiedData = {
        ...wakafProgram[i],
        danaTerkumpul: total,
        donatur: getTotalTransaction.length,
      };

      wakafProgramTransaction.push(modifiedData);
    }

    const infakProgram = await axios
      .get("http://localhost:5000/programs?type=infak&_start=0&_end=3")
      .then((res) => res.data); 
      console.log("infak :",infakProgram);

    let infakProgramTransaction = [];

    for (let i = 0; i < infakProgram.length; i++) {
      const getTotalTransaction = await axios
        .get(
          `http://localhost:5000/programs/${infakProgram[i].id}/transactionsUser`
        )
        .then((result) => result.data);
      let total = 0;

      for (let x = 0; x < getTotalTransaction.length; x++) {
        total += getTotalTransaction[x].total;
      }

      const modifiedData = {
        ...infakProgram[i],
        danaTerkumpul: total,
        donatur: getTotalTransaction.length,
      };

      infakProgramTransaction.push(modifiedData);
    }

    console.log("wakaf tf :", wakafProgramTransaction);
    console.log("infak tf :", infakProgramTransaction);

    //get laporan data
    const getLaporan = await axios
      .get(
        "http://localhost:5000/laporan?_start=0&_end=3&_sort=date&_order=desc"
      )
      .then((result) => result.data);

    let getLaporanProgram = [];

    for (let i = 0; i < getLaporan.length; i++) {
      let modifiedData = {};
      await axios
        .get(`http://localhost:5000/programs?id=${getLaporan[i].programId}`)
        .then(
          (result) =>
            (modifiedData = {
              laporan: getLaporan[i],
              program: result.data[0],
            })
        );

      getLaporanProgram.push(modifiedData);
    }

    let laporanProgramTransaction = [];

    for (let x = 0; x < getLaporanProgram.length; x++) {
      const dataTransaction = await axios
        .get(
          `http://localhost:5000/programs/${getLaporanProgram[x].laporan.id}/transactionsUser`
        )
        .then((result) => result.data);

      let totalTransaction = 0;

      for (let y = 0; y < dataTransaction.length; y++) {
        totalTransaction += dataTransaction[y].total;
      }

      const newDataTransaction = {
        ...getLaporanProgram[x],
        danaTerkumpul: totalTransaction,
        donatur: dataTransaction.length,
      };

      laporanProgramTransaction.push(newDataTransaction);
    }

    //get all transactions total and total program
    const allPrograms = await axios
      .get("http://localhost:5000/programs")
      .then((result) => result.data);

    const getTotalTransactions = await axios
      .get("http://localhost:5000/transactionsUser")
      .then((result) => result.data);

    let totalDana = 0;

    for (let a = 0; a < getTotalTransactions.length; a++) {
      totalDana += getTotalTransactions[a].total;
    }

    setDatas({
      programs: getProgramTransactions,
      laporans: laporanProgramTransaction,
      wakaf: wakafProgramTransaction,
      infak: infakProgramTransaction,
      totalDana: totalDana,
      totalProgram: allPrograms.length,
      load: false,
    });
  };
  useEffect(() => {
    getDataPrograms();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh", paddingTop: 90 }}
    >
      <Slider />
      <KenclengOnline />
      <div
        className="program-card-wrapper card-shadow-bold py-3 px-4"
        style={{
          width: 1037,
          borderRadius: 15,
          marginTop: 50,
          backgroundColor: "#fff",
        }}
      >
        <h1
          style={{
            fontFamily: "Open Sans",
            color: "#006641",
            fontWeight: "bolder",
            fontSize: 28,
          }}
        >
          Program Utama
        </h1>
        <h2
          style={{
            fontFamily: "Open Sans",
            color: "#006641",
            fontWeight: "reguler",
            fontSize: 18,
          }}
        >
          Kunjungi Program Utama untuk Berpartisipasi dalam Kegiatan Sosial
          Kami!
        </h2>
        <MainProgram />
      </div>
      {datas.load ? (
        <Loading />
      ) : (
        <>
          <div
            className="program-card-wrapper card-shadow-bold py-3 px-4"
            style={{
              width: 1037,
              borderRadius: 15,
              marginTop: 50,
              backgroundColor: "#fff",
            }}
          >
            <div className="program-card-title">
              <h1
                style={{
                  fontFamily: "Open Sans",
                  color: "#006641",
                  fontWeight: "bolder",
                  fontSize: 28,
                }}
              >
                Daftar Program Wakaf Terbaru
              </h1>
              <hr
                style={{
                  color: "#006641",
                  backgroundColor: "#006641",
                  height: 5,
                }}
              ></hr>
            </div>
            <div className="w-100 program-card-content d-flex justify-content-between mt-2">
              {datas.wakaf.map((item) => {
                return (
                  <Program
                    withPengelola={false}
                    title={item.title}
                    image={item.image}
                    donatur={item.donatur}
                    danaTerkumpul={item.danaTerkumpul}
                    target={item.target}
                    style={{ marginBottom: 8, width: "20rem", marginTop: 10 }}
                    action={() => navigate.push(`/${item.type}/${item.id}`)}
                  />
                );
              })}
            </div>
            <div
              className="program-card-detail w-100 d-flex justify-content-end mt-3"
              style={{ cursor: "pointer" }}
            >
              <div
                className="d-flex align-items-center"
                onClick={() => navigate.push("/wakaf")}
              >
                <span
                  style={{
                    fontFamily: "Open Sans",
                    color: "#006641",
                    fontWeight: "bolder",
                    fontSize: 18,
                    marginRight: 8,
                  }}
                >
                  Lihat Selengkapnya
                </span>
                <img src={LgDetailIcon} alt="Large Detail Icon" height="14px" />
              </div>
            </div>
          </div>
          <div
            className="program-card-wrapper card-shadow-bold py-3 px-4"
            style={{
              width: 1037,
              borderRadius: 15,
              marginTop: 50,
              backgroundColor: "#fff",
            }}
          >
            <div className="program-card-title">
              <h1
                style={{
                  fontFamily: "Open Sans",
                  color: "#006641",
                  fontWeight: "bolder",
                  fontSize: 28,
                }}
              >
                Daftar Program Infak Terbaru
              </h1>
              <hr
                style={{
                  color: "#006641",
                  backgroundColor: "#006641",
                  height: 5,
                }}
              ></hr>
            </div>
            <div className="w-100 program-card-content d-flex justify-content-between mt-2">
              {datas.infak.map((item) => {
                return (
                  <Program
                    withPengelola={false}
                    title={item.title}
                    image={item.image}
                    donatur={item.donatur}
                    danaTerkumpul={item.danaTerkumpul}
                    target={item.target}
                    style={{ marginBottom: 8, width: "20rem", marginTop: 10 }}
                    action={() => navigate.push(`/${item.type}/${item.id}`)}
                  />
                );
              })}
            </div>
            <div
              className="program-card-detail w-100 d-flex justify-content-end mt-3"
              style={{ cursor: "pointer" }}
            >
              <div
                className="d-flex align-items-center"
                onClick={() => navigate.push("/infak")}
              >
                <span
                  style={{
                    fontFamily: "Open Sans",
                    color: "#006641",
                    fontWeight: "bolder",
                    fontSize: 18,
                    marginRight: 8,
                  }}
                >
                  Lihat Selengkapnya
                </span>
                <img src={LgDetailIcon} alt="Large Detail Icon" height="14px" />
              </div>
            </div>
          </div>
          <div
            className="program-card-wrapper card-shadow-bold py-3 px-4"
            style={{
              width: 1037,
              borderRadius: 15,
              marginTop: 50,
              backgroundColor: "#fff",
            }}
          >
            <div className="program-card-title">
              <h1
                style={{
                  fontFamily: "Open Sans",
                  color: "#006641",
                  fontWeight: "bolder",
                  fontSize: 28,
                }}
              >
                Daftar Laporan Terbaru
              </h1>
              <hr
                style={{
                  color: "#006641",
                  backgroundColor: "#006641",
                  height: 5,
                }}
              ></hr>
            </div>
            <div className="w-100 program-card-content d-flex justify-content-between mt-2">
              {datas.laporans.map((item) => {
                return (
                  <Program
                    withPengelola={false}
                    title={item.laporan.title}
                    image={item.laporan.image}
                    donatur={item.donatur}
                    danaTerkumpul={item.danaTerkumpul}
                    target={item.program.target}
                    style={{ marginBottom: 8, width: "20rem", marginTop: 10 }}
                    action={() =>
                      navigate.push(
                        `/${item.program.type}/${item.program.id}/laporan-detail/${item.laporan.id}`
                      )
                    }
                  />
                );
              })}
            </div>
            <div
              className="program-card-detail w-100 d-flex justify-content-end mt-3"
              style={{ cursor: "pointer" }}
            >
              <div
                className="d-flex align-items-center"
                onClick={() => navigate.push("/all-laporan")}
              >
                <span
                  style={{
                    fontFamily: "Open Sans",
                    color: "#006641",
                    fontWeight: "bolder",
                    fontSize: 18,
                    marginRight: 8,
                  }}
                >
                  Lihat Selengkapnya
                </span>
                <img src={LgDetailIcon} alt="Large Detail Icon" height="14px" />
              </div>
            </div>
          </div>
          <LandingBottom
            totalDana={datas.totalDana}
            totalProgram={datas.totalProgram}
            style={{ marginTop: 40 }}
          />
          <Footer />
        </>
      )}
    </motion.div>
  );
}

export default Landing;
