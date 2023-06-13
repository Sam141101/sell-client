import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        currentProduct: null,
    },
    reducers: {
        getProductLists: (state, action) => {
            state.currentProduct = action.payload;
        },

        // logoutAddress: (state, action) => {
        //     state.isFetching = false;
        //     state.currentUser = null;
        //     state.error = false;
        // },
    },
});

export const { getProductLists } = productSlice.actions;
export default productSlice.reducer;
