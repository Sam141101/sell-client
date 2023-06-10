import React, { useState, useEffect } from 'react';

// import { BASE_URL_API } from '../../requestMethods';
import './waitForProduct.css';
import '../../pages/About/about.css';

const WaitForTheGoods = ({
    user,
    axiosJWT,
    navigate,
    changDate,
    BASE_URL_API,
    formatMoney,
}) => {
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
                    // BASE_URL_API + 'orders/find/waiting-for-the-goods/' + user._id,
                    BASE_URL_API + `orders/find/wait-for-order/${user._id}/accept`,
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

    return (
        <>
            {show ? (
                <div className="wait-purchase-container">
                    {product?.map((item) => (
                        <div className="wait-for-product-list" key={item._id}>
                            {item?.products.map((item, index) => (
                                <div className="wait-purchase-product-order" key={index}>
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
                                                            {formatMoney(
                                                                item.product_id.price,
                                                            )}
                                                            ₫
                                                        </del>
                                                    )}
                                                    <span className="disocunt-product">
                                                        {formatMoney(
                                                            item.discount
                                                                ? item.product_id.price *
                                                                      (1 -
                                                                          item.discount /
                                                                              100)
                                                                : item.product_id.price,
                                                        )}
                                                        ₫
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="wait-purchase-block df ai fz16">
                                <div className="wait-purchase-status">
                                    <>
                                        <span>Trạng thái:</span>
                                        Chờ vận chuyển
                                    </>
                                    <div>
                                        <span>Thời gian đặt hàng:</span>
                                        {changDate(item.createdAt)}
                                    </div>
                                </div>

                                <div className="wait-purchase-total-price fw500">
                                    Tổng số tiền:
                                    <span className="wait-purchase-total-price-text">
                                        {formatMoney(item.amount + item.transportFee)}₫
                                    </span>
                                </div>
                            </div>
                            <div className="wait-purchase-cancel-order df">
                                <button
                                    className="wait-purchase-cancel-order-button cs fw500 out"
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
                        className="wait-for-product db"
                    />
                </div>
            )}
        </>
    );
};

export default WaitForTheGoods;
