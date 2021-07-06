/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toRupiah from "@develoka/angka-rupiah-js";
import Switch from "react-switch";

import { UserContext } from "../contexts/userContext";

import Footer from "../components/cards/Footer";

import DefaultUser from "../assets/user_default.png";
import EditIcon from "../assets/edit-button.png";
import Pending from "../assets/payment.png";
import Success from "../assets/credit-card.png";
import WhatsApp from "../assets/icon_whatsApp.png";
import Logout from "../assets/logout_green.png";
import DetailIcon from "../assets/arrow-next.png";
import Loading from "../components/cards/Loading";

function Profile() {
  const [toggle, setToggle] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);
  const navigate = useHistory();

  const [user, setUser] = useState({
    data: {},
    transactions: [],
    totalTransaction: 0,
    totalDonate: 0,
    load: true,
  });

  const getData = async () => {
    const userId = localStorage.token;

    const getUser = await axios
      .get(`http://localhost:5000/users/${userId}`)
      .then((result) => result.data);

    const getTotalTransaction = await axios
      .get(`http://localhost:5000/users/${userId}/transactionsUser`)
      .then((result) => result.data);
    console.log(getTotalTransaction);

    let total = 0;

    for (let x = 0; x < getTotalTransaction.length; x++) {
      total += getTotalTransaction[x].total;
    }

    setUser({
      data: getUser,
      transactions: getTotalTransaction,
      totalTransaction: total,
      totalDonate: getTotalTransaction.length,
      load: false,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const logout = () => {
    setUserContext({
      type: "LOGOUT",
    });
    navigate.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 90 }}
      className="d-flex flex-column align-items-center"
    >
      {user.load ? (
        <Loading />
      ) : (
        <>
          <div className="w-80 transaction-wrapper">
            <TopContent
              dataUser={user.data}
              totalDonate={user.totalDonate}
              totalTransaction={user.totalTransaction}
            />
          </div>
          <div
            className="w-80 transaction-wrapper py-2 px-4 edit-profile"
            style={{ marginBottom: 10, marginTop: 20 }}
          >
            <div className="w-100 d-flex justify-content-between">
              <div className="left d-flex align-items-center">
                <img src={EditIcon} alt="edit icon" />
                <span style={{ marginLeft: 15, fontSize: 24 }}>
                  Edit Profile
                </span>
              </div>
              <img
                src={DetailIcon}
                alt="detail icon"
                style={{ cursor: "pointer" }}
                onClick={() => navigate.push("/edit-profile")}
              />
            </div>
          </div>
          <div
            className="w-80 transaction-wrapper py-2 px-4 pending-transaction"
            style={{ marginBottom: 10 }}
          >
            <div className="w-100 d-flex justify-content-between">
              <div className="left d-flex align-items-center">
                <img src={Pending} alt="edit icon" />
                <span style={{ marginLeft: 15, fontSize: 24 }}>
                  Transaksi Pending
                </span>
              </div>
              <img
                src={DetailIcon}
                alt="detail icon"
                style={{ cursor: "pointer" }}
                onClick={() => navigate.push("/pending-transaction")}
              />
            </div>
          </div>
          <div
            className="w-80 transaction-wrapper py-2 px-4 success-transaction"
            style={{ marginBottom: 10 }}
          >
            <div className="w-100 d-flex justify-content-between">
              <div className="left d-flex align-items-center">
                <img src={Success} alt="edit icon" />
                <span style={{ marginLeft: 15, fontSize: 24 }}>
                  Transaksi Sukses
                </span>
              </div>
              <img
                src={DetailIcon}
                alt="detail icon"
                style={{ cursor: "pointer" }}
                onClick={() => navigate.push("/success-transaction")}
              />
            </div>
          </div>
          <div
            className="w-80 transaction-wrapper py-2 px-4 notification"
            style={{ marginBottom: 10 }}
          >
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div className="left d-flex align-items-center">
                <img src={WhatsApp} alt="edit icon" />
                <span style={{ marginLeft: 15, fontSize: 24 }}>
                  Saya mau menerima kabar baik lewat WhatsApp
                </span>
              </div>
              <Switch
                checked={toggle}
                onChange={() => {
                  setToggle(!toggle);
                }}
              />
            </div>
          </div>
          <div
            className="w-80 transaction-wrapper py-2 px-4 Logout"
            style={{ marginBottom: 10 }}
          >
            <div className="w-100 d-flex justify-content-between">
              <div className="left d-flex align-items-center">
                <img src={Logout} alt="edit icon" />
                <span style={{ marginLeft: 15, fontSize: 24 }}>Keluar</span>
              </div>
              <img
                src={DetailIcon}
                alt="detail icon"
                style={{ cursor: "pointer" }}
                onClick={() => logout()}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </motion.div>
  );
}

const TopContent = (props) => {
  const { dataUser, totalDonate, totalTransaction } = props;

  return (
    <div className="d-flex flex-column w-100">
      <div
        className="d-flex align-items-center"
        style={{ margin: "40px 50px 0" }}
      >
        <img src={DefaultUser} alt="User Image" />
        <div className="d-flex flex-column mx-3">
          <span style={{ fontWeight: "bolder", fontSize: 36 }}>
            {dataUser.name}
          </span>
          <span style={{ fontSize: 26 }}>{dataUser.phone}</span>
        </div>
      </div>
      <div
        className="d-flex justify-content-between align-items-center w-100"
        style={{
          backgroundColor: "#006641",
          color: "#fff",
          borderRadius: 15,
          marginTop: 20,
          padding: "10px 0",
        }}
      >
        <div
          className="d-flex flex-column align-items-center"
          style={{ flexGrow: 1 }}
        >
          <span>Donasi</span>
          <span>{totalDonate}</span>
        </div>
        <div
          className="d-flex flex-column align-items-center"
          style={{ flexGrow: 1 }}
        >
          <span>Total Donasi</span>
          <span>{toRupiah(parseInt(totalTransaction), { formal: false })}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
