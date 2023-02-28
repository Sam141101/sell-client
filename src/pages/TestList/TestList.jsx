import { Remove } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../../redux/apiCalls';
import { mobile } from '../../responsive';
import './testList.css';

// --------------------------------------------------------------

const data = [
    {
        id: 1,
        title: 'TOP',
        item: [
            {
                name: 'HOODIE',
                to: '/products/HOODIE',
            },
            {
                to: '/products/TEE',
                name: 'TEE',
            },
            {
                to: '/products/POLO',
                name: 'POLO',
            },
        ],
    },

    {
        id: 2,
        title: 'BOTTOM',
        item: [
            {
                to: '/products/SHORT',
                name: 'SHORT',
            },
        ],
    },
];

const TestList = () => {
    const [show, setShow] = useState(1);
    console.log(show);

    const handleClick = (id) => {
        setShow(id);
    };

    return (
        <div className="mm">
            {/* {data.map((item) => (
                <div key={item.id}>
                    <div className="tt1" onClick={() => handleClick(item.id)}>
                        {item.title}
                        <Remove style={{ marginLeft: '5px' }} />
                    </div>
                    <ul className={`gg2 ${show === item.id ? 'active' : ''}`}>
                        {item.item.map((mm, index) => (
                            <li className="mm2" key={index}>
                                <Link className="gg-link" to={mm.to}>
                                    {mm.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))} */}

            {data.map((item) => (
                <div key={item.id}>
                    <div className="tt1" onClick={() => handleClick(item.id)}>
                        {item.title}
                        <Remove style={{ marginLeft: '5px' }} />
                    </div>
                    <ul className={`gg2 ${show === item.id ? 'active' : ''}`}>
                        {item.item.map((mm, index) => (
                            <li className="mm2" key={index}>
                                <Link className="gg-link" to={mm.to}>
                                    {mm.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TestList;
