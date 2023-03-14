import { Send } from '@mui/icons-material';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import './newsletter.css';

const Newsletter = () => {
    return (
        <div className="newsletter-container">
            <h1 className="newsletter-title">Newsletter</h1>
            <div className="newsletter-desc">
                Nhận cập nhật thời gian từ các sản phẩm yêu thích của bạn
            </div>
            <div className="newsletter-input-container">
                <input className="newsletter-input" placeholder="Your email" />

                <button className="newsletter-button">
                    <Send fontSize="large" />
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
