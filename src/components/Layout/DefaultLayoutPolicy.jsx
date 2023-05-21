import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Announcement from '../Announcement/Announcement';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';

function DefaultLayoutPolicy({ children, item2, show1 }) {
    const location = useLocation();
    const pathpolicy = location.pathname.split('/')[1];

    const handleClickList = () => {
        const check = document.querySelector('.about-list');
        check.classList.toggle('list-check');
    };

    useEffect(() => {
        const check = document.querySelector('.about-list');
        check.classList.remove('list-check');
    }, [pathpolicy]);

    return (
        <div className="default-layout-wrapper">
            <Navbar />
            <Announcement item2={item2} show1={show1} />

            <div className="about-wrapper">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-3 c-12">
                            <div className="about-container">
                                <div onClick={handleClickList} className="about-title">
                                    danh mục trang
                                </div>
                                <ul className="about-list">
                                    {/* <li className="about-item">
                                        <Link
                                            to="/"
                                            style={{
                                                color: 'black',
                                                textDecoration: 'none',
                                                padding: '5px 5px 5px 0',
                                            }}
                                        >
                                            Tìm kiếm
                                        </Link>
                                    </li> */}
                                    <li className="about-item">
                                        <Link
                                            to="/about"
                                            style={{
                                                color: 'black',
                                                textDecoration: 'none',
                                                padding: '5px 5px 5px 0',
                                            }}
                                        >
                                            Giới thiệu
                                        </Link>
                                    </li>
                                    <li className="about-item">
                                        <Link
                                            to="/chinh-sach-doi-tra"
                                            style={{
                                                color: 'black',
                                                textDecoration: 'none',
                                                padding: '5px 5px 5px 0',
                                            }}
                                        >
                                            Chính sách đổi trả
                                        </Link>
                                    </li>
                                    <li className="about-item">
                                        <Link
                                            to="/chinh-sach-bao-mat"
                                            style={{
                                                color: 'black',
                                                textDecoration: 'none',
                                                padding: '5px 5px 5px 0',
                                            }}
                                        >
                                            Chính sách bảo mật
                                        </Link>
                                    </li>
                                    <li className="about-item">
                                        <Link
                                            to="/dieu-khoan-dich-vu"
                                            style={{
                                                color: 'black',
                                                textDecoration: 'none',
                                                padding: '5px 5px 5px 0',
                                            }}
                                        >
                                            Điều khoản dịch vụ
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col l-9 c-12">{children}</div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default DefaultLayoutPolicy;
