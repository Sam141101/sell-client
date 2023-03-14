import styled from 'styled-components';
// import { categories } from '../../data';
import { categories } from '../../data';
import './categories.css';

import CategoryItem from '../CategoriesItem/CategoryItem';

const Categories = () => {
    return (
        <div className="categories-container">
            {categories.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </div>
    );
};

export default Categories;
