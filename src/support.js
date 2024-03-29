import jwt_decode from 'jwt-decode';
import { logout } from './redux/apiCalls';
import { resetProduct } from './redux/cartRedux';
import { createAxiosInstance } from './useAxiosJWT';

export const togglePasswordVisibility = (id) => {
    var x = document.getElementById(`${id}`);
    if (x.type === 'password') {
        x.type = 'text';
    } else {
        x.type = 'password';
    }
};

export const formatMoney = (money) => {
    if (typeof money !== 'number' || isNaN(money)) {
        return '';
    }
    return money.toLocaleString('en-US');
};

export const changDate = (isoString, noTime) => {
    if (noTime === true && isoString == null) {
        return `không có giới hạn thời gian`;
    } else {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    }
};

export const checkAuth = async (user, dispatch) => {
    if (user) {
        // Nếu đã lưu user trong localStorage, kiểm tra token
        if (user.token) {
            console.log('check axios');
            // Giải mã token để lấy ra thông tin payload (expiry time) và kiểm tra xem nó đã hết hạn chưa
            const decodedToken = jwt_decode(user.token);
            const currentTime = Date.now() / 1000;
            // if (decodedToken.exp < currentTime || !refreshToken) {
            if (decodedToken.exp < currentTime) {
                const axiosJWT = createAxiosInstance(user, dispatch);
                console.log('axiosJWT', axiosJWT);
                if (axiosJWT) {
                    logout(dispatch, user._id, user.token, axiosJWT);
                    resetProduct();
                }
            }
        }
        // else if (!user.token) {
        //     const axiosJWT = createAxiosInstance(user, dispatch);
        //     logout(dispatch, user._id, user.token, axiosJWT);
        //     resetProduct();
        // }
    }
};
