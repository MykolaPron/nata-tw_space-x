import React from 'react';

const LaunchList = (props) => {
    return (
        <div>
            <h2>List</h2>
            <div>
                {props.launches.map((launch) => {
                    const date = new Date(launch.date_unix)
                    return (
                        <div key={launch.id}>
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
