import { Link } from 'react-router-dom';
import './product.css';
// import img from '../../assets/download.png';
// import { importImagesUrls } from '../utils/images';

import { LazyLoadImage } from 'react-lazy-load-image-component';

const Product = ({ item }) => {
    // console.log('vô product');

    return (
        <div className="product-container">
            <Link style={{ textDecoration: 'none' }} to={`/product/${item._id}`}>
                {/* <img className="product-image-des" alt=""  src={item.img} /> */}

                <LazyLoadImage
                    className="product-image-des"
                    src={item.img}
                    loading="lazy"
                    alt=""
                    height="250"
                    width="250"
                    effect="blur"
                    // placeholderSrc={item.img}
                />
            </Link>

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
