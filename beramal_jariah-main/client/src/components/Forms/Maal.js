/* eslint-disable eqeqeq */
import { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { useHistory } from "react-router";
import NumberFormat from "react-number-format";
import AsyncSelect from "react-select/async";
import axios from "axios";

import { UserContext } from "../../contexts/userContext";
import { TransactionContext } from "../../contexts/transactionContext";

import UniqueCode from "../../utils/UniqueCode";

import ToggleButton from "../buttons/ZakatToggle";
import NextButton from "../buttons/Next";

function Maal() {
  const [user] = useContext(UserContext);
  const [transaction, setTransaction] = useContext(TransactionContext);

  const navigate = useHistory();

  const [transactionForm, setTransactionForm] = useState({
    paymentId: 0,
    paymentCost: 0,
    programCost: "",
    programType: "zakat",
    infaqPengembangan: 0,
    paymentMethod: {},
    uniqueCode: parseInt(UniqueCode()),
    username: "",
    phone: "",
    userMessage: "",
    message: false,
  });

  const [form, setForm] = useState({
    deposito: "",
    emas: "",
    property: "",
    saham: "",
    hutang: "",
  });

  const disabledState = () => {
    if (user.loginStatus) {
      if (form.deposito == "") {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        form.deposito == "" ||
        form.amilZakat == "" ||
        transactionForm.username == "" ||
        transactionForm.phone == ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const totalZakat = () => {
    const total =
      parseInt(form.deposito) +
      parseInt(form.emas) +
      parseInt(form.property) +
      parseInt(form.saham) -
      parseInt(form.hutang);

    const persentage = parseInt(total) * 0.025;
    return Math.floor(persentage);
  };

  const [payment, setPayment] = useState({
    method: [],
  });

  const getPaymentMethod = async () => {
    const payments = await axios
      .get("http://localhost:5000/payments")
      .then((result) => result.data);

    const modifiedPayments = payments.map((payment) => ({
      value: payment.id,
      label: `${payment.name} +Rp. ${payment.cost}`,
    }));

    setPayment({ method: payments });

    return modifiedPayments;
  };

  const onChangePayment = (e) => {
    const selectedPayment = payment.method.filter((item) => item.id == e.value);
    const paymentCost = selectedPayment[0].cost;

    setTransactionForm({
      ...transactionForm,
      idPayment: e.value,
      paymentCost,
      paymentMethod: selectedPayment[0],
    });
  };

  const getAmilZakat = async () => {
    const getData = await axios
      .get("http://localhost:5000/users?role=pengelola")
      .then((result) => result.data);

    const modifiedData = getData.map((pengelola) => ({
      value: pengelola.id,
      label: `${pengelola.name}`,
    }));

    return modifiedData;
  };

  const submit = () => {
    setTransaction({
      type: "TRANSACTION",
      payload: transactionForm,
    });
    navigate.push("/transaction-report");
  };

  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      border: "1px solid rgba(0,0,0,.5)",
      borderRadius: 10,
      height: 38,
    }),
    placeholder: (styles) => ({
      color: "#545454"
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="form-wrapper d-flex flex-column"
    >
      <div className="w-75">
      <hr></hr>
        <Form>
        <span
            style={{ 
              fontFamily: "open sans",
              fontWeight: "bold",
              fontSize: 14,
            }}>
              Nilai Deposito atau Tabungan
            </span>
          <Form.Row className="my-2">
            {/* this number format value will be return string, to change it type, use parseInt */}
            <NumberFormat
              aria-label="Nilai deposito atau tabungan"
              prefix={"Rp. "}
              thousandSeparator={true}
              placeholder="Nilai Deposito atau Tabungan"
              name="deposito"
              customInput={Form.Control}
              value={form.deposito}
              onValueChange={(values) => {
                const { value } = values;

                setForm({
                  ...form,
                  deposito: value,
                });
              }}
            />
          </Form.Row>
          <span
            style={{ 
              fontFamily: "open sans",
              fontWeight: "bold",
              fontSize: 14,
            }}>
              Nilai Harta Perhiasan
            </span>
          <Form.Row className="my-2">
            <NumberFormat
              aria-label="Emas, perak, atau sejenisnya"
              prefix={"Rp. "}
              thousandSeparator={true}
              placeholder="Emas, perak, atau sejenisnya"
              name="emas"
              customInput={Form.Control}
              value={form.emas}
              onValueChange={(values) => {
                const { value } = values;

                setForm({
                  ...form,
                  emas: value,
                });
              }}
            />
          </Form.Row>
          <span
            style={{ 
              fontFamily: "open sans",
              fontWeight: "bold",
              fontSize: 14,
            }}>
              Nilai Properti atau Kendaraan
            </span>
          <Form.Row className="my-2">
            <NumberFormat
              aria-label="Nilai properti atau kendaraan"
              prefix={"Rp. "}
              thousandSeparator={true}
              placeholder="Nilai properti atau kendaraan"
              name="property"
              customInput={Form.Control}
              value={form.property}
              onValueChange={(values) => {
                const { value } = values;

                setForm({
                  ...form,
                  property: value,
                });
              }}
            />
          </Form.Row>
          <span
            style={{ 
              fontFamily: "open sans",
              fontWeight: "bold",
              fontSize: 14,
            }}>
              Lainnya (Saham,Piutang,dll)
            </span>
          <Form.Row className="my-2">
            <NumberFormat
              aria-label="Lainnya (saham, piutang, dll)"
              prefix={"Rp. "}
              thousandSeparator={true}
              placeholder="Lainnya (saham, piutang, dll)"
              name="saham"
              customInput={Form.Control}
              value={form.saham}
              onValueChange={(values) => {
                const { value } = values;

                setForm({
                  ...form,
                  saham: value,
                });
              }}
            />
          </Form.Row>
          <span
            style={{ 
              fontFamily: "open sans",
              fontWeight: "bold",
              fontSize: 14,
            }}>
              Hutang atau cicilan
            </span>
          <Form.Row className="my-2">
            <NumberFormat
              aria-label="Hutang atau Cicilan"
              prefix={"Rp. "}
              thousandSeparator={true}
              placeholder="Hutang atau Cicilan"
              name="hutang"
              customInput={Form.Control}
              value={form.hutang}
              onValueChange={(values) => {
                const { value } = values;

                setForm({
                  ...form,
                  hutang: value,
                });
              }}
            />
          </Form.Row>
          <span
            style={{ 
              fontFamily: "open sans",
              fontWeight: "bold",
              fontSize: 14,
            }}>
              Jumlah Zakat
            </span>
          <Form.Row className="my-2">
            <NumberFormat
              aria-label="Jumlah zakat"
              prefix={"Rp. "}
              thousandSeparator={true}
              placeholder="Jumlah Zakat"
              customInput={Form.Control}
              value={totalZakat()}
              onValueChange={(values) => {
                const { value } = values;

                setTransactionForm({
                  ...transactionForm,
                  programCost: value,
                });
              }}
            />
          </Form.Row>
          <span
            style={{ 
              fontFamily: "open sans",
              fontWeight: "bold",
              fontSize: 14,
            }}>
              Pilih Amil Zakat
            </span>
          <Form.Row className="my-2">
            <AsyncSelect
              aria-label="Pilih Amil Zakat"
              cacheOptions
              defaultOptions
              loadOptions={getAmilZakat}
              placeholder="Pilih Amil Zakat"
              className="form-selection"
              styles={customSelectStyles}
            />
          </Form.Row>
          <span
            style={{ 
              fontFamily: "open sans",
              fontWeight: "bold",
              fontSize: 14,
            }}>
              Pilih Metode Pembayaran
            </span>
          <Form.Row className="my-2">
            <AsyncSelect
              aria-label="Pilih metode pembayaran"
              cacheOptions
              defaultOptions
              loadOptions={getPaymentMethod}
              placeholder="Pilih Metode Pembayaran"
              className="form-selection"
              styles={customSelectStyles}
              onChange={(e) => onChangePayment(e)}
            />
          </Form.Row>
          <span
            style={{ 
              fontFamily: "open sans",
              fontWeight: "bold",
              fontSize: 14,
            }}>
              Nama Pengguna
            </span>
          <Form.Row className="my-2">
            <Form.Control
              aria-label="Nama Pengguna"
              placeholder="Nama Pengguna"
              name="username"
              value={
                user.loginStatus ? user.user.name : transactionForm.username
              }
              onChange={(e) =>
                setTransactionForm({
                  ...transactionForm,
                  username: e.target.value,
                })
              }
            />
          </Form.Row>
          <span
            style={{ 
              fontFamily: "open sans",
              fontWeight: "bold",
              fontSize: 14,
            }}>
              Nomor Telepon
            </span>
          <Form.Row className="my-2">
            <NumberFormat
            aria-label="Nomor Telepon"
              format="####-####-####"
              mask="_"
              placeholder="Nomor Telepon"
              customInput={Form.Control}
              name="phone"
              value={user.loginStatus ? user.user.phone : transactionForm.phone}
              onValueChange={(values) => {
                const { value } = values;

                setTransactionForm({
                  ...transactionForm,
                  phone: value,
                });
              }}
            />
          </Form.Row>
        </Form>
      </div>
      <ToggleButton
        aria-label="Info terbaru"
        form={form}
        setForm={setForm}
        message="Apakah anda ingin mendapatkan informasi terkini?"
      />
      <NextButton
        style={{ marginBottom: 10, marginTop: 10 }}
        disabled={disabledState()}
        title={disabledState() && "Mohon isi form terlebih dahulu"}
        onClick={() => submit()}
      />
    </motion.div>
  );
}

export default Maal;
