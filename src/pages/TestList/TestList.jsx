import { ExpandMore, Remove } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './testList.css';

// --------------------------------------------------------------
const data = [
    {
        id: 1,
        title: 'TOP',
        item: [
            {
                name: 'HOODIE',
                // to: '/products/HOODIE',
                to: `/products/HOODIE?page=${1}`,
            },
            {
                name: 'TEE',
                // to: '/products/TEE',
                to: `/products/TEE?page=${1}`,
            },
            {
                name: 'POLO',
                // to: '/products/POLO',
                to: `/products/POLO?page=${1}`,
            },
        ],
    },

    {
        id: 2,
        title: 'BOTTOM',
        item: [
            {
                // to: '/products/SHORT',
                name: 'SHORT',
                to: `/products/SHORT?page=${1}`,
            },
        ],
    },
];

const TestList = () => {
    const [show, setShow] = useState(1);
    console.log(show);

    const handleClick = (id) => {
        if (show === id) {
            const lll = document.querySelector('.gg2');
            lll.classList.toggle('active');
        }

        console.log('mới bấm >>>>', typeof id);
        setShow(id);
    };

    const handleClickListProduct = () => {
        const list = document.querySelector('.mm');
        list.classList.toggle('active-list-product');
    };

    return (
        <div className="list-product-mobile-frame">
            <div className="product-list-hidden">
                <div className="list-product-mobile" onClick={handleClickListProduct}>
                    <div className="list-product-mobile-title">Danh sách sản phẩm</div>
                    <ExpandMore className="list-product-mobile-icon" />
                </div>
            </div>

            <div className="mm">
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
        </div>
    );
};

export default TestList;
