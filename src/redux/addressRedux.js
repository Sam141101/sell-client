import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'auth',
    initialState: {
        currentAddress: null,
    },
    reducers: {
        getAddress: (state, action) => {
            state.currentAddress = action.payload;
        },

        logoutAddress: (state, action) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = false;
        },
    },
});

export const { getAddress, logoutAddress } = addressSlice.actions;
export default addressSlice.reducer;
