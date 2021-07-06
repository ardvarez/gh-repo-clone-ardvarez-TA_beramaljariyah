function MainProgramNav(props) {
  //zakat navigation
  if (props.navContent == "zakat") {
    const zakatNav = ["Zakat Penghasilan", "Zakat Maal"];

    const zakatNavHandler = (state) => {
      if (state == "Zakat Maal") {
        return props.zakatNavOnChange({
          penghasilan: false,
          maal: true,
        });
      } else {
        return props.zakatNavOnChange({
          penghasilan: true,
          maal: false,
        });
      }
    };

    return (
      <div className="d-flex my-3" style={{ width: "80%" }}>
        {zakatNav.map((item) => {
          const itemLowerCase = item.substr(6, item.length - 1).toLowerCase();
          return (
            <button
              type="button"
              className={
                props.zakatContent[`${itemLowerCase}`]
                  ? "nav-detail btn-active-borderless"
                  : "nav-detail"
              }
              style={{ flexGrow: 1, fontWeight: "bolder" }}
              onClick={() => zakatNavHandler(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    );
  } else if (props.navContent == "tentang") {
    const tentangNavHandler = (state) => {
      if (state == "syaratKetentuan") {
        return props.tentangNavOnChange({
          tentang: false,
          syaratKetentuan: true,
        });
      } else {
        return props.tentangNavOnChange({
          tentang: true,
          syaratKetentuan: false,
        });
      }
    };

    return (
      <div className="d-flex my-3" style={{ width: "80%" }}>
        <button
          type="button"
          className={
            props.tentangContent[`tentang`]
              ? "nav-detail btn-active-borderless"
              : "nav-detail"
          }
          style={{ flexGrow: 1, fontWeight: "bolder" }}
          onClick={() => tentangNavHandler("tentang")}
        >
          Tentang
        </button>
        <button
          type="button"
          className={
            props.tentangContent[`syaratKetentuan`]
              ? "nav-detail btn-active-borderless"
              : "nav-detail"
          }
          style={{ flexGrow: 1, fontWeight: "bolder" }}
          onClick={() => tentangNavHandler("syaratKetentuan")}
        >
          Syarat & Ketentuan
        </button>
      </div>
    );
  } else {
    //wakaf and infak navigation
    const navItems = ["Tentang", "Laporan", "Donatur"];

    const onClickHandler = (state) => {
      if (state == "Laporan") {
        return props.onChange({
          tentang: false,
          laporan: true,
          donatur: false,
        });
      } else if (state == "Donatur") {
        return props.onChange({
          tentang: false,
          laporan: false,
          donatur: true,
        });
      } else {
        return props.onChange({
          tentang: true,
          laporan: false,
          donatur: false,
        });
      }
    };

    return (
      <div className="d-flex my-3" style={{ width: "80%" }}>
        {navItems.map((item) => {
          const itemLowerCase = item.toLowerCase();
          return (
            <button
              type="button"
              className={
                props.state[`${itemLowerCase}`]
                  ? "nav-detail btn-active-borderless"
                  : "nav-detail"
              }
              style={{ flexGrow: 1 }}
              onClick={() => onClickHandler(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    );
  }
}

export default MainProgramNav;
