import { Link } from 'react-router-dom';
import './product.css';
import img from '../../assets/download.png';

const Product = ({ item }) => {
    // console.log('vô product');

    return (
        <div className="product-container">
            <Link style={{ textDecoration: 'none' }} to={`/product/${item._id}`}>
                {/* <img className="product-image-des" alt="" lazy-src={item.img} src={img} /> */}
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
