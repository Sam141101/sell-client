import styled from 'styled-components';
import NavBar from '../components/NavBar/NavBar';
import Announcement from '../components/Announcement/Announcement';
import Products from '../components/Products/Products';
import Newsletter from '../components/Newsletter/Newsletter';
import Footer from '../components/Footer/Footer';
import { mobile } from '../responsive';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination/Pagination';
import axios from 'axios';
import TestList from './TestList/TestList';

const Container = styled.div`
    overflow: hidden;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div``;

const FilterText = styled.span`
    font-size: 20px;
    margin-right: 20px;
    font-weight: 600;
`;

const Select = styled.select`
    padding: 10px;
`;

const Option = styled.option``;

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split('/')[2];
    const [filters, setFilters] = useState({});
    // const [sort, setSort] = useState('newest');
    const [sort, setSort] = useState('');

    // const navigate = useNavigate()

    // const [changeCat, setChangeCat] = useState('')

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    // const handleCat = (e) => {
    //     setFilters(e.target.value);
    //     navigate(`/products/${e.target.value}`)
    // };

    // console.log(filters);
    console.log(sort);
    // ----------- Pagination --------
    // const [filterPage, setFilterPage] = useState({
    //     // limit: 10,
    //     page: 1,
    // });

    const [filterPage, setFilterPage] = useState(1);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        totalRows: 20,
    });

    const handlePageChange = (newPage) => {
        // setFilterPage({
        //     page: newPage,
        // });
        setFilterPage(newPage);
    };

    // ----------------

    return (
        <Container>
            <NavBar />
            <Announcement item1="Danh m???c" item2={cat} />

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
                                        {/* <Title>T???t c??? s???n ph???m</Title> */}
                                        <Title>{cat ? cat : 'T???t c??? s???n ph???m'}</Title>
                                        <div className="list-product-mobile-filter-container">
                                            {/* <FilterContainer> */}
                                            <Filter>
                                                <FilterText>S???p x???p s???n ph???m:</FilterText>
                                                <Select
                                                    onChange={(e) =>
                                                        setSort(e.target.value)
                                                    }
                                                >
                                                    <Option value="newest">
                                                        m???i nh???t
                                                    </Option>
                                                    <Option value="asc">
                                                        Gi?? t??ng d???n
                                                    </Option>
                                                    <Option value="desc">
                                                        Gi?? gi???m d???n
                                                    </Option>
                                                </Select>
                                            </Filter>
                                            {/* </FilterContainer> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <Products
                                    cat={cat}
                                    filters={filters}
                                    sort={sort}
                                    filterPage={filterPage}
                                    setPagination={setPagination}
                                    pagination={pagination}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Products
                cat={cat}
                filters={filters}
                sort={sort}
                filterPage={filterPage}
                setPagination={setPagination}
                pagination={pagination}
            /> */}

            <Pagination pagination={pagination} onPageChange={handlePageChange} />

            <Newsletter />
            <Footer />
        </Container>
    );
};

export default ProductList;
