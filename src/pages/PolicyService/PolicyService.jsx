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

const PolicyService = ({ children }) => {
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
                                <h1 className="content-title">Điều khoản dịch vụ</h1>

                                <h4 style={{ marginBottom: '10px' }}>1. Giới thiệu</h4>
                                <p style={{ marginBottom: '10px' }}>
                                    Chào mừng quý khách hàng đến với website chúng tôi.
                                </p>

                                <p style={{ marginBottom: '10px' }}>
                                    Khi quý khách hàng truy cập vào trang website của
                                    chúng tôi có nghĩa là quý khách đồng ý với các điều
                                    khoản này. Trang web có quyền thay đổi, chỉnh sửa,
                                    thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua
                                    bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có
                                    hiệu lực ngay khi được đăng trên trang web mà không
                                    cần thông báo trước. Và khi quý khách tiếp tục sử dụng
                                    trang web, sau khi các thay đổi về Điều khoản này được
                                    đăng tải, có nghĩa là quý khách chấp nhận với những
                                    thay đổi đó.
                                </p>

                                <p style={{ marginBottom: '10px' }}>
                                    Quý khách hàng vui lòng kiểm tra thường xuyên để cập
                                    nhật những thay đổi của chúng tôi.
                                </p>

                                <h4 style={{ marginBottom: '10px' }}>
                                    2. Hướng dẫn sử dụng website
                                </h4>

                                <p style={{ marginBottom: '10px' }}>
                                    Quý khách hàng vui lòng kiểm tra thường xuyên để cập
                                    nhật những thay đổi của chúng tôi.Khi vào web của
                                    chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc
                                    truy cập dưới sự giám sát của cha mẹ hay người giám hộ
                                    hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự
                                    để thực hiện các giao dịch mua bán hàng hóa theo quy
                                    định hiện hành của pháp luật Việt Nam.
                                </p>

                                <p style={{ marginBottom: '10px' }}>
                                    Trong suốt quá trình đăng ký, quý khách đồng ý nhận
                                    email quảng cáo từ website. Nếu không muốn tiếp tục
                                    nhận mail, quý khách có thể từ chối bằng cách nhấp vào
                                    đường link ở dưới cùng trong mọi email quảng cáo.
                                </p>

                                <h4 style={{ marginBottom: '10px' }}>
                                    3. Thanh toán an toàn và tiện lợi
                                </h4>

                                <p style={{ marginBottom: '10px' }}>
                                    Người mua có thể tham khảo các phương thức thanh toán
                                    sau đây và lựa chọn áp dụng phương thức phù hợp:
                                </p>

                                <p style={{ display: 'flex' }}>
                                    <h4 className="about-underlined">Cách 1:</h4>Thanh
                                    toán trực tiếp (người mua nhận hàng tại địa chỉ người
                                    bán)
                                </p>

                                <p style={{ display: 'flex' }}>
                                    <h4 className="about-underlined">Cách 2:</h4>Thanh
                                    toán sau (COD – giao hàng và thu tiền tận nơi)
                                </p>

                                <p style={{ display: 'flex' }}>
                                    <h4 className="about-underlined">Cách 3:</h4> Thanh
                                    toán online qua thẻ tín dụng, chuyển khoản
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

export default PolicyService;
