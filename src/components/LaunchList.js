import React, {useState} from 'react';
import Modal from "./Modal";

const LaunchList = (props) => {
    const [lanunch, setLanunch] = useState(null)

    const handleClose = () => {
        setLanunch(null)
    }

    return (
        <div>
            <h2>List</h2>
            <Modal open={!!lanunch} onClick={handleClose}>
                <div>Name: {lanunch?.name}</div>
                <div>Flight Number: {lanunch?.flight_number}</div>
            </Modal>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "10px"
            }}>
                {props.launches.map((launch) => {
                    const date = new Date(launch.date_unix)

                    const handleClick = () => {
                        setLanunch(launch)
                    }

                    return (
                        <div
                            key={launch.id}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer"
                            }}
                            onClick={handleClick}
                        >
                            <img src={launch.links.patch.small} alt=""/>
                            <div>Name: {launch.name}</div>
                            <div>Flight Number: {launch.flight_number}</div>
                            <div>Date: {date.toLocaleDateString()}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default LaunchList;
