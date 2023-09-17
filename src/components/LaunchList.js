import React from 'react';

const LaunchList = (props) => {
    return (
        <div>
            <h2>List</h2>
            <div>
                {props.launches.map((launch) => {
                    return (
                        <div key={launch.id}>
                            <div>Name: {launch.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default LaunchList;
