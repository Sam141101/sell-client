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

const Announcement = ({
    item1 = 'Danh mục',
    item2 = 'Tất cả sản phẩm',
    show1 = true,
    show2 = true,
    className,
}) => {
    // console.log(typeof show1);

    return (
        <div className="announcement-container">
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

                            {show1 && <div className="line1">/</div>}
                            {show1 && <div className="title-item">{item1}</div>}
                            {show2 && <div className="line1 none">/</div>}
                            {show2 && <div className="title-item none">{item2}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
