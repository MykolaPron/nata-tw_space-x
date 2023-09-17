import React, {useEffect, useState} from 'react';
import LaunchList from "./components/LaunchList";
import {getLaunchesByPage} from "./services/launchesService";

const App = () => {
    const [launches, setLaunches] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        getLaunchesByPage().then((response)=>{
            setLaunches(response.data.docs)
            setTotalPages(response.data.totalPages)
        })
    }, [])

    return (
        <div>
            <LaunchList launches={launches}/>
        </div>
    );
};

export default App;
