import React from 'react';

const Modal = (props) => {
    return (
        <div
        style={{
            display: props.open ? 'block' : "none",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "#00000078"
        }}
        onClick={props.onClick}
        >
            <div
            style={{
                position: "relative",
                backgroundColor: "white",
                top:" 20%",
                maxWidth: "80%",
                minHeight: "150px",
                margin:" 0 auto",
                padding: "20px"
            }}
            onClick={(event)=>{
                event.stopPropagation()
            }}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Modal;
