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
// import './policyReturn.css';
import '../About/about.css';
import Introduce from '../../components/Introduce';

const PolicyReturn = ({ children }) => {
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
                                <h1 className="content-title">Chính sách đổi trả</h1>

                                <h4 style={{ marginBottom: '10px' }}>
                                    1. Điều kiện đổi trả
                                </h4>
                                <p style={{ marginBottom: '10px' }}>
                                    Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có
                                    thể đổi hàng/ trả lại hàng ngay tại thời điểm
                                    giao/nhận hàng trong những trường hợp sau:
                                </p>

                                <ul style={{ marginBottom: '15px', paddingLeft: '40px' }}>
                                    <li>
                                        Hàng không đúng chủng loại, mẫu mã trong đơn hàng
                                        đã đặt hoặc như trên website tại thời điểm đặt
                                        hàng.
                                    </li>
                                    <li>
                                        Không đủ số lượng, không đủ bộ như trong đơn hàng.
                                    </li>
                                    <li>
                                        Tình trạng bên ngoài bị ảnh hưởng như rách bao bì,
                                        bong tróc, bể vỡ…
                                    </li>
                                </ul>

                                <p style={{ marginBottom: '30px' }}>
                                    Khách hàng có trách nhiệm trình giấy tờ liên quan
                                    chứng minh sự thiếu sót trên để hoàn thành việc hoàn
                                    trả/đổi trả hàng hóa.
                                </p>

                                <h4 style={{ marginBottom: '10px' }}>
                                    2. Quy định về thời gian thông báo và gửi sản phẩm đổi
                                    trả
                                </h4>
                                <ul style={{ marginBottom: '15px', paddingLeft: '40px' }}>
                                    <li>
                                        Thời gian thông báo đổi trả: trong vòng 48h kể từ
                                        khi nhận sản phẩm đối với trường hợp sản phẩm
                                        thiếu phụ kiện, quà tặng hoặc bể vỡ.
                                    </li>
                                    <li>
                                        Thời gian gửi chuyển trả sản phẩm: trong vòng 14
                                        ngày kể từ khi nhận sản phẩm.
                                    </li>
                                    <li>
                                        Địa điểm đổi trả sản phẩm: Khách hàng có thể mang
                                        hàng trực tiếp đến văn phòng/ cửa hàng của chúng
                                        tôi hoặc chuyển qua đường bưu điện.
                                    </li>
                                </ul>

                                <p>
                                    Trong trường hợp Quý Khách hàng có ý kiến đóng
                                    góp/khiếu nại liên quan đến chất lượng sản phẩm, Quý
                                    Khách hàng vui lòng liên hệ đường dây chăm sóc khách
                                    hàng của chúng tôi.
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

export default PolicyReturn;
