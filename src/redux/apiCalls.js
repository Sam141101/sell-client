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
    updateFailure,
    updateSuccess,
} from './authRedux';
import { removeProduct, addProduct, getAllProduct, updatedProduct } from './cartRedux';
import { getProductList } from './productRedux';

// Login
export const login = async (dispatch, user, navigate) => {
    dispatch(loginStart());

    try {
        const res = await axios.post(BASE_URL_API + 'auth/login', user, {
            withCredentials: true,
        });
        console.log('Success-login', res.data);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (err) {
        console.log(err);
        dispatch(loginFailure());
        navigate('/login');
    }
};

export const getProducts = async (token, dispatch, axios) => {
    try {
        const res = await axios.get(BASE_URL_API + 'carts/find/', {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(getProductList(res.data));
    } catch (err) {
        console.log('that bai');
        console.log(err);
    }
};

// Register
export const register = async (dispatch, inputss, navigate, setNotify) => {
    dispatch(registerStart());

    try {
        const res = await axios.post(BASE_URL_API + 'auth/register', inputss);
        dispatch(registerSuccess());
        setNotify(res.data);
        // console.log(res.data);
        // navigate('/login');
        return res.data;
    } catch (err) {
        dispatch(registerFailure());
        console.log(err);
    }
};

// Logout
export const logout = async (dispatch, id, token, axiosJWT, navigate) => {
    dispatch(logoutStart());

    try {
        await axiosJWT.post(
            BASE_URL_API + 'auth/logout',
            {
                userId: id,
            },
            {
                headers: { token: `Bearer ${token}` },
            },
        );
        dispatch(logoutSuccess());
        // if (navigate !== undefined) {
        if (!navigate) {
            navigate('/');
        }
    } catch (err) {
        console.log(err);
        dispatch(logoutFailure());
    }
};

// Get ALL product cart
export const getAllCart = async (token, dispatch, userId, axiosJWT) => {
    try {
        const res = await axiosJWT.get(BASE_URL_API + 'carts/find/' + userId, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(getAllProduct(res.data));
    } catch (err) {
        console.log('that bai');
        console.log(err);
    }
};

// export const addCart = async (token, dispatch, product, cartproduct) => {
export const addCart = async (token, dispatch, product, cartproduct, axiosJWT) => {
    try {
        // const res = await axios.post(BASE_URL_API + 'carts/', product, {
        const res = await axiosJWT.post(BASE_URL_API + 'carts/', product, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(addProduct(res.data.cart));
        return res.data.message;
    } catch (err) {
        console.log(err);
    }
};

// Update product cart
export const updateProduct = async (token, dispatch, id, update, condition, axiosJWT) => {
    try {
        await axiosJWT.put(BASE_URL_API + 'carts/' + id, update, {
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
        const res = await axiosJWT.delete(BASE_URL_API + 'carts/' + id, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(removeProduct(id));
        return res.data; // Trả về kết quả xóa sản phẩm
    } catch (err) {
        console.log(err);
        console.log('that bai');
    }
};

// Update user
export const updateUser = async (token, dispatch, id, update, axiosJWT) => {
    dispatch(updateStart());
    console.log('token', token);
    try {
        console.log('link', BASE_URL_API + `users/${id}`);

        const res = await axiosJWT.put(BASE_URL_API + `users/${id}`, update, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(updateSuccess(res.data.userCurrent));
        console.log('res', res.data);
        return res.data.message;
    } catch (err) {
        dispatch(updateFailure());
    }
};

// ----------------------------------------------------------------

// user evaluate product
export const postCommnetUser = async (token, user_id, infoComment, axiosJWT) => {
    try {
        await axiosJWT.post(BASE_URL_API + `comments/${user_id}`, infoComment, {
            headers: { token: `Bearer ${token}` },
        });
    } catch (err) {
        console.log(err);
    }
};
