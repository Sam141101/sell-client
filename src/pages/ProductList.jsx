import styled from 'styled-components';
import Announcement from '../components/Announcement/Announcement';
import Products from '../components/Products/Products';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import TestList from './TestList/TestList';

const Container = styled.div`
    overflow: hidden;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
`;

const ProductList = ({ BASE_URL_API, axios, formatMoney }) => {
    const location = useLocation();
    const cat = location.pathname.split('/')[2];
    // const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('newest');

    const url = new URL(window.location.href);
    let pageIndex = url.searchParams.get('page'); // "1"

    const [filterPage, setFilterPage] = useState(pageIndex);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        totalRows: 20,
    });

    const handlePageChange = (newPage) => {
        // Update the filterPage state with the new page value
        setFilterPage(newPage);
        console.log('thay đổi cái newPage', newPage);

        // Get the current URL and append the new "page" query parameter
        const url = new URL(window.location.href);
        url.searchParams.set('page', newPage);

        // Change the URL and add a new record to the browser's history
        window.history.pushState({}, '', url);
    };

    console.log('pageIndexx', pageIndex, filterPage);

    // ----------------

    return (
        <Container>
            <Announcement item1="Danh mục" item2={cat} />

            <div className="product-list-mt">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-3 c-12">
                            <TestList />
                        </div>
                        <div className="col l-9 c-12">
                            <div className="row">
                                <div className="col l-12 c-12">
                                    <div className="list-product-mobile-all">
                                        {/* <Title>Tất cả sản phẩm</Title> */}
                                        <Title>
                                            {cat === 'all' ? 'Tất cả sản phẩm' : cat}
                                        </Title>
                                        <div className="list-product-mobile-filter-container df ai">
                                            {/* <FilterContainer> */}
                                            {/* <div cl> */}
                                            <span
                                                className="product-list-title"
                                                style={{
                                                    marginRight: '20px',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                Sắp xếp sản phẩm:
                                            </span>
                                            <select
                                                className="product-list-selected"
                                                onChange={(e) => setSort(e.target.value)}
                                            >
                                                <option value="newest">mới nhất</option>
                                                <option value="asc">Giá tăng dần</option>
                                                <option value="desc">Giá giảm dần</option>
                                            </select>
                                            {/* </div> */}
                                            {/* </FilterContainer> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pd-mobile">
                                <Products
                                    cat={cat}
                                    // filters={filters}
                                    sort={sort}
                                    filterPage={filterPage}
                                    setPagination={setPagination}
                                    pagination={pagination}
                                    BASE_URL_API={BASE_URL_API}
                                    axios={axios}
                                    formatMoney={formatMoney}
                                    pageIndex={pageIndex}
                                />
                            </div>

                            <Pagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ProductList;
