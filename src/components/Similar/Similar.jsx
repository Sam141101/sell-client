import React, { useState, useEffect, useRef } from 'react';
import Product from '../Product/Product';
import './similar.css';

const Similar = ({ cat, BASE_URL_API, axios }) => {
    const [products, setProducts] = useState([]);

    const componentRef = useRef(null);

    useEffect(() => {
        const element = componentRef.current;
        if (element != null) {
            const observer = new IntersectionObserver((entries) => {
                // Phát hiện khi phần tử hiển thị trong Viewport
                const [entry] = entries;
                if (entry.isIntersecting) {
                    // Nếu phần tử hiển thị, ta gọi API để tải dữ liệu
                    const getProducts = async () => {
                        try {
                            console.log('gọi api rồi');
                            const res = await axios.get(
                                BASE_URL_API + `products/similar/?category=${cat}`,
                            );
                            setProducts(res.data);
                        } catch (err) {}
                    };

                    getProducts();
                    // Sau khi tải xong thì ta ngừng theo dõi thay đổi của element nữa
                    observer.disconnect();
                }
            });

            observer.observe(element);

            // Trả về một function để remove phần tử khỏi Intersection Observer khi unmount component
            return () => {
                if (observer && element) {
                    observer.unobserve(element);
                    observer.disconnect();
                }
            };
        }
    }, [axios, BASE_URL_API, cat]);

    return (
        <div ref={componentRef}>
            <div className="similar-title-relate fw500">SẢN PHẨM LIÊN QUAN</div>
            <div className="grid wide simlirrr">
                <div className="row pd-mobile">
                    {products.map((item, index) => {
                        return (
                            <div
                                className={`col l-3 c-6 c${index % 2 === 0 ? '2' : '1'}`}
                                key={item._id}
                            >
                                <Product item={item} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Similar;
