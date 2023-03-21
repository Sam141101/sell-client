import axios from 'axios';
import { BASE_URL_API } from '../requestMethods';

import {
    loginFailure,
    loginStart,
    loginSuccess,
    registerFailure,
    registerStart,
    registerSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    updateStart,
    updateSuccess,
    updateFailure,
} from './authRedux';
import {
    addCartStart,
    addCartSuccess,
    addCartFailure,
    removeProduct,
    addProduct,
    getAllProduct,
    updatedProduct,
} from './cartRedux';

// Login
export const login = async (dispatch, user, navigate) => {
    dispatch(loginStart());

    try {
        // const res = await axios.post('http://localhost:5000/api/auth/login', user);
        const res = await axios.post(BASE_URL_API + 'auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (err) {
        dispatch(loginFailure());
        navigate('/login');
    }
};

// Register
export const register = async (dispatch, user, navigate) => {
    dispatch(registerStart());

    try {
        const res = await axios.post(BASE_URL_API + 'auth/register', user);
        dispatch(registerSuccess());
        console.log(res.data);

        navigate('/login');
    } catch (err) {
        dispatch(registerFailure());
        console.log(err);
    }
};

// Logout
export const logout = async (dispatch, navigate, id, token, axiosJWT) => {
    dispatch(logoutStart());

    try {
        // await axiosJWT.post('http://localhost:5000/api/auth/logout/' + id, {
        await axiosJWT.post(BASE_URL_API + 'auth/logout', id, {
            // await axios.post('http://localhost:5000/api/auth/logout', id, {
            headers: { token: `Bearer ${token}` },
        });
        console.log('có');
        dispatch(logoutSuccess());
        navigate('/');
    } catch (err) {
        dispatch(logoutFailure());
    }
};

// Get ALL product cart
export const getAllCart = async (token, dispatch, userId) => {
    try {
        const res = await axios.get(BASE_URL_API + 'carts/find/' + userId, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(getAllProduct(res.data));
    } catch (err) {
        console.log('that bai');
        console.log(err);
    }
};

// export const addCart = async (token, dispatch, product, cartproduct) => {
export const addCart = async (token, dispatch, product, cartproduct) => {
    try {
        const res = await axios.post(BASE_URL_API + 'carts/', product, {
            headers: { token: `Bearer ${token}` },
        });
        // dispatch(addProduct(cartproduct));
        dispatch(addProduct(res.data));
    } catch (err) {
        console.log(err);
    }
};

// Update product cart
export const updateProduct = async (token, dispatch, id, update, condition) => {
    try {
        await axios.put(BASE_URL_API + 'carts/' + id, update, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(updatedProduct({ id, update }));
    } catch (err) {
        console.log('that bai');
    }
};

// Delete product cart
export const deleteProduct = async (token, dispatch, id, axiosJWT, navigate) => {
    try {
        await axios.delete(BASE_URL_API + 'carts/' + id, {
            // await axiosJWT.delete('http://localhost:5000/api/carts/' + id, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(removeProduct(id));
        // navigate('/');
    } catch (err) {
        console.log('that bai');
    }
};

// Update user
export const updateUser = async (token, dispatch, id, update) => {
    dispatch(updateStart());

    try {
        const res = await axios.put(BASE_URL_API + `users/${id}`, update, {
            headers: { token: `Bearer ${token}` },
        });
        // dispatch(updateSuccess(res.data));
    } catch (err) {
        dispatch(updateFailure());
    }
};

// ----------------------------------------------------------------
export const search = async (dispatch, id, update) => {
    try {
        const search = await axios.get(BASE_URL_API + 'search/');
        console.log(search.data);
    } catch (err) {
        console.log('that bai');
    }
};

// user evaluate product
export const postCommnetUser = async (token, user_id, infoComment) => {
    try {
        await axios.post(BASE_URL_API + `comments/${user_id}`, infoComment, {
            headers: { token: `Bearer ${token}` },
        });
    } catch (err) {
        console.log(err);
    }
};
