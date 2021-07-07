import { useState } from "react";
import Switch from "react-switch";

function ZakatToggle(props) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="d-flex align-items-center" style={{ ...props.style }}>
      <div style={{ width: "80%" }}>
        <span>{props.message}</span>
      </div>
      <div
        className="zakat-toggle d-flex justify-content-center"
        style={{ width: "20%", ...props.align }}
      >
        <Switch
          checked={toggle}
          onChange={() => {
            setToggle(!toggle);
            props.setForm({
              ...props.form,
              message: !toggle,
            });
          }}
        />
      </div>
    </div>
  );
}

export default ZakatToggle;
