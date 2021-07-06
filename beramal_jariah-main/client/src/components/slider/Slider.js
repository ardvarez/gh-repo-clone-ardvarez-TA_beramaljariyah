import { useHistory } from "react-router";

import { Carousel } from "react-responsive-carousel";

function Slider() {
  const navigate = useHistory();

  return (
    <Carousel
      showThumbs={false}
      infiniteLoop={true}
      width={1152}
      autoPlay={true}
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate.push("/infak/1")}
      >
        <img
          src="https://wakaf-production.s3.ap-southeast-1.amazonaws.com/banner/upload_0f814ee27bb464a003a4bbe4a0345209.jpeg"
          alt="slider item"
          style={{
            borderRadius: 10,
            height: 400,
            width: "90%",
            cursor: "pointer",
          }}
        />
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate.push("/wakaf/2")}
      >
        <img
          src="https://wakaf-production.s3.ap-southeast-1.amazonaws.com/banner/upload_813ab9045c0a83f7c364a82f6608e2f8.jpg"
          alt="slider item"
          style={{
            borderRadius: 10,
            height: 400,
            width: "90%",
            cursor: "pointer",
          }}
        />
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate.push("/wakaf/3")}
      >
        <img
          src="https://wakaf-production.s3.ap-southeast-1.amazonaws.com/banner/upload_f19b8ccde24bcca55e7f032e15adc8a2.jpg"
          alt="slider item"
          style={{
            borderRadius: 10,
            height: 400,
            width: "90%",
            cursor: "pointer",
          }}
        />
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate.push("/infak/4")}
      >
        <img
          src="https://wakaf-production.s3.ap-southeast-1.amazonaws.com/banner/upload_83cfd858649c8dfa552b4bc37175307a.png"
          alt="slider item"
          style={{
            borderRadius: 10,
            height: 400,
            width: "90%",
            cursor: "pointer",
          }}
        />
      </div>
    </Carousel>
  );
}

export default Slider;
