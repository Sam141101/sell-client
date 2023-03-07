import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { popularProducts } from '../../data';
import Product from '../Product/Product';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './products.css';
import TestList from '../../pages/TestList/TestList';

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

    // console.log(filteredProducts);

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
    }, [cat, filterPage, setPagination]);

    useEffect(() => {
        cat &&
            setFilteredProducts(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value),
                    ),
                ),
            );
        // console.log('đã vô đây2');
    }, [products, cat, filters, sort]);

    useEffect(() => {
        // setFilteredProducts(products);
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
        // console.log('đã vô đây3');
    }, [sort]);

    return (
        <>
            {cat
                ? filteredProducts.map((item) => (
                      <div className="col l-3 c-12" key={item._id}>
                          <Product item={item} />
                      </div>
                  ))
                : products.map((item) => (
                      <div className="col l-3 c-12" key={item._id}>
                          <Product item={item} />
                      </div>
                  ))}
        </>
    );
};

export default Products;

{
    /* {cat
                    ? filteredProducts.map((item) => (
                          <div className="col l-3" key={item._id}>
                              <Product item={item} />
                          </div>
                      ))
                    : products.map((item) => (
                          <div className="col l-3" key={item._id}>
                              <Product item={item} />
                          </div>
                      ))} */
}

{
    /* {cat
                    ? filteredProducts.map((item) => (
                          <div className="col l-3" key={item._id}>
                              <Product item={item} />
                          </div>
                      ))
                    : products.map((item) => (
                          <div className="col l-3" key={item._id}>
                              <Product item={item} />
                          </div>
                      ))} */
}
