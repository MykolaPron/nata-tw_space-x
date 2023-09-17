import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    launches: [],
    page: 1,
    totalPages: 1
}

export const launchSlice = createSlice({
    name: 'launch',
    initialState,
    reducers: {
        addLaunches: (state, action) => {
            state.launches = [...state.launches, ...action.payload]
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
    },
})

export const {
    addLaunches,
    setTotalPages,
    setPage
} = launchSlice.actions

export default launchSlice.reducer
