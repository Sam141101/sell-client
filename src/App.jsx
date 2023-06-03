import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticatedRoutes, publicRoutes } from './routes/publicRouter';
import DefaultLayoutPolicy from './components/Layout/DefaultLayoutPolicy';
import { useEffect } from 'react';

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
            </Routes>
        </Router>
    );
}

export default App;
