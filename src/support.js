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

export const notifyCondition = (message, time) => {
    console.log('support', message, time);
    if (message) {
        setTimeout(() => {
            alert(message);
        }, time);
        return;
    }
};

export const checkAuth = async (user, dispatch) => {
    if (user) {
        // Nếu đã lưu user trong localStorage, kiểm tra token
        if (user.token) {
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
