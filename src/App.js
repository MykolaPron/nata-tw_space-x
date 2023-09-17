import React, {useEffect, useState} from 'react';
import LaunchList from "./components/LaunchList";
import {getLaunchesByPage} from "./services/launchesService";

const App = () => {
    const [launches, setLaunches] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const [filterNameValue, setFilterNameValue] = useState("")
    const [filterFlightNumberValue, setFilterFlightNumberValue] = useState("")
    const [filterDateValue, setFilterDateValue] = useState("")

    useEffect(() => {
        getLaunchesByPage().then((response) => {
            setLaunches(response.data.docs)
            setTotalPages(response.data.totalPages)
        })
    }, [])

    const handleAddMore = () => {
        const newPage = page + 1
        getLaunchesByPage(newPage).then((response) => {
            setLaunches((prevState) => {
                return [...prevState, ...response.data.docs]
            })
            setPage(newPage)
        })
    }

    const handleFilterNameChange = (event) => {
        const value = event.target.value
        setFilterNameValue(value)
    }

    const handleFilterFlightNumberChange = (event) => {
        const value = event.target.value
        setFilterFlightNumberValue(value)
    }
    const handleFilterDateChange = (event) => {
        const value = event.target.value
        setFilterDateValue(value)
    }

    const getLaunchesFilteredByName = (launches) => {
        return launches.filter((launch) => {
            return launch.name.toLowerCase().includes(filterNameValue.toLowerCase())
        })
    }
    const getLaunchesFilteredByFlightNumber = (launches) => {
        if(filterFlightNumberValue === ""){
            return launches
        }

        return launches.filter((launch) => {
            return launch.flight_number === Number(filterFlightNumberValue)
        })
    }

    const launchesFilteredByName = getLaunchesFilteredByName(launches)
    const launchesFilteredByFlightNumber = getLaunchesFilteredByFlightNumber(launchesFilteredByName)

    return (
        <div>
            <div>
                <h2>Filters</h2>
                <div>
                    <label htmlFor="filter-name">
                        Name
                        <input
                            type="text"
                            name="filter-name"
                            id="filter-name"
                            value={filterNameValue}
                            onChange={handleFilterNameChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="filter-flight_number">
                        Flight Number
                        <input
                            type="text"
                            name="filter-flight_number"
                            id="filter-flight_number"
                            value={filterFlightNumberValue}
                            onChange={handleFilterFlightNumberChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="filter-date">
                        Date
                        <input
                            type="text"
                            name="filter-date"
                            id="filter-date"
                            value={filterDateValue}
                            onChange={handleFilterDateChange}
                        />
                    </label>
                </div>
            </div>
            <LaunchList launches={launchesFilteredByFlightNumber}/>
            <button onClick={handleAddMore}>Load more (Pages: {totalPages - page})</button>
        </div>
    );
};

export default App;
