import { configureStore } from '@reduxjs/toolkit'
import launchReducer from "./reducers/launchSlice"
export const store = configureStore({
    reducer: {
        launch: launchReducer
    },
})
