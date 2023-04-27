import { useEffect, useState } from 'react';
import Product from '../Product/Product';
import axios from 'axios';
import './products.css';
import { BASE_URL_API } from '../../requestMethods';

const Products = ({ cat, filters, sort, filterPage, setPagination, pagination }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    let limit = pagination.limit;
    // const user = useSelector((state) => state.auth?.currentUser);
    // const axiosJWT = createAxiosInstance(user, dispatch);

    useEffect(() => {
        const getProducts = async () => {
            try {
                // const res = await axios.get(
                //     cat
                //         ? BASE_URL_API +
                //               `products?category=${cat}&page=${filterPage}&limit=${limit}&sort=${sort}`
                //         : BASE_URL_API +
                //               `products/pagination?page=${filterPage}&limit=${limit}&sort=${sort}`,
                // );

                const res = await axios.get(
                    BASE_URL_API +
                        `products/?category=${cat}&page=${filterPage}&limit=${limit}&sort=${sort}`,
                );

                const { resultProducts, pagi } = res.data;
                setProducts(resultProducts);

                if (setPagination) {
                    setPagination(pagi);
                } else {
                    return;
                }

                console.log(res.data);
                // pagination = res.data.pagi;
            } catch (err) {
                console.log(err);
            }
            console.log('useEffect1');
        };

        getProducts();
    }, [cat, filterPage, setPagination, limit, sort]);

    console.log('products', products);

    return (
        <>
            {/* {cat
                ? filteredProducts.map((item) => (
                      <div className="col l-3 c-12" key={item._id}>
                          <Product item={item} />
                      </div>
                  ))
                : products.map((item) => (
                      <div className="col l-3 c-12" key={item._id}>
                          <Product item={item} />
                      </div>
                  ))} */}

            {products.map((item) => (
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
