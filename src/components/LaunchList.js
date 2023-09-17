import React from 'react';

const LaunchList = (props) => {
    return (
        <div>
            <h2>List</h2>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "10px"
            }}>
                {props.launches.map((launch) => {
                    const date = new Date(launch.date_unix)
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
