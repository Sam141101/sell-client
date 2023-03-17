import DefaultLayoutAuth from '../components/Layout/DefaultLayoutAuth';
import DefaultLayoutOrder from '../components/Layout/DefaultLayoutOrder';
import WaitForTheGoods from '../components/WaitForTheGoods/WaitForTheGoods';
import About from '../pages/About/About';
import EmailVerify from '../pages/EmailVerify/EmailVerify';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Home from '../pages/Home';
import Login from '../pages/Login/Login';
import NewPassword from '../pages/NewPassword/NewPassword';
import PolicyProtect from '../pages/PolicyProtect/PolicyProtect';
import PolicyReturn from '../pages/PolicyReturn/PolicyReturn';
import PolicyService from '../pages/PolicyService/PolicyService';
import Register from '../pages/Register/Register';

const publicRoutes = [
    // policy
    { path: '/about', component: About, item2: 'Giới thiệu', show1: false },
    {
        path: '/chinh-sach-doi-tra',
        component: PolicyReturn,
        item2: 'Chính sách đổi trả',
        show1: false,
    },
    {
        path: '/chinh-sach-bao-mat',
        component: PolicyProtect,
        item2: 'Chính sách bảo mật',
        show1: false,
    },
    {
        path: '/dieu-khoan-dich-vu',
        component: PolicyService,
        item2: 'Điều khoản dịch vụ',
        show1: false,
    },

    // auth
    {
        path: '/forgot-password',
        component: ForgotPassword,
        layout: DefaultLayoutAuth,
        page: 'Đăng nhập',
        title: 'Khôi phục mật khẩu',
    },

    {
        path: '/reset-password/:id/:token/',
        component: NewPassword,
        page: 'Đăng nhập',
        title: 'Mật khẩu mới',
        layout: DefaultLayoutAuth,
    },

    {
        path: '/confirm/register',
        component: EmailVerify,
        layout: DefaultLayoutAuth,
    },

    {
        path: '/login',
        component: Login,
        layout: DefaultLayoutAuth,
    },

    {
        path: '/auth/:id/verify/:token',
        // path: 'ttt',
        component: Register,
        layout: DefaultLayoutAuth,
    },

    // order
    {
        path: '/wait-for-confirmation',
        component: WaitForTheGoods,
        layout: DefaultLayoutOrder,
        show1: 1,
    },
    {
        path: '/waiting-for-the-goods',
        component: WaitForTheGoods,
        layout: DefaultLayoutOrder,
        show1: 2,
    },

    {
        path: '/delivering',
        component: WaitForTheGoods,
        layout: DefaultLayoutOrder,
        show1: 3,
    },

    {
        path: '/complete',
        component: WaitForTheGoods,
        layout: DefaultLayoutOrder,
        show1: 4,
    },

    {
        path: '/canceled',
        component: WaitForTheGoods,
        layout: DefaultLayoutOrder,
        show1: 5,
    },

    // { path: '/', component: Profile },
    // { path: '/', component: Upload, layout: HeaderOnly },
    // { path: '/', component: Search, layout: null },
];

export { publicRoutes };
