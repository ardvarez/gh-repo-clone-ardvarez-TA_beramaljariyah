import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';

function Share(props) {
    return (
        <div className="w-80 d-flex my-2">
            <FacebookShareButton
                url={props.url}
                style={{ backgroundColor: "#F7F8FB", flexGrow: 1, borderRadius: 20, color: "#212529", fontWeight: 'bolder', border: "1", borderColor: "#3b5998"}}
            >
                <FacebookIcon round size={30} />
                Share to Facebook
            </FacebookShareButton>
            <WhatsappShareButton
                url={props.url}
                style={{ backgroundColor: "#F7F8FB", flexGrow: 1, borderRadius: 20, color: "#212529", fontWeight: 'bolder', border: "1", borderColor: "#30BF39" }}
            >
                <WhatsappIcon round size={30}  />
                Share to WhatsApp
            </WhatsappShareButton>
        </div>
    )
}

export default Share
