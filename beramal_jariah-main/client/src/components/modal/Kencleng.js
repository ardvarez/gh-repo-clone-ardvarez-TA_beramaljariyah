import { useState, useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import NumberFormat from "react-number-format";
import Dropdown from "react-dropdown";
import toRupiah from "@develoka/angka-rupiah-js";
import axios from "axios";
import UniqueCode from "../../utils/UniqueCode";
import AsyncSelect from "react-select/async";

import { TransactionContext } from "../../contexts/transactionContext";

import KenclengLogo from "../../assets/kencleng-online.png";

function Kencleng(props) {
  const navigate = useHistory();
  const [selectedNominal, setSelectedNominal] = useState(0);

  const nominalItems = [5000, 10000, 15000, 20000, 25000];

  const [transaction, setTransaction] = useContext(TransactionContext);

  const [form, setForm] = useState({
    paymentId: 0,
    paymentCost: 0,
    programCost: "",
    programType: "Kencleng Online",
    infaqPengembangan: 0,
    paymentMethod: {},
    uniqueCode: parseInt(UniqueCode()),
    username: "",
    phone: "",
    userMessage: "",
    message: false,
  });

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

    setForm({
      ...form,
      idPayment: e.value,
      paymentCost,
      paymentMethod: selectedPayment[0],
    });
  };

  const submit = () => {
    setTransaction({
      type: "TRANSACTION",
      payload: form,
    });
    navigate.push("/transaction-report");
  };

  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      border: "1px solid rgba(0,0,0,.5)",
      borderRadius: 15,
      height: 50,
    }),
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      className="kencleng-modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex flex-column justify-content-between"
        style={{ minHeight: 500, padding: 0, borderRadius: 15 }}
      >
        <div
          className="modal-form-wrapper d-flex flex-column align-items-center"
          style={{ border: "none", marginBottom: 30 }}
        >
          <span
            style={{
              color: "#00a441",
              fontWeight: "bolder",
              fontSize: 26,
              margin: "20px 0",
            }}
          >
            KENCLENG ONLINE
          </span>
          <img
            src={KenclengLogo}
            alt="Kencleng Logo"
            width="300px"
            style={{
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              marginBottom: 50,
            }}
          />
          <Form style={{ width: 400 }}>
            <Form.Row>
              <span style={{ fontWeight: "bolder", fontSize: 20 }}>
                PILIH NOMINAL DIBAWAH INI
              </span>
            </Form.Row>
            <Form.Row className="d-flex flex-wrap justify-content-center">
              {nominalItems.map((item) => {
                return (
                  <span
                    style={{
                      margin: 5,
                      padding: "5px 10px",
                      borderRadius: 15,
                      fontSize: 15,
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    className={
                      selectedNominal == item
                        ? "active-nominal card-bottom-shadow"
                        : "inactive-nominal"
                    }
                    onClick={() => {
                      setSelectedNominal(item);
                      setForm({
                        ...form,
                        programCost: item,
                      });
                    }}
                  >
                    {toRupiah(item, { formal: false })}
                  </span>
                );
              })}
            </Form.Row>
            <Form.Row>
              <NumberFormat
                prefix={"Rp. "}
                thousandSeparator={true}
                placeholder="Masukkan Nominal Lain"
                name="cost"
                customInput={Form.Control}
                value={form.programCost}
                onValueChange={(values) => {
                  const { value } = values;
                  setSelectedNominal(0);
                  setForm({
                    ...form,
                    programCost: value,
                  });
                }}
              />
            </Form.Row>
            <Form.Row className="my-2" style={{ width: "100%" }}>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={getPaymentMethod}
                placeholder="Pilih Metode Pembayaran"
                className="form-selection"
                styles={customSelectStyles}
                onChange={(e) => onChangePayment(e)}
              />
            </Form.Row>
          </Form>
        </div>
        <div className="modal-action d-flex" style={{ border: "none" }}>
          <button
            type="button"
            style={{
              flexGrow: 1,
              padding: "10px 0",
              border: "none",
              backgroundColor: "transparent",
              borderBottomLeftRadius: 15,
            }}
            onClick={() => props.setShow(false)}
          >
            <span
              style={{ fontWeight: "bolder", fontSize: 22, color: "#A42500" }}
            >
              Batal
            </span>
          </button>
          <button
            type="button"
            style={{
              flexGrow: 1,
              padding: "10px 0",
              border: "none",
              backgroundColor: "#00a441",
              borderBottomRightRadius: 15,
            }}
            onClick={() => submit()}
          >
            <span style={{ fontWeight: "bolder", fontSize: 22, color: "#fff" }}>
              Bayar
            </span>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Kencleng;
