import DefaultImage from "../../assets/default-image-black.png";

function Gallery(props) {
  const { photos } = props;
  return (
    <div className="d-flex flex-column my-3" style={{ width: "80%" }}>
      <div className="w-100 bg-light text-center py-2 my-3">
        <span
          style={{
            fontFamily: "Pathway Gothic One",
            fontSize: 20,
            fontWeight: "bolder",
          }}
        >
          Galeri
        </span>
      </div>
      <div className="w-100 d-flex flex-wrap justify-content-around">
        {photos.map((item) => {
          return (
            <img
              src={item.image}
              alt="example image"
              width="324px"
              height="242px"
            />
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;
