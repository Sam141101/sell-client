import { Link } from 'react-router-dom';

const TestGoogleApi = ({ item }) => {
    return (
        <div className="product-container">
            <Link style={{ textDecoration: 'none' }} to={`/product/${item._id}`}>
                <img className="product-image-des" alt="" src={item.img} />
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
export default TestGoogleApi;
