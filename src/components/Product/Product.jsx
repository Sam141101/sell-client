import {
    FavoriteBorder,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './product.css';

// const Product = ({ item }) => {
//     const SoldOut = true;

//     return (
//         <div>
//             <div className={cx('wrapper')}>
//                 <div className={cx('product-img')}>
//                     {SoldOut ? (
//                         <div className={cx('sold-out')}>
//                             <span>Hết hàng</span>
//                         </div>
//                     ) : (
//                         <div className={cx('product-sale')}>
//                             {/* <span>-38%</span> */}
//                             <span>{data.sale}</span>
//                         </div>
//                     )}

//                     <Button to={data.to} className={cx('product-img-height')}>
//                         <Image src={data.img} className={cx('img-loop')} />
//                     </Button>
//                 </div>

//                 <div className={cx('product-detail')}>
//                     <div className={cx('box-pro-detail')}>
//                         <h3 className={cx('pro-name')}>
//                             <Button to={data.to} className={cx('pro-name-link')}>
//                                 {data.content}
//                             </Button>
//                         </h3>

//                         <div className={cx('box-pro-prices')}>
//                             <p className={cx('pro-price')}>
//                                 <span className={cx('highlight')}>{data.price}</span>
//                                 <span className={cx('pro-price-del')}>
//                                     <del>{data.discount}</del>
//                                 </span>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Product;

const Product = ({ item }) => {
    // console.log('vô product');

    return (
        <div className="product-container">
            <Link style={{ textDecoration: 'none' }} to={`/product/${item._id}`}>
                <img className="product-image-des" alt="" src={item.img} />
            </Link>
            {/* <div className="product-circle">
            </div> */}
            {/* <div className="product-info">
                <div className="product-icon">
                    <ShoppingCartOutlined />
                </div>

                <div className="product-icon">
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </Link>
                </div>

                <div className="product-icon">
                    <FavoriteBorder />
                </div>
            </div> */}

            <div className="product-des-block">
                <Link
                    style={{ color: 'black', textDecoration: 'none' }}
                    to={`/product/${item._id}`}
                >
                    <div className="product-title-text">{item.title}</div>
                </Link>
                <div className="product-price-text">{item.price}₫</div>
            </div>
        </div>
    );
};
export default Product;
