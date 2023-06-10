import { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Products = ({
    cat,
    sort,
    filterPage,
    setPagination,
    pagination,
    axios,
    BASE_URL_API,
    formatMoney,
}) => {
    const [products, setProducts] = useState([]);

    let limit = pagination.limit;

    useEffect(() => {
        const getProducts = async () => {
            try {
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
            {products.map((item, index) => (
                <div
                    className={`col l-3 c-6 c${index % 2 === 0 ? '2' : '1'}`}
                    key={item._id}
                >
                    <Product formatMoney={formatMoney} item={item} />
                </div>
            ))}
        </>
    );
};

export default Products;
