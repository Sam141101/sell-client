import { Call, Facebook, MailOutline, Phone, Room } from '@mui/icons-material';
import { useState } from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

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
        title: '- Fanpage',
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
            <div className="footer-contact-phone db">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-12" style={{ fontSize: '15px' }}>
                            <div className="block-footer df ai">
                                <div className="block-footer-icon df ai jc bd50pt">
                                    <Call />
                                </div>
                                <span>Hỗ trợ / Mua hàng:</span>
                                <span style={{ color: '#f52424', marginLeft: '10px' }}>
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
                                <ul className="footer-list df flex-direction h100pt">
                                    {data[1].items.map((item) => (
                                        <li
                                            key={item.name}
                                            className="footer-list-item db"
                                        >
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
                                <div className="footer-contact-item df ai">
                                    <Room style={{ marginRight: '10px' }} />{' '}
                                    {data[2].room}
                                </div>
                                <div className="footer-contact-item df ai">
                                    <Phone style={{ marginRight: '10px' }} />{' '}
                                    {data[2].phone}
                                </div>
                                <div className="footer-contact-item df ai">
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
                                style={{ height: '130px', position: 'relative' }}
                            >
                                <img
                                    style={{
                                        // height: 'auto',
                                        minHeight: 'initial',
                                        width: '100%',
                                        height: '100%',
                                        maxWidth: '100%',
                                    }}
                                    // width="270"
                                    // height="130"
                                    src="https://file.hstatic.net/200000312481/file/dacbiet_7c9134bbbea44077b081bbdcaa2a4b33_large.jpg"
                                    alt=""
                                />
                                <div className="shawdow h100pt w100pt"></div>
                                <Link
                                    style={{ textDecoration: 'none', color: 'black' }}
                                    to="https://www.facebook.com/outerity/"
                                >
                                    <p className="text-link-face">OUTERITY</p>
                                    <span className="link-face fw500 cs">
                                        <Facebook />
                                        Outerity
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
