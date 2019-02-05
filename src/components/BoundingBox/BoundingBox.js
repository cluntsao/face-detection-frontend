import React from 'react';

const BoundingBox = ({ box }) => {
    return (
        <div className="bounding-box" style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}}></div>
    )
}

export default BoundingBox;