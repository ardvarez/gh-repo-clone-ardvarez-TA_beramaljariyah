import CallCenterIcon from '../../assets/Call_Center.png';

function CallCenter() {
    return (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 99 }}>
            <a
             href="https://api.whatsapp.com/send/?phone=6281995101000&text=Assalamualaikum+Saya+ingin+menanyakan+tentang+BeramalJariyah&app_absent=0"
             title="WhatsApp"
             target="_blank"
             rel="noreferrer"
            >
                <img src={CallCenterIcon} alt="call center icon" width="80px" height="80px" />
            </a>
        </div>
    )
}

export default CallCenter
