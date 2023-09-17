import React from 'react';
import LaunchList from "./components/LaunchList";

const App = () => {
    const launches = [
        {id: 1, name: "Test 1"},
        {id: 2, name: "Test 2"},
        {id: 3, name: "Test 3"}
    ];
    return (
        <div>
            <LaunchList launches={launches}/>
        </div>
    );
};

export default App;
