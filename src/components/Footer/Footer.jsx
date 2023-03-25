import {
    Call,
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from '@mui/icons-material';
import { Link } from '@mui/material';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-contact-phone">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-12" style={{ fontSize: '15px' }}>
                            <div className="block-footer">
                                <div className="block-footer-icon">
                                    <Call />
                                </div>
                                <span>Hỗ trợ / Mua hàng:</span>
                                <span style={{ color: 'red', marginLeft: '10px' }}>
                                    086 2642568
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-frame">
                <div className="grid wide">
                    <div
                        className="row"
                        style={{
                            marginTop: '30px',
                            marginBottom: '30px',
                            // backgroundColor: 'white',
                        }}
                    >
                        <div className="col l-4 c-12">
                            <h2 className="footer-title">Giới thiệu</h2>
                            <p>
                                Chúng mình xuất hiện để đem tới mọi người một chất lượng
                                áo tốt nhất, với giá thành hấp dẫn nhất để đưa Outerity
                                đến với tất cả lứa tuổi và khắp mọi vùng miền đất nước.
                            </p>
                        </div>

                        <div className="col l-2-5 c-12">
                            <h2 className="footer-title">Liên kết</h2>
                            <ul className="footer-list">
                                <li className="footer-list-item">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            cursor: 'pointer',
                                        }}
                                        to="/"
                                    >
                                        Tìm kiếm
                                    </Link>
                                </li>

                                <li className="footer-list-item">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            cursor: 'pointer',
                                        }}
                                        to="/about"
                                    >
                                        Giới thiệu
                                    </Link>
                                </li>

                                <li className="footer-list-item">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            cursor: 'pointer',
                                        }}
                                        to="/chinh-sach-doi-tra"
                                    >
                                        Chính sách đổi trả
                                    </Link>
                                </li>

                                <li className="footer-list-item">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            cursor: 'pointer',
                                        }}
                                        to="/chinh-sach-bao-mat"
                                    >
                                        Chính sách bảo mật
                                    </Link>
                                </li>

                                <li className="footer-list-item">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            cursor: 'pointer',
                                        }}
                                        to="/dieu-khoan-dich-vu"
                                    >
                                        Điều khoản dịch vụ
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col l-2-5 c-12">
                            <h2 className="footer-title">Thông tin liên hệ</h2>
                            <div className="footer-contact-item">
                                <Room style={{ marginRight: '10px' }} /> TP.HCM
                            </div>
                            <div className="footer-contact-item">
                                <Phone style={{ marginRight: '10px' }} /> ‭086 2642568‬
                            </div>
                            <div className="footer-contact-item">
                                <MailOutline style={{ marginRight: '10px' }} />{' '}
                                huysang@gmail.com
                            </div>
                        </div>

                        <div className="col l-3 c-0">
                            <h2 className="footer-title">Địa chỉ cửa hàng</h2>
                            <div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2299765283074!2d106.63520801462268!3d10.793690292309828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175295323764dd5%3A0x39ec5e2883ed2437!2zMjIgTmd1eeG7hW4gVGjDoWkgSOG7jWMsIFTDom4gVGjDoG5oLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCA3MDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1679563296326!5m2!1svi!2s"
                                    width="600"
                                    height="450"
                                    style="border:0;"
                                    allowfullscreen=""
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
