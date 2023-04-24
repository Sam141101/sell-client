import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './voucherWarehouse.css';
import { BASE_URL_API } from '../../requestMethods';
import { createAxiosInstance } from '../../useAxiosJWT';

const data = [
    {
        title: 'Tất cả',
        to: '/all',
        type: 'all',
    },
    {
        title: 'Mới nhất',
        to: '/new',
        type: 'new',
    },
    {
        title: 'Sắp hết hạn',
        to: '/expire',
        type: 'expire',
    },
];

const changDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};

const VoucherWarehouse = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    let id = user._id;
    let token = user.token;
    const location = useLocation();

    const dispatch = useDispatch();
    const axiosJWT = createAxiosInstance(user, dispatch);

    const type = 0;

    const [typeCoupon, setTypeCoupon] = useState('all');
    const [listCoupon, setListCoupon] = useState([]);

    const handleClick = (e) => {
        setTypeCoupon(e);
        console.log(e);
    };

    useEffect(() => {
        const getCoupon = async () => {
            try {
                const res = await axiosJWT.get(
                    // BASE_URL_API + `discount/coupon/find/${id}/${typeCoupon}`,
                    BASE_URL_API + `discounts/coupon/find/${id}/${typeCoupon}`,
                    {
                        headers: { token: `Bearer ${token}` },
                    },
                );

                setListCoupon(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getCoupon();
    }, [typeCoupon, token, id]);

    return (
        <>
            <div className="voucher-manage-user">
                <div className="voucher-file-title">Kho Voucher</div>
            </div>

            <ul className="list-choose-voucher">
                {data.map((item, index) => (
                    <li key={index} className="item-choose-voucher">
                        <span
                            onClick={() => handleClick(item.type)}
                            style={{
                                color: `${typeCoupon === item.type ? '#ee4d2d' : '#555'}`,
                            }}
                            to={item.to}
                            className="item-type-voucher"
                        >
                            {item.title}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="voucher-list">
                {listCoupon && listCoupon.length === 0 && (
                    <div className="no-vouchers">
                        <img
                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/0e8c07c8449d8d509f72f5576f79a983.png"
                            alt=""
                            className="no-vouchers-img"
                        />

                        <span className="no-vouchers-title">Không có voucher nào!</span>
                    </div>
                )}
                <div className="voucher-list-frame">
                    <div className="row">
                        {listCoupon.map((item, index) => (
                            <div className="col l-6" key={index}>
                                <div className="voucher-item">
                                    <div
                                        style={
                                            item.maximum_uses !== 1
                                                ? { display: 'block' }
                                                : { display: 'none' }
                                        }
                                        className="voucher-item-maximum_uses"
                                    >
                                        {item.maximum_uses !== 1 ? 'Số lượng có hạn' : ''}
                                    </div>

                                    <div className="voucher-item-block">
                                        <div
                                            style={
                                                item.descCoupon === 'Mã giảm giá'
                                                    ? { backgroundColor: '#ee4d2d' }
                                                    : { backgroundColor: '#00bfa5' }
                                            }
                                            className="voucher-item-type"
                                        >
                                            {item.descCoupon}
                                        </div>
                                        <div className="voucher-item-desc-block">
                                            <div className="voucher-item-code">
                                                Mã code: {item.coupon_code}
                                            </div>
                                            <div className="voucher-item-discount-amout">
                                                Giảm giá{' '}
                                                {item.discount_type === 'percentage'
                                                    ? `${item.discount_amount}%`
                                                    : `${item.discount_amount}₫`}{' '}
                                                cho đơn hàng tối thiểu là ₫
                                                {item.minimum_purchase_amount}
                                            </div>
                                            <div className="voucher-item-expired">
                                                HSD: {changDate(item.expiration_date)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VoucherWarehouse;
