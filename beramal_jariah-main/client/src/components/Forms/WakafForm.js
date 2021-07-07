import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import AsyncSelect from "react-select/async";
import { Form } from "react-bootstrap";
import NumberFormat from "react-number-format";
import axios from "axios";
import UniqueCode from "../../utils/UniqueCode";

import { UserContext } from "../../contexts/userContext";
import { TransactionContext } from "../../contexts/transactionContext";

import Next from "../buttons/Next";
import FormToggle from "../buttons/ZakatToggle";

function WakafForm(props) {
  const navigate = useHistory();

  const [user] = useContext(UserContext);
  const [transaction, setTransaction] = useContext(TransactionContext);

  const [form, setForm] = useState({
    paymentId: 0,
    paymentCost: 0,
    programCost: "",
    programType: props.programType,
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

  const getPengembanganCost = () => {
    if (form.programCost === "") {
      return "";
    } else {
      const total = parseInt(form.programCost) * 0.05;
      return Math.floor(total);
    }
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
    <>
      <Form className="w-100 my-3">
        <Form.Row className="my-2" style={{ width: "50%" }}>
          <NumberFormat
            prefix={"Rp. "}
            thousandSeparator={true}
            placeholder="Jumlah Wakaf"
            customInput={Form.Control}
            value={form.programCost}
            onValueChange={(values) => {
              const { value } = values;
              setForm({
                ...form,
                programCost: value,
              });
            }}
            required
          />
        </Form.Row>
        <Form.Row className="my-2" style={{ width: "50%" }}>
          <NumberFormat
            prefix={"Rp. "}
            thousandSeparator={true}
            placeholder="Jumlah Infaq Pengembangan Teknologi"
            customInput={Form.Control}
            value={getPengembanganCost()}
            onValueChange={(values) => {
              const { value } = values;

              setForm({
                ...form,
                infaqPengembangan: value,
              });
            }}
          />
        </Form.Row>
        <Form.Row className="my-2" style={{ width: "50%" }}>
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
        <Form.Row className="my-2" style={{ width: "50%" }}>
          <Form.Control
            placeholder="Nama Pengguna"
            name="username"
            value={user.loginStatus ? user.user.name : form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
          />
        </Form.Row>
        <Form.Row className="my-2" style={{ width: "50%" }}>
          <NumberFormat
            format="####-####-####"
            mask="_"
            placeholder="Nomor Telepon"
            customInput={Form.Control}
            name="phone"
            value={user.loginStatus ? user.user.phone : form.phone}
            onValueChange={(values) => {
              const { value } = values;

              setForm({
                ...form,
                phone: value,
              });
            }}
          />
        </Form.Row>
        <Form.Row className="my-2">
          <FormToggle
            form={form}
            setForm={setForm}
            message="Tambahkan Pesan"
            style={{ justifyContent: "between", width: "100%" }}
          />
        </Form.Row>
        <Form.Row
          className={form.message ? "show-message" : "hide-message"}
          style={{ width: "50%", margin: "10px 0" }}
        >
          <Form.Control
            as="textarea"
            placeholder="Tulis Pesan Anda"
            style={{ height: 80 }}
            value={form.userMessage}
            onChange={(e) => {
              setForm({
                ...form,
                userMessage: e.target.value,
              });
            }}
          />
        </Form.Row>
        <Form.Row style={{ marginTop: 30 }}>
          <Next onClick={() => submit()} />
        </Form.Row>
      </Form>
    </>
  );
}

export default WakafForm;
