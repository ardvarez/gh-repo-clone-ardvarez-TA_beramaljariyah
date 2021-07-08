import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";

import MainProgramDetailHeader from "../components/cards/MainProgramDetailHeader";
import TentangProgram from "../components/cards/TentangProgram";
import LaporanProgram from "../components/cards/Laporan";
import DonaturProgram from "../components/cards/Donatur";
import Footer from "../components/cards/Footer";
import ProgramTransactions from "../components/buttons/ProgramTransactions";
import Loading from "../components/cards/Loading";

function DetailProgram() {
  const { program, idProgram } = useParams();
  const navigate = useHistory();

  const [data, setData] = useState({
    program: {},
    pengelola: {},
    laporan: [],
    donatur: [],
    totalDonatur: 0,
    danaTerkumpul: 0,
    load: true,
  });

  const getData = async () => {
    //get program
    const program = await axios
      .get(`http://localhost:5000/programs/${idProgram}`)
      .then((result) => result.data);

    //get program pengelola
    const pengelola = await axios
      .get(`http://localhost:5000/users?id=${program.userId}`)
      .then((result) => result.data[0]);

    //get program transactions
    const transactions = await axios
      .get(
        `http://localhost:5000/programs/${idProgram}/transactionsUser?_sort=date&_order=desc`
      )
      .then((result) => result.data);

    //modified program transactions, group by date
    const transactionsDate = transactions.map((item) => item.date);

    let transactionsDateGroup = [];

    for (let i = 0; i < transactionsDate.length; i++) {
      if (transactionsDate[i] != transactionsDate[i + 1]) {
        transactionsDateGroup.push(transactionsDate[i]);
      }
    }

    const newTransactionsData = [];

    for (let i = 0; i < transactionsDateGroup.length; i++) {
      const filteredTransactions = transactions.filter(
        (item) => item.date == transactionsDate[i]
      );

      let modifiedTransactions = [];

      for (let x = 0; x < filteredTransactions.length; x++) {
        const getUser = await axios
          .get(
            `http://localhost:5000/users?id=${filteredTransactions[x].userId}`
          )
          .then((result) => result.data[0]);

        const newData = {
          ...filteredTransactions[x],
          user: getUser,
        };

        modifiedTransactions.push(newData);
      }

      const data = {
        date: transactionsDateGroup[i],
        newTransactions: modifiedTransactions,
      };

      newTransactionsData.push(data);
    }

    //get program laporan
    const laporan = await axios
      .get(`http://localhost:5000/programs/${idProgram}/laporan`)
      .then((result) => result.data);

    //modified data program, group by date
    const laporanDate = laporan.map((item) => item.date);

    let laporanDateGroup = [];

    for (let i = 0; i < laporanDate.length; i++) {
      if (laporanDate[i] != laporanDate[i + 1]) {
        laporanDateGroup.push(laporanDate[i]);
      }
    }

    let newLaporanData = [];

    for (let i = 0; i < laporanDateGroup.length; i++) {
      const filteredLaporan = laporan.filter(
        (item) => item.date == laporanDateGroup[i]
      );

      const data = {
        date: transactionsDateGroup[i],
        newLaporan: filteredLaporan,
      };

      newLaporanData.push(data);
    }

    //get total dana
    let totalDana = 0;

    for (let i = 0; i < transactions.length; i++) {
      totalDana += transactions[i].total;
    }

    setData({
      program,
      pengelola,
      laporan: newLaporanData,
      donatur: newTransactionsData,
      totalDonatur: transactions.length,
      danaTerkumpul: totalDana,
      load: false,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="d-flex flex-column align-items-center"
      style={{ paddingTop: 90 }}
    >
      {data.load ? (
        <Loading />
      ) : (
        <>
          <MainProgramDetailHeader
            danaTerkumpul={data.danaTerkumpul}
            targetDana={data.program.target}
            image={data.program.image}
            title={data.program.title}
            totalDonatur={data.totalDonatur}
            pengelola={data.pengelola.name}
          />
          {/* <Penerima /> */}
          {/* <Share url={path.pathname} /> */}
          <Tabs style={{ width: "80%" }}>
            <TabList>
              <Tab>Tentang</Tab>
              <Tab>Laporan</Tab>
              <Tab>Donatur</Tab>
            </TabList>

            <TabPanel>
              <TentangProgram tentangProgram={data.program} />
            </TabPanel>
            <TabPanel>
              <LaporanProgram
                urlProgram={data.program.type}
                urlIdProgram={data.program.id}
                data={data.laporan}
              />
            </TabPanel>
            <TabPanel>
              <DonaturProgram data={data.donatur} />
            </TabPanel>
          </Tabs>
        </>
      )}
      <ProgramTransactions
        action={() => navigate.push(`/${program}/${idProgram}/transaction`)}
        title={program.toUpperCase() + " SEKARANG"}
      />
      <Footer />
    </motion.div>
  );
}

export default DetailProgram;
