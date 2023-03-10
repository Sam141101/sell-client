import ProductList from './pages/ProductList';
import Home from './pages/Home';
import Product from './pages/Product/Product';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Cart from './pages/Cart/Cart';
// import ConfirmDelete from './components/ConfirmDelete/ConfirmDelete';
// import Pagination from './components/Pagination/Pagination';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    // Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfile from './pages/UserProfile/UserProfile';
import Search from './pages/Search/Search';
import EmailVerify from './pages/EmailVerify/EmailVerify';
import ShipmentDetails from './pages/ShipmentDetails';
import Purchase from './pages/Purchase';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import NewPassword from './pages/NewPassword/NewPassword';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import About from './pages/About/About';
import Introduce from './components/Introduce';
import PolicyReturn from './pages/PolicyReturn/PolicyReturn';
import PolicyProtect from './pages/PolicyProtect/PolicyProtect';
import PolicyService from './pages/PolicyService/PolicyService';
import TestList from './pages/TestList/TestList';
import Test from './pages/Test';
import { publicRoutes } from './routes/publicRouter';
import DefaultLayoutPolicy from './components/Layout/DefaultLayoutPolicy';
import { Fragment } from 'react';

function App() {
    // test
    const user = useSelector((state) => state.auth?.currentUser);

    //

    // const menu = [
    //     {
    //         id: '1',
    //         title: 'Menu Item 1',
    //         path: '/menu-item-1',
    //     },
    //     {
    //         id: '2',
    //         title: 'Menu Item 2',
    //         path: '/menu-item-2',
    //         children: [
    //             {
    //                 id: '3',
    //                 title: 'Submenu Item 2.1',
    //                 path: '/submenu-item-2-1',
    //             },
    //             {
    //                 id: '4',
    //                 title: 'Submenu Item 2.2',
    //                 path: '/submenu-item-2-2',
    //                 children: [
    //                     {
    //                         id: '5',
    //                         title: 'Sub-Submenu Item 2.2.1',
    //                         path: '/sub-submenu-item-2-2-1',
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    //     {
    //         id: '6',
    //         title: 'Menu Item 3',
    //         path: '/menu-item-3',
    //     },
    // ];

    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;

                    let Layout = DefaultLayoutPolicy;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout item2={route.item2} show1={route.show1}>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}

                {/* <Route path="/ttt5" element={<Register />} /> */}
                <Route path="/change-account" element={<ChangePassword />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/ttt" element={<Purchase />} />

                {/* s???n ph???m */}
                <Route path="/search/:category" element={<Search />} />
                <Route path="/account/profile" element={<UserProfile />} />
                <Route path="/" element={<Home />} />
                <Route path="/products/:category" element={<ProductList />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<ShipmentDetails />} />

                {/* Th??? nghi???m */}
                {/* <Route
                    path="/auth/:id/verify/:token"
                    element={user ? <Navigate to="/" /> : <Register />}
                /> */}

                {/* ????ng */}
                {/* <Route path="/auth/:id/verify/:token" element={<Register />} /> */}
                {/* <Route
                    path="/cart"
                    element={user ? <Navigate to="/login" /> : <Cart />}
                /> */}

                {/* public router */}
                {/* 
                 <Route path="/about" element={<About />} />
                <Route path="/chinh-sach-doi-tra" element={<PolicyReturn />} />
                <Route path="/chinh-sach-bao-mat" element={<PolicyProtect />} />
                <Route path="/dieu-khoan-dich-vu" element={<PolicyService />} />
                <Route path="/reset-password/:id/:token/" element={<NewPassword />} /> */}
                {/* <Route
                    path="/confirm/register"
                    element={user ? <Navigate to="/" /> : <EmailVerify />}
                /> */}
                {/* <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} /> */}

                {/* r??c */}
                {/* <Route path="/test" element={<Test menu={menu} />} /> */}
                {/* <Route path="/ttt4" element={<TestList />} /> */}
                {/* <Route path="/about" element={<Introduce />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
