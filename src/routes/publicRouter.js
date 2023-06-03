import DefaultLayoutAuth from '../components/Layout/DefaultLayoutAuth';
import DefaultLayoutOrder from '../components/Layout/DefaultLayoutOrder';
import Canceled from '../components/WaitForProduct/Canceled';
import Complete from '../components/WaitForProduct/Complete';
import Delivering from '../components/WaitForProduct/Delivering';
import WaitForConfirmation from '../components/WaitForProduct/WaitForConfirmation';
import WaitForTheGoods from '../components/WaitForProduct/WaitForTheGoods';
import About from '../pages/About/About';
import Cart from '../pages/Cart/Cart';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import EmailVerify from '../pages/EmailVerify/EmailVerify';
import Evaluate from '../pages/Evaluate/Evaluate';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import HandleAddress from '../pages/HandleAddress/HandleAddress';
import Home from '../pages/Home';
import Login from '../pages/Login/Login';
import NewPassword from '../pages/NewPassword/NewPassword';
import OrderCancel from '../pages/OrderSuccess/OrderCancel';
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess';
import PolicyProtect from '../pages/PolicyProtect/PolicyProtect';
import PolicyReturn from '../pages/PolicyReturn/PolicyReturn';
import PolicyService from '../pages/PolicyService/PolicyService';
import Product from '../pages/Product/Product';
import ProductList from '../pages/ProductList';
import Register from '../pages/Register/Register';
import Search from '../pages/Search/Search';
import ShipmentDetails from '../pages/ShipmentDetails/ShipmentDetails';
// import Test from '../pages/Test';
// import TestList from '../pages/TestList/TestList';
import UserProfile from '../pages/UserProfile/UserProfile';
import VoucherWarehouse from '../pages/VoucherWarehouse/VoucherWarehouse';

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
        component: Register,
        layout: DefaultLayoutAuth,
    },

    {
        path: '/products/:category',
        component: ProductList,
        layout: DefaultLayoutAuth,
    },

    {
        path: '/product/:id',
        component: Product,
        layout: DefaultLayoutAuth,
    },

    {
        path: '/',
        component: Home,
        layout: DefaultLayoutAuth,
    },

    {
        path: '/search/:category',
        component: Search,
        layout: DefaultLayoutAuth,
    },

    {
        path: '/cart',
        component: Cart,
        layout: DefaultLayoutAuth,
    },
];

// Người dùng đăng nhập
const authenticatedRoutes = [
    // order
    {
        path: '/wait-for-confirmation',
        component: WaitForConfirmation,
        layout: DefaultLayoutOrder,
        show1: 1,
    },
    {
        path: '/waiting-for-the-goods',
        component: WaitForTheGoods,
        layout: DefaultLayoutOrder,
        show1: 1,
    },

    {
        path: '/delivering',
        component: Delivering,
        layout: DefaultLayoutOrder,
        show1: 1,
    },

    {
        path: '/complete',
        component: Complete,
        layout: DefaultLayoutOrder,
        show1: 1,
    },

    {
        path: '/canceled',
        component: Canceled,
        layout: DefaultLayoutOrder,
        show1: 1,
    },

    // order status
    {
        path: '/dat-hang-thanh-cong',
        component: OrderSuccess,
        layout: null,
    },

    {
        path: '/dat-hang-that-bai',
        component: OrderCancel,
        layout: null,
    },

    // user profile
    {
        path: '/account/profile',
        component: UserProfile,
        layout: DefaultLayoutOrder,
        show2: 1,
    },

    // change password
    {
        path: '/account/change-password',
        component: ChangePassword,
        layout: DefaultLayoutOrder,
        // show2: 1,
    },

    // change address
    {
        path: '/account/address',
        // component: Test,
        component: HandleAddress,
        layout: DefaultLayoutOrder,
        // show2: 1,
    },

    // voucher Warehouse
    {
        path: '/voucher-user',
        component: VoucherWarehouse,
        layout: DefaultLayoutOrder,
        show3: 1,
    },

    // Evaluate
    {
        // path: '/danh-gia-san-pham/:id',
        path: '/danh-gia-san-pham/:product_id/:order_id',
        component: Evaluate,
        layout: DefaultLayoutAuth,
    },

    {
        path: '/order',
        component: ShipmentDetails,
        layout: null,
    },
];

export { publicRoutes, authenticatedRoutes };
