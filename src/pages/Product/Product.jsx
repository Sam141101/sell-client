import styled from 'styled-components';
import Announcement from '../../components/Announcement/Announcement';
import { Add, Remove } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { addCart } from '../../redux/apiCalls';

import './product.css';
import React from 'react';
import { Suspense } from 'react';

const Comment = React.lazy(() => import('../../components/Comment/Comment'));
const Similar = React.lazy(() => import('../../components/Similar/Similar'));

const FilterColor = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
    border: 1px solid #ccc;
`;

const Product = ({
    axios,
    BASE_URL_API,
    dispatch,
    navigate,
    user,
    axiosJWT,
    setToast,
}) => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({});
    const [outOfStock, setOutOfStock] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [amountInStock, setAmountInStock] = useState(0);
    const [size, setSize] = useState('');

    const handleQuantity = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleSize = (s, amount) => {
        console.log('s', s);
        setSize(s);
        setAmountInStock(amount);
    };

    const handleClick = async () => {
        if (!user) {
            navigate('/login');
        } else {
            let errorMessage = '';
            if (!size) {
                errorMessage = 'Vui lòng chọn Size.';
            }

            if (errorMessage) {
                setToast({
                    show: true,
                    title: errorMessage,
                    type: 'info',
                    duration: 1200,
                });
                return;
            }

            const cartProducts = { ...product, quantity, size };

            const addProductCarts = {
                userId: user._id,
                product_id: id,
                quantity_sp: quantity,
                size_sp: size,
                discount: product.discountProduct_id.discount_amount,
            };
            // console.log('>>>>', checkSize);
            const result = await addCart(
                user.token,
                dispatch,
                addProductCarts,
                cartProducts,
                axiosJWT,
            );
            if (result === 'addcart-success') {
                errorMessage = 'Thêm sản phẩm thành công.';
            } else {
                errorMessage = 'Thêm sản phẩm thất bại.';
            }

            if (errorMessage) {
                // setTimeout(() => {
                //     alert(errorMessage);
                // }, 800); // Sau 1 giây mới hiển thị thông báo
                setToast({
                    show: true,
                    title: errorMessage,
                    type: 'success',
                    duration: 1200,
                });
                return;
            }
        }
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(BASE_URL_API + 'products/find/' + id);
                setProduct(res.data);
                if (res.data.sizes.every((size) => size.inStock === 0)) {
                    setOutOfStock(true);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, [id]);

    return (
        <div className="product-page-frame">
            <Announcement item1={product?.categories} item2={product?.title} />

            <div className="product-wrapper">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-7 c-12">
                            <div className="product-img-container-block">
                                {/* <img
                                    className="product-image"
                                    alt=""
                                    src={product?.img}
                                /> */}

                                <picture>
                                    <source
                                        srcSet={product?.grandeImg}
                                        media="(max-width: 480px)"
                                    />
                                    <source
                                        srcSet={product?.img}
                                        media="(min-width: 481px)"
                                    />
                                    <img
                                        className="product-image-des-pc"
                                        srcSet={product?.img}
                                        alt=""
                                    />
                                </picture>
                            </div>
                        </div>

                        <div className="col l-5 c-12">
                            <div className="product-info-container">
                                <h1 className="product-title">{product?.title}</h1>
                                <div className="product-price">
                                    {product.discountProduct_id?.discount_amount &&
                                        product.discountProduct_id?.discount_amount !==
                                            0 && (
                                            <span className="block-product-discount">
                                                -
                                                {
                                                    product.discountProduct_id
                                                        ?.discount_amount
                                                }
                                                %
                                            </span>
                                        )}

                                    <span className="pro-price">
                                        {product.discountProduct_id?.discount_amount
                                            ? product.price *
                                              (1 -
                                                  product.discountProduct_id
                                                      ?.discount_amount /
                                                      100)
                                            : product.price}
                                        ₫
                                    </span>
                                    {product.discountProduct_id?.discount_amount &&
                                        product.discountProduct_id?.discount_amount !==
                                            0 && <del>{product.price}₫</del>}
                                </div>

                                <div className="product-filter">
                                    {product?.color?.map((c) => (
                                        <FilterColor color={c} key={c} />
                                    ))}
                                </div>

                                <div
                                    className="product-filter"
                                    style={{
                                        display: `${
                                            outOfStock === true ? 'none' : 'flex'
                                        }`,
                                    }}
                                >
                                    {product.sizes?.map((s) => (
                                        <div className="product-select-swap" key={s._id}>
                                            <div className="roduct-select-swap">
                                                <div
                                                    className={`product-swatch-block ${
                                                        s.inStock === 0
                                                            ? 'block-close'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        handleSize(s.size, s.inStock)
                                                    }
                                                    style={
                                                        size === s.size
                                                            ? {
                                                                  color: '#fff',
                                                                  background: '#000',
                                                                  border: '1px solid #000',
                                                              }
                                                            : {}
                                                    }
                                                >
                                                    <span>{s.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {amountInStock !== 0 && (
                                        <div className="amount-sizes">
                                            {amountInStock} có sẵn
                                        </div>
                                    )}
                                </div>

                                <div className="product-amount-container">
                                    <div className="product-remove-input">
                                        <Remove onClick={() => handleQuantity('dec')} />
                                    </div>

                                    <span className="product-amount">{quantity}</span>
                                    <div className="product-add-input">
                                        <Add onClick={() => handleQuantity('inc')} />
                                    </div>
                                </div>

                                <div className="product-add-container">
                                    {outOfStock === true ? (
                                        <button className="product-button disabled">
                                            Hết hàng
                                        </button>
                                    ) : (
                                        <button
                                            className="product-button"
                                            onClick={handleClick}
                                        >
                                            Thêm vào giỏ
                                        </button>
                                    )}
                                </div>

                                <span className="product-des-note3">Mô tả</span>

                                <div className="product-des-note">
                                    🔹 Bảng size Outerity
                                    <br />S : Dài 69 Rộng 52.5 | 1m50 - 1m65, 45 -55Kg,
                                    <br /> M : Dài 73 Rộng 55 | 1m60 - 1m75, 50 - 65Kg
                                    <br /> L: Dài : 76.5 Rộng: 57.5 | 1m7 - 1m8, 65Kg -
                                    80Kg
                                    <br /> 👉 Nếu chưa biết lựa size bạn có thể inbox để
                                    được chúng mình tư vấn.
                                </div>

                                <div className="product-des-note2">
                                    🔹 Chính sách đổi trả Outerity.
                                    <br />– Miễn phí đổi hàng cho khách mua ở Outerity
                                    trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm
                                    hàng, nhầm size.
                                    <br />- Quay video mở sản phẩm khi nhận hàng, nếu
                                    không có video unbox, khi phát hiện lỗi phải báo ngay
                                    cho Outerity trong 1 ngày tính từ ngày giao hàng thành
                                    công. Qua 1 ngày chúng mình không giải quyết khi không
                                    có video unbox.
                                    <br />– Sản phẩm đổi trong thời gian 3 ngày kể từ ngày
                                    nhận hàng
                                    <br />– Sản phẩm còn mới nguyên tem, tags, sản phẩm
                                    chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân
                                    bên ngoài cửa hàng sau khi mua hàng.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Suspense fallback={<p>Loading...</p>}>
                <Comment BASE_URL_API={BASE_URL_API} axios={axios} />

                {product?.categories && (
                    <Similar
                        cat={product?.categories}
                        BASE_URL_API={BASE_URL_API}
                        axios={axios}
                        color={product?.color}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default Product;
