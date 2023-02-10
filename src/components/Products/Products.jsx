import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { popularProducts } from '../../data';
import Product from '../Product/Product';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './products.css';

// const Wrapper = styled.div``;

// const Container = styled.div`
//     padding: 20px;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
// `;

const Products = ({ cat, filters, sort, filterPage, setPagination, pagination }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    cat
                        ? `http://localhost:5000/api/products?category=${cat}&page=${filterPage}`
                        : // : 'http://localhost:5000/api/products/',
                          `http://localhost:5000/api/products/pagination?page=${filterPage}`,
                    //   `https://api-sell-vercel-lkxxh5xqq-sam141101.vercel.app/api/products/pagination?page=${filterPage}`,
                );
                const { resultProducts, pagi } = res.data;
                setProducts(resultProducts);
                setPagination(pagi);
                // pagination = res.data.pagi;
            } catch (err) {}
        };

        getProducts();
    }, [cat, filterPage]);

    useEffect(() => {
        cat &&
            setFilteredProducts(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value),
                    ),
                ),
            );
    }, [products, cat, filters]);

    useEffect(() => {
        if (sort === 'newest') {
            setFilteredProducts((prev) =>
                // [...prev].sort((a, b) => b.createdAt - a.createdAt),
                [...prev].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
            );
        } else if (sort === 'asc') {
            setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
        } else {
            setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
        }
    }, [sort]);

    return (
        // <div className="products-container">
        //     {cat
        //         ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        //         : products
        //               //   .slice(0, 8)
        //               .map((item) => <Product item={item} key={item._id} />)}

        // </div>
        <div className="grid wide">
            <div className="row">
                {cat
                    ? filteredProducts.map((item) => (
                          <div className="col l-3">
                              <Product item={item} key={item._id} />
                          </div>
                      ))
                    : products.map((item) => (
                          <div className="col l-3">
                              <Product item={item} key={item._id} />
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Products;
