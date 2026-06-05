import { createSlice } from '@reduxjs/toolkit'

const normalizeCollectionItem = (item) => {
    const mediaUrl = item.src || item.thumbnail || item.url || item.image || item.images?.downsized?.url || ''
    return {
        ...item,
        src: mediaUrl,
    }
}

const initialItems = JSON.parse(localStorage.getItem('collection') ?? '[]')
const initialState = {
    items: Array.isArray(initialItems) ? initialItems.map(normalizeCollectionItem) : [],
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        addCollection: (state, action) => {
            const alreadyExists = state.items.find((item) => item.id === action.payload.id)
            if (!alreadyExists) {
                state.items.push(action.payload)
                localStorage.setItem('collection', JSON.stringify(state.items))
            }
        },
        removeCollection: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
            localStorage.setItem('collection', JSON.stringify(state.items))
        },
        clearCollection: (state) => {
            state.items = []
            localStorage.removeItem('collection')
        },
    },
})

export default collectionSlice.reducer
export const { addCollection, removeCollection, clearCollection } = collectionSlice.actions