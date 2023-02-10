import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { mobile } from '../responsive';
import './categoriesItem.css'


const CategoryItem = ({ item }) => {
    return (
        <div className="categories-item-container">
            <Link to={`/products/${item.cat}`}>
                <img className="categories-item-image" src={item.img} alt='' />
                <div className="categories-item-info">
                    <button className="categories-item-button">{item.title} NOW</button>
                </div>
            </Link>
        </div>
    );
};

export default CategoryItem;
