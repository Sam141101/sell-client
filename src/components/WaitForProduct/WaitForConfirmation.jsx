import React, { useState, useEffect } from 'react';
import './waitForProduct.css';
import '../../pages/About/about.css';

const WaitForConfirmation = ({ user, axiosJWT, navigate, changDate, BASE_URL_API }) => {
    const [product, setProduct] = useState([]);
    const [show, setShow] = useState(false);

    const handleClick = async (e) => {
        try {
            const res = await axiosJWT.put(
                BASE_URL_API + 'orders/order-cancel/' + user._id,
                { orderId: e },
                {
                    headers: { token: `Bearer ${user.token}` },
                },
            );
            console.log(res.data);
            navigate('/canceled');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axiosJWT.get(
                    BASE_URL_API + `orders/find/wait-for-order/${user._id}/pending`,
                    {
                        headers: { token: `Bearer ${user.token}` },
                    },
                );

                if (res.data.length > 0) {
                    setShow(true);
                }
                setProduct(res.data);
            } catch (err) {}
        };
        getProduct();
    }, [user._id, user.token]);

    console.log('product', product);

    return (
        <>
            {show ? (
                <div className="wait-purchase-container">
                    {product?.map((item) => (
                        <div className="wait-for-product-list" key={item._id}>
                            {item?.products.map((item1, index) => (
                                <div className="wait-purchase-product-order" key={index}>
                                    <div className="wait-purchase-details-product">
                                        <img
                                            className="wait-purchase-img"
                                            alt=""
                                            src={item1.product_id.img}
                                        />
                                        <div className="wait-purchase-info">
                                            <div className="wait-purchase-name-size">
                                                <div>{item1.product_id.title}</div>
                                                <div>{item1.size}</div>
                                            </div>
                                            <div className="wait-purchase-price-quanti">
                                                <div style={{ textAlign: 'right' }}>
                                                    x{item1.quantity}
                                                </div>
                                                <div>
                                                    {item1.discount !== 0 && (
                                                        <del>
                                                            {item1.product_id.price}₫
                                                        </del>
                                                    )}
                                                    <span className="disocunt-product">
                                                        {item1.discount
                                                            ? item1.product_id.price *
                                                              (1 - item1.discount / 100)
                                                            : item1.product_id.price}
                                                        ₫
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="wait-purchase-block">
                                <div className="wait-purchase-status">
                                    <>
                                        <span>Trạng thái:</span>
                                        Chờ xác nhận
                                    </>
                                    <div>
                                        <span>Thời gian đặt hàng:</span>
                                        {changDate(item.createdAt)}
                                        {/* {item.createdAt} */}
                                    </div>
                                </div>

                                <div className="wait-purchase-total-price">
                                    Tổng số tiền:
                                    <span className="wait-purchase-total-price-text">
                                        {item.amount + item.transportFee}₫
                                    </span>
                                </div>
                            </div>
                            <div className="wait-purchase-cancel-order">
                                <button
                                    className="wait-purchase-cancel-order-button"
                                    onClick={() => handleClick(item._id.toString())}
                                >
                                    Huỷ đơn
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="wait-for-frame-block">
                    <img
                        src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
                        alt="imag"
                        className="wait-for-product"
                    />
                </div>
            )}
        </>
    );
};

export default WaitForConfirmation;
