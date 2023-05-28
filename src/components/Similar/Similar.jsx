import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Product from '../Product/Product';
import './similar.css';
// import { BASE_URL_API } from '../../requestMethods';

const Similar = ({ cat, BASE_URL_API, axios }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    BASE_URL_API + `products/similar/?category=${cat}`,
                );
                setProducts(res.data);
            } catch (err) {}
        };

        getProducts();
    }, [cat]);

    return (
        <>
            <div className="similar-title-relate">SẢN PHẨM LIÊN QUAN</div>
            <div className="grid wide">
                <div className="row">
                    {products?.map((item) => (
                        <div className="col l-3 c-12" key={item._id}>
                            {/* <Product item={item} key={item._id} /> */}
                            <Product item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Similar;
