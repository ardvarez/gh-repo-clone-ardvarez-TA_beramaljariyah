import NotFoundImage from "../../assets/not_found.png";

function NotFound(props) {
  return (
    <div
      className="w-80 transaction-wrapper d-flex flex-column align-items-center p-4"
      style={{ ...props.style }}
    >
      <span style={{ fontWeight: "bolder", fontSize: 32 }}>{props.title}</span>
      <img
        src={NotFoundImage}
        alt="Not Found Content"
        width="60%"
        height="60%"
      />
    </div>
  );
}

export default NotFound;
