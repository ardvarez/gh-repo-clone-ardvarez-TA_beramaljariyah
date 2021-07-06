import { useHistory } from "react-router-dom";

function MainProgram() {
  const navigation = useHistory();
  const mainProgramItems = [
    {
      bgColor: "#EEB507",
      content: "infak",
      navigate: () => navigation.push("/infak"),
    },
    {
      bgColor: "#00A441",
      content: "zakat",
      navigate: () => navigation.push("/zakat"),
    },
    {
      bgColor: "#6962B6",
      content: "wakaf",
      navigate: () => navigation.push("/wakaf"),
    },
  ];

  return (
    <div
      className="d-flex justify-content-around"
      style={{ width: 1037, marginTop: 50 }}
    >
      {mainProgramItems.map((item) => {
        return (
          <div
            style={{
              width: 270,
              height: 150,
              backgroundColor: `${item.bgColor}`,
              borderRadius: 10,
              cursor: "pointer",
            }}
            className="card-bottom-shadow d-flex justify-content-center align-items-center"
            onClick={() => item.navigate()}
          >
            <span
              style={{
                fontFamily: "open sans",
                color: "#fff",
                fontWeight: "bolder",
                fontSize: 40,
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
