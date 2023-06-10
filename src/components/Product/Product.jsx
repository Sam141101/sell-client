import { Link } from 'react-router-dom';
import './product.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { formatMoney } from '../../support';

const Product = ({ item }) => {
    // console.log(item);
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
                    <picture>
                        <source srcSet={item.setImg} media="(max-width: 480px)" />
                        <source srcSet={item.grandeImg} media="(min-width: 481px)" />
                        <LazyLoadImage
                            className="product-image-des"
                            // sizes="(max-width: 480px) 174px, (min-width: 481px) 250px"
                            srcSet={item.grandeImg}
                            alt=""
                            // height="250"
                            // width="250"
                            effect="blur"
                        />
                    </picture>
                </div>
                {item.sizes?.every((size) => size.inStock === 0) && (
                    <span className="product-out-of-stock">Hết hàng</span>
                )}
            </Link>

            <div className="product-des-block cs">
                <Link
                    style={{ color: 'black', textDecoration: 'none' }}
                    to={`/product/${item._id}`}
                >
                    <div className="product-title-text fw500">{item.title}</div>
                </Link>
                <p className="product-price-text">
                    <span>
                        {item.discountProduct_id?.discount_amount
                            ? formatMoney(
                                  item.price *
                                      (1 - item.discountProduct_id.discount_amount / 100),
                              )
                            : formatMoney(item.price)}
                        ₫
                    </span>

                    {item.discountProduct_id?.discount_amount &&
                        item.discountProduct_id.discount_amount !== 0 && (
                            <span className="pro-price-del">
                                <del>{formatMoney(item.price)}₫</del>
                            </span>
                        )}
                </p>
            </div>
        </div>
    );
};
export default Product;
