import React from "react";

const ModelViewer: React.FC = () => {
    return (
        <model-viewer
            id="modelViewer"
            src="model.glb"
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            tone-mapping="neutral"
            shadow-intensity="0"
            shadow-softness="1"
            autoplay
            auto-rotate
            exposure="1"
            style={{width: "50%", height: "40rem", border: "0px solid red", marginTop: "-10%", marginRight: "40%"}}
        ></model-viewer>
    );
};

export default ModelViewer;
