import styled from 'styled-components';
import { Link } from 'react-router-dom';

import './announcement.css';
const Container = styled.div`
    height: 40px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
`;

const Announcement = ({ item1 = 'Danh mục', item2 = 'Tất cả sản phẩm' }) => {
    return (
        <Container>
            <div className="grid wide">
                <div className="row">
                    <div className="col l-12">
                        <div className="title-navba">
                            <div className="title-home-page">
                                <Link
                                    to="/"
                                    style={{ textDecoration: 'none', color: 'black' }}
                                >
                                    Trang chủ
                                </Link>
                            </div>
                            {/* <div className="title-item">TEE</div>
                            <div className="title-item none">
                                ICE SIGNATURE TEE / BLACK COLOR
                            </div> */}

                            <div className="title-item">{item1}</div>
                            <div className="title-item none">{item2}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Announcement;
