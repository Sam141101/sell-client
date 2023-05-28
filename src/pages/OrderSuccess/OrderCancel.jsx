import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetTemporary } from '../../redux/temporaryRedux';
import axios from 'axios';
import './orderSuccess.css';
import { BASE_URL_API } from '../../requestMethods';
// import app from '../firebase'

const OrderCancel = () => {
    // const user = useSelector((state) => state.auth?.currentUser);
    const orderId = useSelector((state) => state.temporary?.orderId);
    // const token = user.token;
    const [show, setShow] = useState(true);
    // const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(
                    BASE_URL_API + `paypal/cancel/?&orderId=${orderId}`,
                );
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
            navigate('/cart');
        }, 5000);
    }, []);

    return (
        <>
            {show && (
                <div className="user-profile-mobile-frame">
                    <div className="user-profile-wrapper">
                        <div className="user-profile-noti">
                            <img
                                className="user-profile-noti-img"
                                src="https://media.istockphoto.com/id/1276735653/vi/vec-to/d%E1%BA%A5u-ch%C3%A9o-%C4%91%E1%BB%8F-v%E1%BA%BD-tay-c%E1%BB%8D-v%E1%BA%BD-x-ch%E1%BB%AF-vi%E1%BA%BFt-tay-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ch%C3%A9o-%C4%91%C6%B0%E1%BB%A3c-v%E1%BA%BD-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-m%C3%A0u-tr%E1%BA%AFng.jpg?s=170667a&w=0&k=20&c=3AiD1H5jPn7jezdqc41vvZLten8KnYp5QAvdKPnjb2g="
                                alt=""
                            />

                            <p className="user-profile-text-noti">Đặt hàng thất bại</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderCancel;
