import React from 'react';
import './FaceRecognition.css';
import BoundingBox from '../BoundingBox/BoundingBox';

const FaceRecognition = ({ picUrl, box }) => {
    return (
        <div className="ma4" style={{display: 'flex', justifyContent: 'center', height: '60vh', alignItems: 'center'}}>
            <div className="absolute">
                <img src={picUrl} alt="pic" id="inputImage" />
                {box.map(faceInfo => <BoundingBox key={faceInfo.id} box={faceInfo} />)}
            </div>
        </div>
    )
}
export default FaceRecognition;