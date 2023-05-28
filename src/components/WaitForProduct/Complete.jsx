import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BASE_URL_API } from '../../requestMethods';
import './waitForProduct.css';
import '../../pages/About/about.css';
// import { createAxiosInstance } from '../../useAxiosJWT';

const Complete = ({ user, axiosJWT, dispatch, navigate }) => {
    // const user = useSelector((state) => state.auth?.currentUser);
    const [product, setProduct] = useState([]);
    const [show, setShow] = useState(false);

    // const dispatch = useDispatch();

    // const axiosJWT = createAxiosInstance(user, dispatch);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axiosJWT.get(
                    // BASE_URL_API + 'orders/find/complete/' + user._id,
                    BASE_URL_API + `orders/find/wait-for-order/${user._id}/complete`,
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

                                    <div className="wait-purchase-evaluate-order">
                                        <Link
                                            className="wait-purchase-evaluate"
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

                            <div className="wait-purchase-block">
                                <div className="wait-purchase-status">
                                    <span>Trạng thái:</span>
                                    Hoàn thành
                                </div>

                                <div className="wait-purchase-total-price">
                                    Tổng số tiền:
                                    <span className="wait-purchase-total-price-text">
                                        {item.amount + item.transportFee}₫
                                    </span>
                                </div>
                            </div>
                            {/* <div className="wait-purchase-cancel-order">
                                <Link
                                    className="wait-purchase-cancel-order-button"
                                    to="/evaluate"
                                >
                                    Đánh giá
                                </Link>
                            </div> */}
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

// const Complete = ({ selected }) => {
//     return (
//         <>
//             {show ? (
//                 <div className="wait-purchase-container">
//                     {product?.map((item) => (
//                         <div className="wait-for-product-list" key={item._id}>
//                             {item?.products.map((item, index) => (
//                                 <div className="wait-purchase-product-order" key={index}>
//                                     <div className="wait-purchase-details-product">
//                                         <img
//                                             className="wait-purchase-img"
//                                             alt=""
//                                             src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
//                                         />
//                                         <div className="wait-purchase-info">
//                                             <div className="wait-purchase-name-size">
//                                                 <div>sssssss</div>
//                                                 <div>S</div>
//                                             </div>
//                                             <div className="wait-purchase-price-quanti">
//                                                 <div>x{item.quantity}</div>
//                                                 <div>1555555₫</div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="wait-purchase-evaluate-order">
//                                         <Link
//                                             className="wait-purchase-evaluate"
//                                             to="/evalate/"
//                                             // to={`/evaluate/${item.product_id._id}`}
//                                         >
//                                             {item.checkEvaluate ? 'Mua lại' : 'Đánh giá'}
//                                         </Link>
//                                     </div>
//                                 </div>
//                             ))}

//                             <div className="wait-purchase-block">
//                                 <div className="wait-purchase-status">
//                                     <span>Trạng thái:</span>
//                                     Hoàn thành
//                                 </div>

//                                 <div className="wait-purchase-total-price">
//                                     Tổng số tiền:
//                                     <span className="wait-purchase-total-price-text">
//                                         {item.amount}₫
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="wait-for-frame-block">
//                     <img
//                         src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
//                         alt="imag"
//                         className="wait-for-product"
//                     />
//                 </div>
//             )}
//         </>
//     );
// };

export default Complete;
