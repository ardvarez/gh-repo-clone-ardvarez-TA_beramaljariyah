function Netto(props) {
  const onClick = () => {
    props.action({
      bruto: false,
      netto: true,
    });
  };

  return (
    <div className="d-flex align-items-center">
      <button
        aria-label="button"
        type="button"
        className={
          props.state.netto ? "active-radio-btn" : "inactive-radio-btn"
        }
        style={{
          border: "1px solid #006641",
          height: 16,
          width: 16,
          borderRadius: "50%",
          marginRight: 10,
          ...props.style,
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
        Netto
      </button>
    </div>
  );
}

export default Netto;
