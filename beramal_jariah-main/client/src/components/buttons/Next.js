function Next(props) {
  return (
    <button
      {...props}
      type="button"
      className="zakat-next-btn text-center py-1"
      style={{
        width: "100%",
        backgroundColor: "#006641",
        border: "2px solid #EBEBEB",
        color: "#fff",
        borderRadius: 10,
        fontWeight: "bolder",
        ...props.style,
      }}
      onClick={() => props.onClick()}
    >
      Lanjutkan
    </button>
  );
}

export default Next;
