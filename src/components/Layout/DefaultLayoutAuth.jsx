import { useDispatch, useSelector } from 'react-redux';
// import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';
import { createAxiosInstance } from '../../useAxiosJWT';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { BASE_URL_API } from '../../requestMethods';
import Toast from '../Toast/Toast';
import { useState } from 'react';
import { Suspense } from 'react';

const Footer = React.lazy(() => import('../Footer/Footer'));
// const Similar = React.lazy(() => import('../../components/Similar/Similar'));

function DefaultLayoutAuth({ children, page }) {
    const user = useSelector((state) => state.auth?.currentUser);
    const quantity = useSelector((state) => state.cart?.quantity);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const axiosJWT = createAxiosInstance(user, dispatch);

    const [toast, setToast] = useState({
        show: false,
    });

    return (
        <div className="default-layout-wrapper">
            {toast.show && (
                <Toast
                    title={toast.title}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    show={toast.show}
                    setShow={setToast}
                />
            )}
            <Navbar
                axiosJWT={axiosJWT}
                quantity={quantity}
                user={user}
                navigate={navigate}
                dispatch={dispatch}
            />

            <>
                {React.Children.map(children, (child) =>
                    React.cloneElement(child, {
                        axiosJWT: axiosJWT,
                        quantity: quantity,
                        user: user,
                        navigate: navigate,
                        axios: axios,
                        dispatch: dispatch,
                        BASE_URL_API: BASE_URL_API,
                        setToast: setToast,
                    }),
                )}
            </>

            <Suspense
                fallback={
                    <p style={{ padding: '20px 0', textAlign: 'center', width: '100%' }}>
                        Loading...
                    </p>
                }
            >
                <Footer />
            </Suspense>
        </div>
    );
}

export default DefaultLayoutAuth;
