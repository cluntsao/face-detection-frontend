import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit, entries }) => {
    return (
        <div style={{height: "10vh"}}>
            <p className="ma3 f3 ttc">
                {"this magic app will detect faces in your picture!"}
            </p>
            <p className="ma1 f6">{entries}</p>
            <div className="pa4 shadow-3" id="input-panel">
                <input style={{width: "20vw"}} type="search" name="url" id="url" placeholder="URL" onChange={onInputChange} />
                <button className="pointer bg-light-blue ma1 btn btn-primary" onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;