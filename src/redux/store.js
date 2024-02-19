import { configureStore } from "@reduxjs/toolkit"
import customizeReducer from "./features/customize/customizeSlice"

const store = configureStore({
    reducer: {
        customize: customizeReducer,
    },
})

export default store;