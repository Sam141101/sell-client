import { createSlice } from '@reduxjs/toolkit';

const temporarySlice = createSlice({
    name: 'temporary',
    initialState: {
        amount: null,
        orderId: null,
        cartid: null,
    },
    reducers: {
        // getTemporary: (state, action) => {
        //     state.amount = action.payload.product;
        //     state.orderId = action.payload.pricecart;
        // },

        addTemporary: (state, action) => {
            console.log(action.payload);
            state.amount = action.payload.total;
            state.orderId = action.payload.orderId;
            state.cartid = action.payload.cartid;
        },

        resetTemporary: (state, action) => {
            state.amount = null;
            state.orderId = null;
            state.cartid = null;
        },
    },
});

export const { resetTemporary, addTemporary, getTemporary } = temporarySlice.actions;

export default temporarySlice.reducer;
