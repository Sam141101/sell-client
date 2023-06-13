import React, { useEffect } from 'react';
import './waitForProduct.css';
import '../../pages/About/about.css';
import { Link } from 'react-router-dom';
import { getOrderAccept } from '../../redux/orderRedux';
import { useSelector } from 'react-redux';

const WaitForTheGoods = ({
    user,
    axiosJWT,
    navigate,
    dispatch,
    BASE_URL_API,
    formatMoney,
    amountaccept,
}) => {
    let product = useSelector((state) => state.order?.accept);
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
                dispatch(getOrderAccept(res.data));
            } catch (err) {}
        };
        getProduct();
    }, [user._id, user.token]);

    return (
        <>
            {amountaccept ? (
                <div className="wait-purchase-container">
                    {product?.map((item1) => (
                        <div className="wait-for-product-list" key={item1._id}>
                            {item1?.products.map((item, index) => (
                                <div className="wait-purchase-product-order" key={index}>
                                    <Link
                                        to={`/waiting-for-the-goods/${item1._id}`}
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
