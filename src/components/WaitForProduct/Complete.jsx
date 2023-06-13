import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './waitForProduct.css';
import '../../pages/About/about.css';
import { getOrderComplete } from '../../redux/orderRedux';
import { useSelector } from 'react-redux';

const Complete = ({
    user,
    axiosJWT,
    dispatch,
    BASE_URL_API,
    formatMoney,
    amountcomplete,
}) => {
    let product = useSelector((state) => state.order?.complete);
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axiosJWT.get(
                    BASE_URL_API + `orders/find/wait-for-order/${user._id}/complete`,
                    {
                        headers: { token: `Bearer ${user.token}` },
                    },
                );
                dispatch(getOrderComplete(res.data));
            } catch (err) {}
        };
        getProduct();
    }, [user._id, user.token, axiosJWT, BASE_URL_API]);

    return (
        <>
            {amountcomplete ? (
                <div className="wait-purchase-container">
                    {product?.map((item) => (
                        <div className="wait-for-product-list" key={item._id}>
                            {item?.products.map((item1, index) => (
                                <div className="wait-purchase-product-order" key={index}>
                                    <Link
                                        to={`/complete/${item._id}`}
                                        className="wait-purchase-details-product df ai"
                                    >
                                        <img
                                            className="wait-purchase-img"
                                            alt=""
                                            src={item1.product_id.img}
                                        />
                                        <div className="wait-purchase-info">
                                            <div className="wait-purchase-name-size df flex-direction">
                                                <div>{item1.product_id.title}</div>
                                                <div>{item1.size}</div>
                                            </div>
                                            <div className="wait-purchase-price-quanti df flex-direction">
                                                <div style={{ textAlign: 'right' }}>
                                                    x{item1.quantity}
                                                </div>
                                                <div>
                                                    {item1.discount !== 0 && (
                                                        <del>
                                                            {formatMoney(
                                                                item1.product_id.price,
                                                            )}
                                                            ₫
                                                        </del>
                                                    )}
                                                    <span className="disocunt-product">
                                                        {formatMoney(
                                                            item1.discount
                                                                ? item1.product_id.price *
                                                                      (1 -
                                                                          item1.discount /
                                                                              100)
                                                                : item1.product_id.price,
                                                        )}
                                                        ₫
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="wait-purchase-evaluate-order df">
                                        <Link
                                            className="wait-purchase-evaluate cs fw500 out"
                                            // to="/evalate/"
                                            to={
                                                item1.checkEvaluate
                                                    ? `/product/${item1.product_id._id}`
                                                    : `/danh-gia-san-pham/${item1.product_id._id}/${item._id}`
                                            }
                                        >
                                            {item1.checkEvaluate ? 'Mua lại' : 'Đánh giá'}
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            <div className="wait-purchase-block df ai fz16">
                                <div className="wait-purchase-total-price fw500">
                                    <span>Tổng số tiền:</span>
                                    <span className="wait-purchase-total-price-text">
                                        {formatMoney(item.amount + item.transportFee)}₫
                                    </span>
                                </div>
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

export default Complete;
