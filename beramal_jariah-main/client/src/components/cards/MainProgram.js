import { useHistory } from "react-router-dom";

function MainProgram() {
  const navigation = useHistory();
  const mainProgramItems = [
    {
      bgColor: "#00473a",
      content: "infak",
      navigate: () => navigation.push("/infak"),
    },
    {
      bgColor: "#660055",
      content: "zakat",
      navigate: () => navigation.push("/zakat"),
    },
    {
      bgColor: "#664e00",
      content: "wakaf",
      navigate: () => navigation.push("/wakaf"),
    },
  ];

  return (
    <div
      className="d-flex justify-content-around"
      style={{ width: 990, marginTop: 25, marginBottom: 25 }}
    >
      {mainProgramItems.map((item) => {
        return (
          <div
            style={{
              width: 300,
              height: 133,
              backgroundColor: `${item.bgColor}`,
              borderRadius: 10,
              cursor: "pointer",
            }}
            className="card-bottom-shadow d-flex justify-content-center align-items-center"
            onClick={() => item.navigate()}
          >
            <span
              style={{
                fontFamily: "Open Sans",
                color: "#fff",
                fontWeight: "bolder",
                fontSize: 30,
                letterSpacing: 2,
              }}
            >
              {item.content.toUpperCase()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default MainProgram;
