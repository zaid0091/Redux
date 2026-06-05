import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../slices/searchSlice";
import collectionSlice from "../slices/collectionSlice";

export const store = configureStore({
    reducer: {
        search: searchSlice,
        collection: collectionSlice
    }
})