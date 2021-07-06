import Facebook from "../../assets/facebook.png";
import Youtube from "../../assets/youtube.png";
import Instagram from "../../assets/instagram.png";
import LinkedIn from "../../assets/linkedin.png";
import WhatsApp from "../../assets/whatsapp_white.png";

import { useHistory } from "react-router-dom";

function Footer() {
  const navigate = useHistory();
  return (
    <div
      className="footer w-100"
      style={{
        backgroundColor: "#006641",
        padding: "30px 40px 18px",
        marginTop: 50,
        zIndex: 100,
      }}
    >
      <div className="footer-content d-flex flex-column align-items-center m-auto">
        <div
          className="top-footer w-100 d-flex justify-content-between"
          style={{
            color: "#fff",
            paddingBottom: 30,
            marginBottom: 10,
            borderBottom: "1px solid #fff",
          }}
        >
          <div
            className="left-footer-content d-flex flex-column"
            style={{ width: "20%" }}
          >
            <span style={{ fontWeight: "bolder" }}>Kontak</span>
            <span style={{ fontSize: 14 }}>
              Jl. Sampurna No. 9 Kota Bandung <br />
              Telp / WA: <br />
              0819-95-10-1000
            </span>
          </div>
          <div
            className="center-footer-content d-flex flex-column"
            style={{ width: "45%" }}
          >
            <span
              style={{ fontWeight: "bolder", cursor: "pointer" }}
              onClick={() => navigate.push("/tentang")}
            >
              Tentang Kami
            </span>
            <span style={{ fontSize: 14, textAlign: "justify" }}>
              Yayasan Sahabat Beramal Jariyah dengan akta pendirian No. 79
              Tanggal 31-01-2020, adalah lembaga penggalangan dana online dengan
              situs beramaljariyah.org yang menggalang program Zakat, Infaq, dan
              wakaf. Pembayaran ditujukan ke rekening A.N Sahabat Beramal
              Jariyah. Donasi manual agar mencantumkan keterangan program yang
              akan dibantu. Dana tanpa keterangan akan kami salurkan melalui
              program regular Sahabat Beramal Jariyah dan masuk kategori dana
              infak.
            </span>
            <span
              style={{ fontWeight: "bolder", marginTop: 10, cursor: "pointer" }}
              onClick={() => navigate.push("/tentang")}
            >
              Syarat & Ketentuan
            </span>
          </div>
          <div
            className="right-footer-content d-flex flex-column"
            style={{ width: "20%" }}
          >
            <span style={{ fontWeight: "bolder" }}>Sosial Media</span>
            <div className="social-media d-flex">
              <a
                href="https://www.facebook.com/beramaljariyah/"
                title="Facebook"
                target="_blank"
                rel="noreferrer"
                style={{ marginRight: 7 }}
              >
                <img src={Facebook} alt="Facebook" width="35px" height="35px" />
              </a>
              <a
                href="https://www.youtube.com/beramalbersama"
                title="Youtube"
                target="_blank"
                rel="noreferrer"
                style={{ marginRight: 7 }}
              >
                <img src={Youtube} alt="Youtube" width="35px" height="35px" />
              </a>
              <a
                href="https://www.instagram.com/beramaljariyah/"
                title="Instagram"
                target="_blank"
                rel="noreferrer"
                style={{ marginRight: 7 }}
              >
                <img
                  src={Instagram}
                  alt="instagram"
                  width="35px"
                  height="35px"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/beramaljariyah/"
                title="LinkedIn"
                target="_blank"
                rel="noreferrer"
                style={{ marginRight: 7 }}
              >
                <img src={LinkedIn} alt="LinkedIn" width="35px" height="35px" />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=6281995101000&text=Assalamualaikum+Saya+ingin+menanyakan+tentang+BeramalJariyah&app_absent=0"
                title="WhatsApp"
                target="_blank"
                rel="noreferrer"
                style={{ marginRight: 7 }}
              >
                <img src={WhatsApp} alt="WhatsApp" width="35px" height="35px" />
              </a>
            </div>
          </div>
        </div>
        <div
          className="bottom-footer w-100 text-center"
          style={{ color: "#fff" }}
        >
          <span>
            ©Yayasan Beramal Jariyah <br />
            bekerjasama dengan PT Setiap Hari Dipakai / Evermos
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
