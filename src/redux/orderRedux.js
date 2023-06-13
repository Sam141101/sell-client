import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        // amount: {
        //     pendingA: 0,
        //     acceptA: 0,
        //     deliveryA: 0,
        //     completeA: 0,
        //     cancelA: 0,
        // },

        pending: [],
        amountpending: 0,
        amountaccept: 0,
        amountdelivery: 0,
        amountcomplete: 0,
        amountcancel: 0,
        accept: [],
        delivery: [],
        complete: [],
        cancel: [],
    },
    reducers: {
        getOrderPending: (state, action) => {
            state.pending = action.payload;
        },

        getOrderAccept: (state, action) => {
            state.accept = action.payload;
        },

        getOrderDelivery: (state, action) => {
            state.delivery = action.payload;
        },

        getOrderComplete: (state, action) => {
            state.complete = action.payload;
        },

        getOrderCancel: (state, action) => {
            state.cancel = action.payload;
        },

        ///
        getAmountPending: (state, action) => {
            state.amountpending = action.payload;
        },

        getAmountAccept: (state, action) => {
            state.amountaccept = action.payload;
        },

        getAmountDelivery: (state, action) => {
            state.amountdelivery = action.payload;
        },

        getAmountComplete: (state, action) => {
            state.amountcomplete = action.payload;
        },

        getAmountCancel: (state, action) => {
            state.amountcancel = action.payload;
        },

        // getAmountOrder: (state, action) => {
        //     state.amount.pendingA = action.payload;
        //     state.amount.acceptA = action.payload;
        //     state.amount.deliveryA = action.payload;
        //     state.amount.completeA = action.payload;
        //     state.amount.cancelA = action.payload;
        // },
    },
});

export const {
    getAmountPending,
    getAmountAccept,
    getAmountDelivery,
    getAmountComplete,
    getAmountCancel,

    // getAmountOrder,

    getOrderPending,
    getOrderAccept,
    getOrderDelivery,
    getOrderComplete,
    getOrderCancel,
} = orderSlice.actions;

export default orderSlice.reducer;
