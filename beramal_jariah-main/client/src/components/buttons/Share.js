import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';

function Share(props) {
    return (
        <div className="w-80 d-flex my-2">
            <FacebookShareButton
                url={props.url}
                style={{ backgroundColor: "#3b5998", flexGrow: 1, borderRadius: 20, color: "#fff", fontWeight: 'bolder' }}
            >
                <FacebookIcon round size={40} />
                Share to Facebook
            </FacebookShareButton>
            <WhatsappShareButton
                url={props.url}
                style={{ backgroundColor: "#25D366", flexGrow: 1, borderRadius: 20, color: "#fff", fontWeight: 'bolder' }}
            >
                <WhatsappIcon round size={40}  />
                Share to WhatsApp
            </WhatsappShareButton>
        </div>
    )
}

export default Share
