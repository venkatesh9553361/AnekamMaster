import { Strings } from "./Helper";
import '../styles/SidePicture.css';
import React from 'react';

const SidePicture = () => {
    return (
        <div className="side_picture_wrapper">
            <img className="anekam_image" src={Strings.ANEKAM_IMAGE}></img>
            <img className="anekam_logo" src={Strings.ANEKAM_LOGO}></img>
            <p className="anekam_header">{Strings.ANEKAM_HEADER}</p>
            <p className="anekam_desc">{Strings.ANEKAM_DESC}</p>
        </div>
    )
}

export default SidePicture;