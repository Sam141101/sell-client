import NavBar from '../../components/NavBar/NavBar';
import Announcement from '../../components/Announcement/Announcement';
import Footer from '../../components/Footer/Footer';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    // Redirect,
    useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../redux/apiCalls';
import axios from 'axios';
import './about.css';
import Introduce from '../../components/Introduce';

const About = ({ children }) => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({});
    const [cat, setCat] = useState('');
    const [quantity, setQuantity] = useState(1);
    // const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth?.currentUser);

    // cảnh báo --------------------------------
    const [checkSize, setCheckSize] = useState(false);
    const [borderColor, setBorderColor] = useState('#ffffff');

    return (
        <div>
            <NavBar />
            <Announcement item2="Giới thiệu" show1={false} />

            <div className="about-wrapper">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-3">
                            <div className="about-container">
                                <div className="about-title">danh mục trang</div>
                                <ul className="about-list">
                                    <li className="about-item">
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
                                    </li>
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
                        <div className="col l-9">
                            <div className="content">
                                <h1 className="content-title">Giới thiệu</h1>

                                <p className="content-desc">
                                    Chúng mình xuất hiện để đem tới mọi người một chất
                                    lượng áo tốt nhất, với giá thành hấp dẫn nhất để đưa
                                    Outerity đến với tất cả lứa tuổi và khắp mọi vùng miền
                                    đất nước
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
