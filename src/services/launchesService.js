import axios from "axios";

export const getLaunchesByPage = (page) => {
    return axios.post("https://api.spacexdata.com/v5/launches/query", {
        "query": {},
        "options": {
            page
        }
    })
}
