import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';

function Share(props) {
    return (
        <div className="w-80 d-flex my-2">
            <FacebookShareButton
                url={props.url} 
                style={{ backgroundColor: "#f7f8fb", flexGrow: 1, borderRadius: 60, color: "#212529", fontWeight: 'bold', border:"1" ,borderColor: "#3b5998" }}
            >
                <FacebookIcon round size={25} />
                Share to Facebook
            </FacebookShareButton>
            <WhatsappShareButton
                url={props.url}
                style={{ backgroundColor: "#f7f8fb", flexGrow: 1, borderRadius: 60, color: "#212529", fontWeight: 'bold', border:"1" ,borderColor: "#25d366" }}
            >
                <WhatsappIcon round size={25}  />
                Share to WhatsApp
            </WhatsappShareButton>
        </div>
    )
}

export default Share
