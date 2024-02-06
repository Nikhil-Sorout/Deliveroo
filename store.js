// This is the global store for our app

import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/basketSlice'
import resturantReducer from './features/resturantSlice'

export const store = configureStore({
  // connecting our slices to the global store
  reducer: {
    basket: basketReducer,
    resturant: resturantReducer,
  },
})
