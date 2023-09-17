import React, {useEffect, useRef, useState} from 'react';
import LaunchList from "./components/LaunchList";
import {getLaunchesByPage} from "./services/launchesService";
import {useDispatch, useSelector} from "react-redux";
import {addLaunches, setPage, setTotalPages} from "./redux/reducers/launchSlice";

const App = () => {
    const observerTarget = useRef(null);

    const launches = useSelector((state) => state.launch.launches)
    const page = useSelector((state) => state.launch.page)
    const totalPages = useSelector((state) => state.launch.totalPages)

    const dispatch = useDispatch()

    const [filterNameValue, setFilterNameValue] = useState("")
    const [filterFlightNumberValue, setFilterFlightNumberValue] = useState("")
    const [filterDateValue, setFilterDateValue] = useState("")
    const [canObserve, setCanObserve] = useState(false)

    useEffect(() => {
        getLaunchesByPage().then((response) => {
            dispatch(addLaunches(response.data.docs))
            dispatch(setTotalPages(response.data.totalPages))
            setCanObserve(true)
        })
    }, [])

    const handleAddMore = () => {
        setCanObserve(false)
        const newPage = page + 1

        if (newPage > totalPages) {
            return;
        }

        getLaunchesByPage(newPage).then((response) => {
            dispatch(addLaunches(response.data.docs))
            dispatch(setPage(newPage))
            setCanObserve(true)
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
        if (filterFlightNumberValue === "") {
            return launches
        }

        return launches.filter((launch) => {
            return launch.flight_number === Number(filterFlightNumberValue)
        })
    }


    const getLaunchesFilteredDate = (launches) => {
        return launches.filter((launch) => {
            const date = new Date(launch.date_unix)

            return date.toLocaleDateString().includes(filterDateValue)
        })
    }

    const launchesFilteredByName = getLaunchesFilteredByName(launches)
    const launchesFilteredByFlightNumber = getLaunchesFilteredByFlightNumber(launchesFilteredByName)
    const launchesFilteredByDate = getLaunchesFilteredDate(launchesFilteredByFlightNumber)


    useEffect(() => {
        if(!canObserve){
            return
        }
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    handleAddMore()
                }
            },
            {
                rootMargin: '0px',
                threshold: [ 0, 0.5 ]
            }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget, page, totalPages, canObserve]);

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
            <LaunchList launches={launchesFilteredByDate}/>
            <button onClick={handleAddMore}>Load more (Pages: {totalPages - page})</button>
            <div ref={observerTarget} style={{
                height: "10px"
            }}></div>
        </div>
    );
};

export default App;
