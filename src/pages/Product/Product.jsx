import styled from 'styled-components';
import NavBar from '../../components/NavBar/NavBar';
import Comment from '../../components/Comment/Comment';
import Announcement from '../../components/Announcement/Announcement';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/Footer/Footer';
import { Add, AddShoppingCart, Remove } from '@mui/icons-material';
import { mobile } from '../../responsive';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { publicRequest } from '../requestMethods';
// import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../redux/apiCalls';
// import axios from 'axios';
// import Pagination from '../components/Pagination';
import Similar from '../../components/Similar/Similar';
import axios from 'axios';
import './product.css';
import Products from '../../components/Products/Products';

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
    const [cat, setCat] = useState('');
    const [quantity, setQuantity] = useState(1);
    // const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth?.currentUser);

    // c???nh b??o --------------------------------
    const [checkSize, setCheckSize] = useState(false);
    const [borderColor, setBorderColor] = useState('#ffffff');

    const [showImg, setShowImg] = useState(data[0].img);
    const [showBorder, setShowBorder] = useState(data[0].img);
    // -------------------

    const blurSize = (e) => {
        if (!e.target.value) {
            setCheckSize(false);
        } else {
            setCheckSize(true);
        }
    };

    const handleQuantity = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const onChangeSize = (e) => {
        setSize(e.target.value);
        setBorderColor('#ffffff');
        document.getElementById('text').innerHTML = '';
    };

    const handleSize = (s) => {
        // console.log(s)
        setSize(s);
    };

    // if (size === '') {
    //     console.log('roong');
    // }
    const handleClick = () => {
        // const cartProducts = { ...product, quantity, color, size };
        const cartProducts = { ...product, quantity, size };

        const addProductCarts = {
            userId: user._id,
            product_id: id,
            quantity_sp: quantity,
            size_sp: size,
        };
        if (checkSize) {
            addCart(user.token, dispatch, addProductCarts, cartProducts);
            // setBorderColor('#ffffff');
            // document.getElementById('text').innerHTML = '';
        } else {
            document.getElementById('text').innerHTML = 'Vui l??ng ch???n size';
            setBorderColor('red');
        }
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                // const res = await publicRequest.get('/products/find/' + id);
                const res = await axios.get(
                    'http://localhost:5000/api/products/find/' + id,
                );
                setProduct(res.data);
                // setCat(res.data.categories[0]);
                setCat(res.data.categories);
            } catch (err) {}
        };
        getProduct();
    }, [id]);

    console.log('1');

    return (
        <div className="product-page-frame">
            <NavBar />
            <Announcement item1={cat} item2={product?.title} />

            <div className="product-wrapper">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-7 c-12">
                            <div className="product-img-container-block">
                                <div
                                    className="row"
                                    style={{ marginLeft: '-8px', marginRight: '-8px' }}
                                >
                                    <div
                                        className="col l-2 c-0"
                                        style={{
                                            paddingLeft: '8px',
                                            paddingRight: '8px',
                                        }}
                                    >
                                        <div className="block-list-small-product">
                                            {data.map((item) => (
                                                // <div
                                                //     className="block-item-small-product"
                                                //     key={item.id}
                                                //     onClick={() => setShowImg(item.img)}
                                                // >
                                                <img
                                                    style={
                                                        showImg === item.img
                                                            ? {
                                                                  border: '1px solid rgb(136, 136, 136)',
                                                              }
                                                            : {
                                                                  border: '1px solid white',
                                                              }
                                                    }
                                                    key={item.id}
                                                    onClick={() => setShowImg(item.img)}
                                                    className="product-img-container active"
                                                    src={item.img}
                                                    alt=""
                                                />
                                                // </div>
                                            ))}

                                            {/* <div className="block-item-small-product">
                                                <img
                                                    className="product-img-container active"
                                                    src="https://product.hstatic.net/200000312481/product/aso3003_2_4975fdb66e8e4a26863763cb2a7d15e9_master.jpg"
                                                    alt=""
                                                />
                                            </div>

                                            <div className="block-item-small-product">
                                                <img
                                                    className="product-img-container active"
                                                    src="https://product.hstatic.net/200000312481/product/aso3003_2_4975fdb66e8e4a26863763cb2a7d15e9_master.jpg"
                                                    alt=""
                                                />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div
                                        className="col l-10 c-12"
                                        style={{
                                            paddingLeft: '8px',
                                            paddingRight: '8px',
                                        }}
                                    >
                                        <img
                                            className="product-image"
                                            alt=""
                                            src={product?.img}
                                        />

                                        {/* <img
                                            className="product-image"
                                            alt=""
                                            src={showImg}
                                        /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col l-5 c-12">
                            <div className="product-info-container">
                                <h1 className="product-title">{product?.title}</h1>
                                <span className="product-price">{product?.price}???</span>
                                <div className="product-filter">
                                    {/* <span className="product-filter-title">Color</span> */}
                                    {product?.color?.map((c) => (
                                        <FilterColor
                                            color={c}
                                            key={c}
                                            // onClick={() => setColor(c)}
                                        />
                                    ))}
                                </div>

                                <div className="product-filter">
                                    {/* <span className="product-filter-title">Size</span> */}
                                    {product.size?.map((s) => (
                                        <div className="product-select-swap" key={s}>
                                            <div className="roduct-select-swap">
                                                <div
                                                    className="product-swatch-block"
                                                    onClick={() => handleSize(s)}
                                                    style={
                                                        size === s
                                                            ? {
                                                                  color: '#fff',
                                                                  background: '#000',
                                                                  border: '1px solid #000',
                                                              }
                                                            : {
                                                                  // color: '#000',
                                                                  //   background: '#fff',
                                                                  //   border: '1px solid #000',
                                                              }
                                                    }
                                                >
                                                    <span>{s}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="product-amount-container">
                                    {/* <span className="product-filter-title">S??? l?????ng</span> */}

                                    {/* <Remove onClick={() => handleQuantity('dec')} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity('inc')} /> */}

                                    <div className="product-remove-input">
                                        <Remove onClick={() => handleQuantity('dec')} />
                                    </div>
                                    {/* <input
                                type="text"
                                // value={amount}
                                // onChange={(e) => setAmount(e.target.value)}
                                min="1"
                                // className={cx('quantity-selector')}
                            /> */}
                                    <span className="product-amount">{quantity}</span>
                                    <div className="product-add-input">
                                        <Add onClick={() => handleQuantity('inc')} />
                                    </div>
                                </div>

                                <div className="product-add-container">
                                    <button
                                        className="product-button"
                                        onClick={handleClick}
                                    >
                                        Th??m v??o gi???
                                    </button>

                                    <button
                                        className="product-button-buy"
                                        // onClick={handleClick}
                                    >
                                        Mua ngay
                                    </button>
                                </div>

                                {/* <span className="product-span" id="text"></span> */}

                                <span className="product-des-note3">M?? t???</span>

                                <div className="product-des-note">
                                    ???? B???ng size Outerity
                                    <br />S : D??i 69 R???ng 52.5 | 1m50 - 1m65, 45 -55Kg,
                                    <br /> M : D??i 73 R???ng 55 | 1m60 - 1m75, 50 - 65Kg
                                    <br /> L: D??i : 76.5 R???ng: 57.5 | 1m7 - 1m8, 65Kg -
                                    80Kg
                                    <br /> ???? N???u ch??a bi???t l???a size b???n c?? th??? inbox ?????
                                    ???????c ch??ng m??nh t?? v???n.
                                </div>

                                <div className="product-des-note2">
                                    ???? Ch??nh s??ch ?????i tr??? Outerity.
                                    <br />??? Mi???n ph?? ?????i h??ng cho kh??ch mua ??? Outerity
                                    trong tr?????ng h???p b??? l???i t??? nh?? s???n xu???t, giao nh???m
                                    h??ng, nh???m size.
                                    <br />- Quay video m??? s???n ph???m khi nh???n h??ng, n???u
                                    kh??ng c?? video unbox, khi ph??t hi???n l???i ph???i b??o ngay
                                    cho Outerity trong 1 ng??y t??nh t??? ng??y giao h??ng th??nh
                                    c??ng. Qua 1 ng??y ch??ng m??nh kh??ng gi???i quy???t khi kh??ng
                                    c?? video unbox.
                                    <br />??? S???n ph???m ?????i trong th???i gian 3 ng??y k??? t??? ng??y
                                    nh???n h??ng
                                    <br />??? S???n ph???m c??n m???i nguy??n tem, tags, s???n ph???m
                                    ch??a gi???t v?? kh??ng d?? b???n, h?? h???ng b???i nh???ng t??c nh??n
                                    b??n ngo??i c???a h??ng sau khi mua h??ng.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Comment />

            {cat && <Similar cat={cat} />}

            {/* <div className="container-product">
                <div className="grid wide">
                    <div className="row">
                        <Products filterPage={1} pagination={pagination} />
                    </div>
                </div>
            </div> */}

            <Footer />
        </div>
    );
};

export default Product;
