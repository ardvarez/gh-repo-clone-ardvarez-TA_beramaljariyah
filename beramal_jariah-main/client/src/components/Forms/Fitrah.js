import { useState } from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import NumberFormat from "react-number-format";

import ToggleButton from "../buttons/ZakatToggle";
import NextButton from "../buttons/Next";

function Fitrah() {
  const [form, setForm] = useState({
    pendapatan: "",
    pendapatanTambahan: "",
    hutang: "",
    zakat: "",
    usename: "",
    phone: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="form-wrapper d-flex flex-column"
    >
      <div className="w-75">
        <Form>
          <Form.Row className="my-2">
            {/* this number format value will be return string, to change it type, use parseInt */}
            <NumberFormat
              prefix={"Rp. "}
              thousandSeparator={true}
              placeholder="Pendapatan Per Bulan"
              name="pendapatan"
              customInput={Form.Control}
              value={form.pendapatan}
              onValueChange={(values) => {
                const { value } = values;

                setForm({
                  ...form,
                  pendapatan: value,
                });
              }}
            />
          </Form.Row>
          <Form.Row className="my-2">
            <NumberFormat
              prefix={"Rp. "}
              thousandSeparator={true}
              placeholder="Pendapatan Tambahan (jika ada)"
              name="pendapatanTambahan"
              customInput={Form.Control}
              value={form.pendapatanTambahan}
              onValueChange={(values) => {
                const { value } = values;

                setForm({
                  ...form,
                  pendapatanTambahan: value,
                });
              }}
            />
          </Form.Row>
          <Form.Row className="my-2">
            <NumberFormat
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
          <Form.Row className="my-2">
            <NumberFormat
              prefix={"Rp. "}
              thousandSeparator={true}
              placeholder="Jumlah Zakat"
              name="zakat"
              customInput={Form.Control}
              value={form.zakat}
              onValueChange={(values) => {
                const { value } = values;

                setForm({
                  ...form,
                  zakat: value,
                });
              }}
            />
          </Form.Row>
          <Form.Row className="my-2">
            <Form.Group>
              <Form.Control as="select">
                <option disabled selected>
                  Pilih Amil Zakat
                </option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row className="my-2">
            <Form.Control
              placeholder="Nama Pengguna"
              name="username"
              value={form.usename}
              onChange={(e) =>
                setForm({
                  ...form,
                  usename: e.target.value,
                })
              }
            />
          </Form.Row>
          <Form.Row className="my-2">
            <NumberFormat
              format="####-####-####"
              mask="_"
              placeholder="Nomor Telepon"
              customInput={Form.Control}
              name="phone"
              value={form.phone}
              onValueChange={(values) => {
                const { value } = values;

                setForm({
                  ...form,
                  phone: value,
                });
              }}
            />
          </Form.Row>
        </Form>
      </div>
      <ToggleButton />
      <NextButton style={{ marginBottom: 10, marginTop: 10 }} />
    </motion.div>
  );
}

export default Fitrah;
