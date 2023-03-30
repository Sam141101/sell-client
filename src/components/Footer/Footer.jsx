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
import { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import './footer.css';

const data = [
    {
        id: 1,
        title: '- Giới thiệu',
        desc: 'Chúng mình xuất hiện để đem tới mọi người một chất lượng áo tốt nhất, với giá thành hấp dẫn nhất để đưa Outerity đến với tất cả lứa tuổi và khắp mọi vùng miền đất nước.',
    },
    {
        id: 2,
        title: '- Liên kết',
        items: [
            {
                to: '/',
                name: 'Tìm kiếm',
            },
            {
                to: '/about',
                name: 'Giới thiệu',
            },
            {
                to: '/chinh-sach-doi-tra',
                name: 'Chính sách đổi trả',
            },
            {
                to: '/chinh-sach-bao-mat',
                name: 'Chính sách bảo mật',
            },
            {
                to: '/dieu-khoan-dich-vu',
                name: 'Điều khoản dịch vụ',
            },
        ],
    },

    {
        id: 3,
        title: '- Thông tin liên hệ',
        room: 'HCM',
        phone: '‭0862642568‬',
        mail: 'huysang@gmail.com',
    },

    {
        id: 4,
        title: '- Địa chỉ cửa hàng',
        src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2299765283074!2d106.63520801462268!3d10.793690292309828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175295323764dd5%3A0x39ec5e2883ed2437!2zMjIgTmd1eeG7hW4gVGjDoWkgSOG7jWMsIFTDom4gVGjDoG5oLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCA3MDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1679563296326!5m2!1svi!2s',
    },
];

const Footer = ({ layoutVoucher }) => {
    const [show, setShow] = useState(5);
    const handleClick = (id) => {
        if (show === id) {
            const current = document.querySelector('.info-title-footer-mobile');
            current.classList.toggle('active-show-info');
        }
        setShow(id);
    };

    return (
        <footer className={`footer ${layoutVoucher ? 'layout-voucher' : ''}`}>
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
                    <div className="row footer-margin">
                        <div className="col l-4 c-12">
                            <h2
                                className="footer-title"
                                onClick={() => handleClick(data[0].id)}
                            >
                                {data[0].title}
                            </h2>
                            <div
                                className={`info-title-footer-mobile ${
                                    show === data[0].id ? 'active-show-info' : ''
                                } `}
                            >
                                <p>{data[0].desc}</p>
                            </div>
                        </div>

                        <div className="col l-2-5 c-12">
                            <h2
                                className="footer-title"
                                onClick={() => handleClick(data[1].id)}
                            >
                                {data[1].title}
                            </h2>
                            <div
                                className={`info-title-footer-mobile ${
                                    show === data[1].id ? 'active-show-info' : ''
                                } `}
                            >
                                <ul className="footer-list">
                                    {data[1].items.map((item) => (
                                        <li key={item.name} className="footer-list-item">
                                            <Link
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                    cursor: 'pointer',
                                                }}
                                                to={item.to}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col l-2-5 c-12">
                            <h2
                                className="footer-title"
                                onClick={() => handleClick(data[2].id)}
                            >
                                {data[2].title}
                            </h2>
                            <div
                                className={`info-title-footer-mobile ${
                                    show === data[2].id ? 'active-show-info' : ''
                                } `}
                            >
                                <div className="footer-contact-item">
                                    <Room style={{ marginRight: '10px' }} />{' '}
                                    {data[2].room}
                                </div>
                                <div className="footer-contact-item">
                                    <Phone style={{ marginRight: '10px' }} />{' '}
                                    {data[2].phone}
                                </div>
                                <div className="footer-contact-item">
                                    <MailOutline style={{ marginRight: '10px' }} />{' '}
                                    {data[2].mail}
                                </div>
                            </div>
                        </div>

                        <div className="col l-3 c-12">
                            <h2
                                className="footer-title"
                                onClick={() => handleClick(data[3].id)}
                            >
                                {data[3].title}
                            </h2>
                            <div
                                className={`info-title-footer-mobile ${
                                    show === data[3].id ? 'active-show-info' : ''
                                } `}
                            >
                                <iframe
                                    src={data[3].src}
                                    style={{ border: '0', width: '100%' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Địa chỉ cửa hàng"
                                    referrerPolicy="no-referrer-when-downgrade"
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
