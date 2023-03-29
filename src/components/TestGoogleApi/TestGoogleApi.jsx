import {
    FavoriteBorder,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './testGoogleApi.css';

const TestGoogleApi = ({ item }) => {
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
export default TestGoogleApi;
