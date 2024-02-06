import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resturant: {
        id: null,
        imgUrl: null,
        title: null,
        rating: null,
        genre: null,
        address: null,
        short_description: null,
        dishes: null,
        long: null,
        lat: null
    },
}

export const resturantSlice = createSlice({
    name: 'Resturant',
    initialState,

    //   Reducers are the actions that we want to add 

    reducers: {
        setResturant: (state, action) => {
            state.resturant = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {setResturant} = resturantSlice.actions

// It will help us to view the items in the basket
export const selectResturant = (state) => state.resturant.resturant;



export default resturantSlice.reducer