import styled from 'styled-components';
import NavBar from '../../components/NavBar/NavBar';
import Comment from '../../components/Comment/Comment';
import Announcement from '../../components/Announcement/Announcement';
import Footer from '../../components/Footer/Footer';
import { Add, Remove } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../redux/apiCalls';

import Similar from '../../components/Similar/Similar';
import axios from 'axios';
import './product.css';
import { BASE_URL_API } from '../../requestMethods';
import { createAxiosInstance } from '../../useAxiosJWT';

const FilterColor = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
    border: 1px solid #ccc;
`;

const data = [
    {
        id: 1,
        img: 'https://product.hstatic.net/200000312481/product/2c767f33-606c-4224-b341-ec54e5481b67_b6b84db6b775424a9a163f2750ee85b8_master.jpeg',
    },

    {
        id: 2,
        img: 'https://product.hstatic.net/200000312481/product/c1195926-7bef-45e6-9091-26383c3f1cc1_454d1744b6b54ea2b30a72fea76c493d_master.jpeg',
    },

    {
        id: 3,
        img: 'https://product.hstatic.net/200000312481/product/ada835a0-31cb-47dd-b660-4d50fe656027_c53e59ba532f4faba854de4f9a3fd8c7_master.jpeg',
    },

    {
        id: 4,
        img: 'https://product.hstatic.net/200000312481/product/f9b9cf4e-8e64-4e2e-a4e7-ea97ace48e26_ae21f426513b42f88f516861f020b73c_master.jpeg',
    },
];

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({});
    const [outOfStock, setOutOfStock] = useState(false);
    // const [cat, setCat] = useState('');
    const [quantity, setQuantity] = useState(1);
    // const [color, setColor] = useState('');
    const [size, setSize] = useState('M');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth?.currentUser);

    const [showImg, setShowImg] = useState(data[0].img);
    const [showBorder, setShowBorder] = useState(data[0].img);
    // -------------------

    const axiosJWT = createAxiosInstance(user, dispatch);

    const handleQuantity = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleSize = (s) => {
        // console.log(s)
        setSize(s);
    };

    const handleClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            const cartProducts = { ...product, quantity, size };

            const addProductCarts = {
                userId: user._id,
                product_id: id,
                quantity_sp: quantity,
                size_sp: size,
            };
            // console.log('>>>>', checkSize);
            addCart(user.token, dispatch, addProductCarts, cartProducts, axiosJWT);
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
            <NavBar />
            <Announcement item1={product?.categories} item2={product?.title} />

            <div className="product-wrapper">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-7 c-12">
                            <div className="product-img-container-block">
                                <img
                                    className="product-image"
                                    alt=""
                                    src={product?.img}
                                />
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
                                                    onClick={() => handleSize(s.size)}
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

            <Comment />

            {product?.categories && <Similar cat={product?.categories} />}

            <Footer />
        </div>
    );
};

export default Product;
