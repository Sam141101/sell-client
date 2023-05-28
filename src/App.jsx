import ProductList from './pages/ProductList';
import Home from './pages/Home';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
// import ConfirmDelete from './components/ConfirmDelete/ConfirmDelete';
// import Pagination from './components/Pagination/Pagination';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from './pages/Search/Search';
import ShipmentDetails from './pages/ShipmentDetails/ShipmentDetails';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ChangePassword from './pages/ChangePassword/ChangePassword';
// import Test from './pages/Test';
import { authenticatedRoutes, publicRoutes } from './routes/publicRouter';
import DefaultLayoutPolicy from './components/Layout/DefaultLayoutPolicy';
// import { Fragment } from 'react';
// import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
// import OrderCancel from './pages/OrderSuccess/OrderCancel';
// import Evaluate from './pages/Evaluate/Evaluate';
import Complete from './components/WaitForProduct/Complete';
import { useEffect } from 'react';
// import { BASE_URL_API } from './requestMethods';
// import axios from 'axios';
// import Cookies from 'js-cookie';

import { checkAuth } from './support';
import React from 'react';

function App() {
    // test
    const user = useSelector((state) => state.auth?.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        checkAuth(user, dispatch);
    }, [user]);

    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;

                    let Layout = DefaultLayoutPolicy;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        // Layout = Fragment;
                        Layout = React.Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout
                                    item2={route.item2}
                                    show1={route.show1}
                                    // show2={route.show2}
                                    // show3={route.show3}
                                >
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}

                {authenticatedRoutes.map((route, index) => {
                    const Page = route.component;

                    let Layout = DefaultLayoutPolicy;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        // if (route.show1 || route.show2 || route.show3) {
                        //     Layout = 'div';
                        // } else {
                        //     Layout = React.Fragment;
                        // }

                        // Layout = React.Fragment;

                        Layout = 'div';
                    }

                    // Thêm bảo vệ cho tuyến đường trong trường hợp người dùng chưa đăng nhập
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                user ? (
                                    <Layout
                                        // item2={route.item2}
                                        show1={route.show1}
                                        show2={route.show2}
                                        show3={route.show3}
                                    >
                                        <Page />
                                    </Layout>
                                ) : (
                                    <Navigate to="/login" replace />
                                    // navigate('/')
                                )
                            }
                        />
                    );
                })}

                {/* <Route path="/account/profile" element={<UserProfile />} /> */}

                {/* <Route path="/testlll" element={<Evaluate />} /> */}
                <Route path="/testlll2" element={<Complete />} />

                {/* <Route path="/baocao" element={<NewPassword />} /> */}

                <Route path="/registerTest" element={<ChangePassword />} />

                {/* test paypal */}
                {/* <Route path="/test" element={<Test />} /> */}

                {/* <Route path="/test11" element={<OrderSuccess />} />
                <Route path="/test12" element={<OrderCancel />} /> */}

                {/* <Route path="/ttt5" element={<Register />} /> */}
                {/* <Route path="/change-account" element={<ChangePassword />} /> */}

                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* sản phẩm */}
                <Route path="/search/:category" element={<Search />} />
                {/* <Route path="/account/profile" element={<UserProfile />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/products/:category" element={<ProductList />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<Product />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<ShipmentDetails />} />

                {/* <Route path="/products/:category/" element={<ProductList />} /> */}

                {/* Thử nghiệm */}
                {/* <Route
                    path="/auth/:id/verify/:token"
                    element={user ? <Navigate to="/" /> : <Register />}
                /> */}

                {/* đúng */}
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

                {/* rác */}
                {/* <Route path="/test" element={<Test menu={menu} />} /> */}
                {/* <Route path="/ttt4" element={<TestList />} /> */}
                {/* <Route path="/about" element={<Introduce />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
