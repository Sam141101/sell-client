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

const PolicyProtect = ({ children }) => {
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
        // <div>
        //     <NavBar />
        //     <Announcement item2="Giới thiệu" show1={false} />

        //     <div className="about-wrapper">
        //         <div className="grid wide">
        //             <div className="row">
        //                 <div className="col l-3">
        //                     <div className="about-container">
        //                         <div className="about-title">danh mục trang</div>
        //                         <ul className="about-list">
        //                             <li className="about-item">
        //                                 <Link
        //                                     to="/"
        //                                     style={{
        //                                         color: 'black',
        //                                         textDecoration: 'none',
        //                                         padding: '5px 5px 5px 0',
        //                                     }}
        //                                 >
        //                                     Tìm kiếm
        //                                 </Link>
        //                             </li>
        //                             <li className="about-item">
        //                                 <Link
        //                                     to="/about"
        //                                     style={{
        //                                         color: 'black',
        //                                         textDecoration: 'none',
        //                                         padding: '5px 5px 5px 0',
        //                                     }}
        //                                 >
        //                                     Giới thiệu
        //                                 </Link>
        //                             </li>
        //                             <li className="about-item">
        //                                 <Link
        //                                     to="/chinh-sach-doi-tra"
        //                                     style={{
        //                                         color: 'black',
        //                                         textDecoration: 'none',
        //                                         padding: '5px 5px 5px 0',
        //                                     }}
        //                                 >
        //                                     Chính sách đổi trả
        //                                 </Link>
        //                             </li>
        //                             <li className="about-item">
        //                                 <Link
        //                                     to="/chinh-sach-bao-mat"
        //                                     style={{
        //                                         color: 'black',
        //                                         textDecoration: 'none',
        //                                         padding: '5px 5px 5px 0',
        //                                     }}
        //                                 >
        //                                     Chính sách bảo mật
        //                                 </Link>
        //                             </li>
        //                             <li className="about-item">
        //                                 <Link
        //                                     to="/dieu-khoan-dich-vu"
        //                                     style={{
        //                                         color: 'black',
        //                                         textDecoration: 'none',
        //                                         padding: '5px 5px 5px 0',
        //                                     }}
        //                                 >
        //                                     Điều khoản dịch vụ
        //                                 </Link>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //                 <div className="col l-9">
        //                     <div className="content">
        //                         <h1 className="content-title">Chính sách bảo mật</h1>

        //                         <p style={{ marginBottom: '10px' }}>
        //                             Chính sách bảo mật này nhằm giúp Quý khách hiểu về
        //                             cách website thu thập và sử dụng thông tin cá nhân của
        //                             mình thông qua việc sử dụng trang web, bao gồm mọi
        //                             thông tin có thể cung cấp thông qua trang web khi Quý
        //                             khách đăng ký tài khoản, đăng ký nhận thông tin liên
        //                             lạc từ chúng tôi, hoặc khi Quý khách mua sản phẩm,
        //                             dịch vụ, yêu cầu thêm thông tin dịch vụ từ chúng tôi.
        //                         </p>

        //                         <p style={{ marginBottom: '10px' }}>
        //                             Chúng tôi sử dụng thông tin cá nhân của Quý khách để
        //                             liên lạc khi cần thiết liên quan đến việc Quý khách sử
        //                             dụng website của chúng tôi, để trả lời các câu hỏi
        //                             hoặc gửi tài liệu và thông tin Quý khách yêu cầu.
        //                         </p>

        //                         <p style={{ marginBottom: '10px' }}>
        //                             Trang web của chúng tôi coi trọng việc bảo mật thông
        //                             tin và sử dụng các biện pháp tốt nhất để bảo vệ thông
        //                             tin cũng như việc thanh toán của khách hàng.
        //                         </p>

        //                         <p>
        //                             Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ
        //                             trong trường hợp cơ quan pháp luật yêu cầu.
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <Footer />
        // </div>

        <>
            <div className="content">
                <h1 className="content-title">Chính sách bảo mật</h1>

                <p style={{ marginBottom: '10px' }}>
                    Chính sách bảo mật này nhằm giúp Quý khách hiểu về cách website thu
                    thập và sử dụng thông tin cá nhân của mình thông qua việc sử dụng
                    trang web, bao gồm mọi thông tin có thể cung cấp thông qua trang web
                    khi Quý khách đăng ký tài khoản, đăng ký nhận thông tin liên lạc từ
                    chúng tôi, hoặc khi Quý khách mua sản phẩm, dịch vụ, yêu cầu thêm
                    thông tin dịch vụ từ chúng tôi.
                </p>

                <p style={{ marginBottom: '10px' }}>
                    Chúng tôi sử dụng thông tin cá nhân của Quý khách để liên lạc khi cần
                    thiết liên quan đến việc Quý khách sử dụng website của chúng tôi, để
                    trả lời các câu hỏi hoặc gửi tài liệu và thông tin Quý khách yêu cầu.
                </p>

                <p style={{ marginBottom: '10px' }}>
                    Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử dụng
                    các biện pháp tốt nhất để bảo vệ thông tin cũng như việc thanh toán
                    của khách hàng.
                </p>

                <p>
                    Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ trong trường hợp cơ
                    quan pháp luật yêu cầu.
                </p>
            </div>
        </>
    );
};

export default PolicyProtect;
