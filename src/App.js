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

    const handleAddMore = () => {
        const newPage = page + 1
        getLaunchesByPage(newPage).then((response)=>{
            setLaunches((prevState) => {
                return [...prevState, ...response.data.docs]
            })
            setPage(newPage)
        })
    }

    return (
        <div>
            <LaunchList launches={launches}/>
            <button onClick={handleAddMore}>Load more (Pages: {totalPages - page})</button>
        </div>
    );
};

export default App;
