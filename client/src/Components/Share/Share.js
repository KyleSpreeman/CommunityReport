import React from 'react'
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';


const Share = (props) => {
    return (
        <div style={{ display: "inline-block" }}>
            <h5>Share this community report on the social media's below!</h5>
            <TwitterShareButton
                url={props.shareUrl}
                title={props.title}
                style={{ display: "inline-block" }}>
                <TwitterIcon
                    size={32}
                    round />
            </TwitterShareButton>
            <FacebookShareButton
                url={props.fbshareUrl}
                quote={props.title}
                style={{ display: "inline-block" }}>
                <FacebookIcon
                    size={32}
                    round />
            </FacebookShareButton>
        </div>
    )
}
export default Share


