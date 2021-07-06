import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <Spinner
        animation="grow"
        style={{ margin: "100px 10px", height: 20, width: 20 }}
      />
      <Spinner
        animation="grow"
        style={{ margin: "100px 10px", height: 20, width: 20 }}
      />
      <Spinner
        animation="grow"
        style={{ margin: "100px 10px", height: 20, width: 20 }}
      />
    </div>
  );
}

export default Loading;
