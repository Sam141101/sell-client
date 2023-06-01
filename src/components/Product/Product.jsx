import { Link } from 'react-router-dom';
import './product.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Product = ({ item }) => {
    console.log(item);
    return (
        <div className="product-container">
            <Link
                style={{ textDecoration: 'none' }}
                to={`/product/${item._id}`}
                className="product-frame-img"
            >
                {item.discountProduct_id?.discount_amount &&
                    item.discountProduct_id.discount_amount !== 0 && (
                        <span className="product-discount">
                            -{item.discountProduct_id.discount_amount}%
                        </span>
                    )}
                <div className="frame-block-product">
                    <LazyLoadImage
                        // className="lazy-loading-width-height-mobile lazy-loading-width-height-pc"
                        className="product-image-des"
                        src={item.img}
                        loading="lazy"
                        alt=""
                        height="250"
                        width="250"
                        effect="blur"
                    />
                </div>
                {item.sizes?.every((size) => size.inStock === 0) && (
                    <span className="product-out-of-stock">Hết hàng</span>
                )}
            </Link>

            <div className="product-des-block">
                <Link
                    style={{ color: 'black', textDecoration: 'none' }}
                    to={`/product/${item._id}`}
                >
                    <div className="product-title-text">{item.title}</div>
                </Link>
                <p className="product-price-text">
                    <span>
                        {item.discountProduct_id?.discount_amount
                            ? item.price *
                              (1 - item.discountProduct_id.discount_amount / 100)
                            : item.price}
                        ₫
                    </span>

                    {item.discountProduct_id?.discount_amount &&
                        item.discountProduct_id.discount_amount !== 0 && (
                            <span className="pro-price-del">
                                <del>{item.price}₫</del>
                            </span>
                        )}
                </p>
            </div>
        </div>
    );
};
export default Product;
