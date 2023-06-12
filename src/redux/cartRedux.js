import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: null,
        quantity: 0,
        total: 0,
    },
    reducers: {
        getAllProduct: (state, action) => {
            // console.log('action.payload.product', action.payload.product);
            state.products = action.payload.product;
            state.total = action.payload.pricecart;
            state.quantity = action.payload.quanticart;
        },

        addProduct: (state, action) => {
            state.quantity = action.payload.total_quantity;
        },

        updatedProduct: (state, action) => {
            const tt = state.products.findIndex((item) => item._id === action.payload.id);
            state.products[tt].quantity = action.payload.update.quantiProduct;
            state.products[tt].price = action.payload.update.priceProduct;
            state.total = action.payload.update.totalpriceProduct;
            console.log(action.payload);
        },

        // removeProduct: (state, action) => {
        //     state.quantity -= 1;
        //     const tt = state.products.findIndex((item) => item._id === action.payload);
        //     // state.total -=
        //     //     state.products[tt].product_id.price * state.products[tt].quantity;
        //     state.total -= state.products[tt].price * state.products[tt].quantity;
        //     state.products.splice(tt, 1);
        // },

        removeProduct: (state, action) => {
            state.quantity -= 1;
            const tt = state.products.findIndex((item) => item._id === action.payload);
            console.log('state.total', state.total);
            console.log(
                'state.products[tt].price * state.products[tt].quantity',
                state.products[tt].price * state.products[tt].quantity,
            );

            if (state.products[tt].product_id.discountProduct_id.discount_amount > 0) {
                state.total =
                    state.total -
                    state.products[tt].product_id.price *
                        (1 -
                            state.products[tt].product_id.discountProduct_id
                                .discount_amount /
                                100) *
                        state.products[tt].quantity;
            } else {
                state.total =
                    state.total -
                    state.products[tt].product_id.price * state.products[tt].quantity;
            }
            console.log('state.total1', state.total);

            state.products.splice(tt, 1);
        },

        resetProduct: (state, action) => {
            state.products = null;
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, removeProduct, getAllProduct, updatedProduct, resetProduct } =
    cartSlice.actions;

export default cartSlice.reducer;
