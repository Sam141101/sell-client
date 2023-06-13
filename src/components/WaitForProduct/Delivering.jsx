import React, { useEffect } from 'react';
import './waitForProduct.css';
import '../../pages/About/about.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOrderDelivery } from '../../redux/orderRedux';

const Delivering = ({
    user,
    axiosJWT,
    navigate,
    BASE_URL_API,
    formatMoney,
    amountdelivery,
    dispatch,
}) => {
    let product = useSelector((state) => state.order?.delivery);
    const handleClick = async (e) => {
        try {
            const res = await axiosJWT.put(
                BASE_URL_API + 'orders/order-complete/' + user._id,
                { orderId: e },
                {
                    headers: { token: `Bearer ${user.token}` },
                },
            );
            console.log(res.data);
            navigate('/complete');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axiosJWT.get(
                    // BASE_URL_API + 'orders/find/delivering/' + user._id,
                    BASE_URL_API + `orders/find/wait-for-order/${user._id}/delivery`,
                    {
                        headers: { token: `Bearer ${user.token}` },
                    },
                );
                dispatch(getOrderDelivery(res.data));
            } catch (err) {}
        };
        getProduct();
    }, [user._id, user.token]);

    return (
        <>
            {amountdelivery !== 0 ? (
                <div className="wait-purchase-container">
                    {product?.map((item1) => (
                        <div className="wait-for-product-list" key={item1._id}>
                            {item1?.products.map((item, index) => (
                                <div className="wait-purchase-product-order" key={index}>
                                    <Link
                                        to={`/delivering/${item1._id}`}
                                        className="wait-purchase-details-product df ai"
                                    >
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
                                    </Link>
                                </div>
                            ))}

                            <div className="wait-purchase-block df ai fz16">
                                <div className="wait-purchase-total-price fw500">
                                    <span>Tổng số tiền:</span>
                                    <span className="wait-purchase-total-price-text">
                                        {formatMoney(item1.amount + item1.transportFee)}₫
                                    </span>
                                </div>
                            </div>
                            <div className="wait-purchase-cancel-order df">
                                <button
                                    className="wait-purchase-cancel-order-button cs fw500 out"
                                    onClick={() => handleClick(item1._id.toString())}
                                >
                                    Đã nhận được hàng
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

export default Delivering;
