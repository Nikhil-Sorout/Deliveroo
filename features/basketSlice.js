import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,

    //   Reducers are the actions that we want to add 

    reducers: {

        // action.payload will add the item into the basket. action: the element that we want to add

        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex((item) => item.id == action.payload.id);

            // Creating a dummy basket to avoid mess-up
            let newBasket = [...state.items];

            if (index >= 0) {
                // at position index remove 1 item from the array
                newBasket.splice(index, 1);
            }
            else {
                console.warn(`Can't remove product (id: ${id}) as it's not in the basket`);
            }

            state.items = newBasket;
        },

    },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

// It will help us to view the items in the basket
export const selectBasketItems = (state) => state.basket.items;

// It will select the item with the given id
export const selectBasketItemsWithId = (state, id) =>
    state.basket.items.filter((item) => item.id === id);

// Total price of items in the basket
export const selectBasketTotal = (state) => state.basket.items.reduce(((total, item) => total += item.price),0);

export default basketSlice.reducer