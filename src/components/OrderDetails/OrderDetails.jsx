import React, { useState, useEffect } from 'react';
import { KeyboardBackspace, LocalShipping, Payment } from '@mui/icons-material';
import './orderDetails.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TitleStatus = (status) => {
    let showText = '';
    if (status === 'wait-for-confirmation') {
        showText = 'Chờ xác nhận đơn hàng';
    } else if (status === 'waiting-for-the-goods') {
        showText = 'Đang chuẩn bị hàng';
    } else if (status === 'delivering') {
        showText = 'Đang giao hàng';
    } else if (status === 'complete') {
        showText = 'Đơn hàng đã hoàn thành';
    } else if (status === 'canceled') {
        showText = 'Đơn hàng đã huỷ';
    }
    return showText;
};

const OrderDetails = ({
    BASE_URL_API,
    axiosJWT,
    user,
    changDate,
    formatMoney,
    dispatch,
    navigate,
}) => {
    const location = useLocation();
    const orderId = location.pathname.split('/')[2];
    const statusOrder = location.pathname.split('/')[1];

    const address = useSelector((state) => state.address?.currentAddress);
    const orderDetails = useSelector((state) => {
        const products = state?.order[statusOrder]; // hoặc dùng Array.isArray(state?.order[statusOrder]) để kiểm tra
        if (Array.isArray(products)) {
            return products.filter((product) => product._id === orderId);
        } else {
            return [];
        }
    });
    console.log('orderDetails', orderDetails);

    console.log('orderId', orderId);
    // const [order, setOrder] = useState({});

    const handleReturn = () => {
        navigate(`/${statusOrder}`);
    };

    // useEffect(() => {
    //     const getOrderDetail = async () => {
    //         try {
    //             const res = await axiosJWT.get(
    //                 BASE_URL_API + `orders/${user._id}/` + orderId,
    //                 {
    //                     headers: { token: `Bearer ${user.token}` },
    //                 },
    //             );
    //             setOrder(res.data);
    //             console.log('res.data', res.data);
    //         } catch (err) {
    //             console.log(err);
    //             console.log('that bai');
    //         }
    //     };

    //     getOrderDetail();
    // }, [user.token, orderId]);

    return (
        <div className="enviroment-mobile env-mobi-active">
            <div className="order-title-relate df ai fw500" style={{ textAlign: 'left' }}>
                <KeyboardBackspace
                    onClick={handleReturn}
                    className="order-detail-return-icon cs"
                />
                Thông tin đơn hàng
            </div>
            <p className="order-details-status">{TitleStatus(statusOrder)}</p>

            <div className="order-details-title df">
                <div className="order-details-status-service">
                    {/* <div className="order-details-service"> */}
                    <div className="df">
                        <LocalShipping
                            style={{
                                marginRight: '15px',
                                marginTop: '3px',
                                fontSize: '20px',
                            }}
                        />
                        <div className="df flex-direction">
                            <p className="fw500 fz16">Đơn vị vận chuyển</p>
                            <p>Giao hàng nhanh</p>
                        </div>
                    </div>
                </div>
                <div className="order-details-address">
                    <p className="fw500 fz16">Địa chỉ nhận hàng</p>
                    <p className="user-order-details">{user.fullname}</p>
                    <p className="user-order-details">{user.phone}</p>
                    <p className="user-order-details">{`${address.address}, Phường ${address.ward}, ${address.district}, TP. ${address.province}`}</p>
                </div>
            </div>
            <div className="order-details-container">
                {/* {order.orderList?.products.map((item, index) => ( */}
                {orderDetails?.products.map((item, index) => (
                    <Link
                        to={`/product/${item.product_id._id}`}
                        className="wait-purchase-product-order"
                        key={index}
                    >
                        <div className="wait-purchase-details-product df ai">
                            <img
                                className="wait-purchase-img"
                                alt=""
                                src={item.product_id.img}
                            />
                            <div className="wait-purchase-info">
                                <div className="wait-purchase-name-size df flex-direction">
                                    <div>{item.product_id.title}</div>
                                    <div>{item.size}</div>
                                </div>
                                <div className="wait-purchase-price-quanti df flex-direction">
                                    <div style={{ textAlign: 'right' }}>
                                        x{item.quantity}
                                    </div>
                                    <div>
                                        {item.discount !== 0 && (
                                            <del>
                                                {formatMoney(item.product_id.price)}₫
                                            </del>
                                        )}
                                        <span className="disocunt-product">
                                            {formatMoney(
                                                item.discount
                                                    ? item.product_id.price *
                                                          (1 - item.discount / 100)
                                                    : item.product_id.price,
                                            )}
                                            ₫
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                <div className="order-details-total-prices df ai fz16 fw500">
                    <span>Thành tiền:</span>
                    <span>
                        {formatMoney(
                            // order.orderList?.amount + order.orderList?.transportFee,
                            orderDetails?.amount + orderDetails?.transportFee,
                        )}
                        ₫
                    </span>
                </div>
            </div>

            <div className="order-details-method">
                <div className="df">
                    <Payment
                        style={{
                            marginRight: '15px',
                            fontSize: '20px',
                        }}
                    />
                    <div className="df flex-direction">
                        <p className="fw500 fz16">Phương thức thanh toán</p>
                        <p>
                            {/* {order.orderList?.method === 'paypal' */}
                            {orderDetails?.method === 'paypal'
                                ? 'Thanh toán PayPal'
                                : 'Thanh toán khi nhận hàng'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="order-details-id" style={{}}>
                <p className="df ai order-detaild-sb">
                    <span className="fw500 fz16">Mã đơn hàng</span>
                    {/* <span>{order.orderList?._id}</span> */}
                    <span>{orderDetails?._id}</span>
                </p>
                <p className="df ai order-detaild-sb">
                    <span className="fz15">Thời gian đặt hàng</span>
                    {/* <span>{changDate(order.orderList?.createdAt)}</span> */}
                    <span>{changDate(orderDetails?.createdAt)}</span>
                </p>
            </div>
        </div>
    );
};

export default OrderDetails;
