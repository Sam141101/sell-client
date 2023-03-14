import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './test.css';

const Test = ({ menu }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/paypal/pay');
            // const res = await axios.post('http://localhost:5000/pay');
            // navigate(`${res.data}`);
            window.location.href = `${res.data}`;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="dienthoai">
                <h1>
                    <img
                        src="https://cdn.tgdd.vn/Products/Images/42/50920/dien-thoai-di-dong-apple-iphone-4S-dienmay.com-b.jpg"
                        alt=""
                    />
                </h1>
                <p>Iphone 4s</p>
                <h4>25.00 USD</h4>
                {/* <div className="button">
                    <form action="/pay" method="post">
                        <input type="submit" value="Buy" />
                    </form>
                </div> */}

                <button className="button" onClick={handleClick}>
                    Buy
                </button>
            </div>
        </>
    );
};

export default Test;
