import { Send } from '@mui/icons-material';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import './newsletter.css';

// const Container = styled.div`
//     height: 60vh;
//     background-color: #fcf5f5;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
// `;

// const Title = styled.h1`
//     font-size: 70px;
//     margin-bottom: 20px;
// `;

// const Desc = styled.div`
//     font-size: 24px;
//     margin-bottom: 24px;
//     font-weight: 300;
//     ${mobile({
//         textAlign: 'center',
//     })}
// `;

// const InputContainer = styled.div`
//     width: 50%;
//     height: 40px;
//     background-color: white;
//     display: flex;
//     justify-content: space-between;
//     border: 1px solid lightgray;
//     ${mobile({
//         width: '80%',
//     })}
// `;

// const Input = styled.input`
//     border: none;
//     flex: 8;
//     padding-left: 20px;
// `;

// const Button = styled.button`
//     flex: 1;
//     border: none;
//     background-color: teal;
//     color: white;
// `;

const Newsletter = () => {
    return (
        <div className='newsletter-container'>
            <h1 className='newsletter-title'>Newsletter</h1>
            <div className='newsletter-desc'>Nhận cập nhật thời gian từ các sản phẩm yêu thích của bạn</div>
            <div className='newsletter-input-container'>
                <input className="newsletter-input" placeholder="Your email" />

                <button className='newsletter-button'>
                    <Send fontSize="large" />
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
