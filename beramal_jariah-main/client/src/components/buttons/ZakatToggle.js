import { useState } from "react";
import Switch from "react-switch";

function ZakatToggle(props) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="d-flex align-items-left" style={{ ...props.style }}>
      <div style={{ width: "80%" }}>
        <span>{props.message}</span>
      </div>
      <div
        className="zakat-toggle d-flex justify-content-right"
        style={{ width: "35%", ...props.align }}
      >
        <Switch
          aria-label="switch"
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
