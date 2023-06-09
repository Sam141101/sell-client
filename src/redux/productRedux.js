import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
    },
    reducers: {
        getProductList: (state, action) => {
            console.log('action.payload.product', action.payload.product);
            state.products = action.payload;
        },
    },
});

export const { getProductList } = productSlice.actions;

export default productSlice.reducer;
