import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';
import { createAxiosInstance } from '../../useAxiosJWT';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { BASE_URL_API } from '../../requestMethods';

function DefaultLayoutAuth({ children, page }) {
    const user = useSelector((state) => state.auth?.currentUser);
    const quantity = useSelector((state) => state.cart?.quantity);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const axiosJWT = createAxiosInstance(user, dispatch);

    return (
        <div className="default-layout-wrapper">
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
                    }),
                )}
            </>

            <Footer />
        </div>
    );
}

export default DefaultLayoutAuth;
