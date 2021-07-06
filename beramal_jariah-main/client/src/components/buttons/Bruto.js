function Bruto(props) {
  const onClick = () => {
    props.action({
      bruto: true,
      netto: false,
    });
  };

  return (
    <div className="d-flex align-items-center">
      <button
        type="button"
        aria-label="button"
        className={
          props.state.bruto ? "active-radio-btn" : "inactive-radio-btn"
        }
        style={{
          border: "1px solid #006641",
          height: 16,
          width: 16,
          borderRadius: "50%",
          marginRight: 10,
        }}
        onClick={() => onClick()}
      ></button>
      <button
        aria-label="button"
        type="button"
        className="radio-btn-label"
        style={{
          background: "none",
          border: "none",
        }}
        onClick={() => onClick()}
      >
        Bruto
      </button>
    </div>
  );
}

export default Bruto;
