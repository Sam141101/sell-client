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
import styled from 'styled-components';
import { mobile } from '../../responsive';
import './footer.css';

// const Container = styled.div`
//     display: flex;
//     ${mobile({
//         flexDirection: 'column',
//     })}
// `;

// const Left = styled.div`
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     padding: 20px;
// `;

// const Logo = styled.h1``;

// const Desc = styled.p`
//     margin: 20px 0px;
// `;

// const SocialContainer = styled.div`
//     display: flex;
// `;

// const SocialIcon = styled.div`
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     color: white;
//     background-color: #${(props) => props.color};
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-right: 20px;
// `;

// const Center = styled.div`
//     flex: 1;
//     padding: 20px;
//     ${mobile({
//         display: 'none',
//     })}
// `;

// const Title = styled.h3`
//     margin-bottom: 30px;
// `;

// const List = styled.ul`
//     margin: 0;
//     padding: 0;
//     list-style: none;
//     display: flex;
//     flex-wrap: wrap;
// `;

// const ListItem = styled.li`
//     width: 50%;
//     margin-bottom: 10px;
// `;

// const Right = styled.div`
//     padding: 20px;
//     flex: 1;
//     ${mobile({
//         backgroundColor: '#fff8f8',
//     })}
// `;

// const ContactItem = styled.div`
//     display: flex;
//     margin-bottom: 20px;
//     align-items: center;
// `;

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
                            <h1>Outerity</h1>
                            <p>
                                Chúng mình xuất hiện để đem tới mọi người một chất lượng
                                áo tốt nhất, với giá thành hấp dẫn nhất để đưa Outerity
                                đến với tất cả lứa tuổi và khắp mọi vùng miền đất nước
                            </p>
                            <div className="footer-social-container">
                                <div
                                    className="footer-social-icon"
                                    style={{ backgroundColor: '#3B5999' }}
                                >
                                    <Facebook />
                                </div>

                                <div
                                    className="footer-social-icon"
                                    style={{ backgroundColor: '#E4405F' }}
                                >
                                    <Instagram />
                                </div>

                                <div
                                    className="footer-social-icon"
                                    style={{ backgroundColor: '#55ACEE' }}
                                >
                                    <Twitter />
                                </div>

                                <div
                                    className="footer-social-icon"
                                    style={{ backgroundColor: '#E60023' }}
                                >
                                    <Pinterest />
                                </div>
                            </div>
                        </div>

                        <div className="col l-4 c-0">
                            <h3 className="footer-title">Use Links</h3>
                            <ul className="footer-list">
                                <li className="footer-list-item">Home</li>
                                <li className="footer-list-item">Cart</li>
                                <li className="footer-list-item">Man Fashion</li>
                                <li className="footer-list-item">Woman Fashion</li>
                                <li className="footer-list-item">My Account</li>
                                <li className="footer-list-item">Order Tracking</li>
                                <li className="footer-list-item">Terms</li>
                                <li className="footer-list-item">WishList</li>
                            </ul>
                        </div>

                        <div className="col l-4 c-0">
                            <h3 className="footer-title">Contact</h3>
                            <div className="footer-contact-item">
                                <Room style={{ marginRight: '10px' }} /> The New
                                Playground, 04 Phạm Ngũ Lão, quận 1, HCM
                            </div>
                            <div className="footer-contact-item">
                                <Phone style={{ marginRight: '10px' }} /> 1900 633 028
                            </div>
                            <div className="footer-contact-item">
                                <MailOutline style={{ marginRight: '10px' }} />{' '}
                                huysang@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

{
    /* <div className="footer-container">
            <div className="footer-left">
                <h1>Outerity</h1>
                <p>
                    Chúng mình xuất hiện để đem tới mọi người một chất lượng áo tốt nhất,
                    với giá thành hấp dẫn nhất để đưa Outerity đến với tất cả lứa tuổi và
                    khắp mọi vùng miền đất nước
                </p>
                <div className="footer-social-container">
                    <div
                        className="footer-social-icon"
                        style={{ backgroundColor: '#3B5999' }}
                    >
                        <Facebook />
                    </div>

                    <div
                        className="footer-social-icon"
                        style={{ backgroundColor: '#E4405F' }}
                    >
                        <Instagram />
                    </div>

                    <div
                        className="footer-social-icon"
                        style={{ backgroundColor: '#55ACEE' }}
                    >
                        <Twitter />
                    </div>

                    <div
                        className="footer-social-icon"
                        style={{ backgroundColor: '#E60023' }}
                    >
                        <Pinterest />
                    </div>
                </div>
            </div>

            <div className="footer-center">
                <h3 className="footer-title">Use Links</h3>
                <ul className="footer-list">
                    <li className="footer-list-item">Home</li>
                    <li className="footer-list-item">Cart</li>
                    <li className="footer-list-item">Man Fashion</li>
                    <li className="footer-list-item">Woman Fashion</li>
                    <li className="footer-list-item">My Account</li>
                    <li className="footer-list-item">Order Tracking</li>
                    <li className="footer-list-item">Terms</li>
                    <li className="footer-list-item">WishList</li>
                </ul>
            </div>

            <div className="footer-right">
                <h3 className="footer-title">Contact</h3>
                <div className="footer-contact-item">
                    <Room style={{ marginRight: '10px' }} /> The New Playground, 04 Phạm
                    Ngũ Lão, quận 1, HCM
                </div>
                <div className="footer-contact-item">
                    <Phone style={{ marginRight: '10px' }} /> 1900 633 028
                </div>
                <div className="footer-contact-item">
                    <MailOutline style={{ marginRight: '10px' }} /> huysang@gmail.com
                </div>
            </div>
        </div> */
}
