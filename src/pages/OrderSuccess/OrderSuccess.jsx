import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './orderSuccess.css';
import { BASE_URL_API } from '../../requestMethods';
import { resetTemporary } from '../../redux/temporaryRedux';
import Notify from '../../components/Notify/Notify';
// import app from '../firebase'

const OrderSuccess = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const amountProduct = useSelector((state) => state.temporary?.amount);
    const orderId = useSelector((state) => state.temporary?.orderId);
    const cartId = useSelector((state) => state.temporary?.cartid);

    const token = user.token;
    const [show, setShow] = useState(true);
    const [method, setMethod] = useState(false);
    const location = useLocation();

    let arr = window.location.search.slice(1).split('&');

    let arr0 = arr[0].split('=');
    let paymentId = arr0[1];

    let arr2 = arr[2].split('=');
    let payerId = arr2[1];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(
                    BASE_URL_API +
                        `paypal/success/?paymentId=${paymentId}&PayerID=${payerId}&amount=${amountProduct}&orderId=${orderId}&cartId=${cartId}`,
                );
                console.log(res.data);
                if (res.data === 'Thanh toán thất bại') {
                    navigate('/test12');
                }
                dispatch(resetTemporary());
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
            navigate('/wait-for-confirmation');
        }, 5000);
    }, []);

    return (
        <>
            {/* {show && (
                <div className="user-profile-mobile-frame">
                    <div className="user-profile-wrapper">
                        <div className="user-profile-noti">
                            <img
                                className="user-profile-noti-img"
                                src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
                                alt=""
                            />

                            <p className="user-profile-text-noti">Đặt hàng thành công</p>
                        </div>
                    </div>
                </div>
            )} */}

            <Notify show={show} title="Đặt hàng thành công" />
        </>
    );
};

export default OrderSuccess;
