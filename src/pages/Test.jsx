// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './test.css';

// const Test = ({ menu }) => {
//     const [menuOpen, setMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setMenuOpen(!menuOpen);
//     };

//     const renderMenuItems = (items) => {
//         return items.map((item) => {
//             if (item.children) {
//                 return (
//                     <li key={item.id} className="nav-item">
//                         <button
//                             onClick={toggleMenu}
//                             className="nav-link"
//                             aria-haspopup="true"
//                         >
//                             {item.title}
//                         </button>
//                         <ul className="sub-menu">{renderMenuItems(item.children)}</ul>
//                     </li>
//                 );
//             } else {
//                 return (
//                     <li key={item.id} className="nav-item">
//                         <Link onClick={toggleMenu} className="nav-link" to={item.path}>
//                             {item.title}
//                         </Link>
//                     </li>
//                 );
//             }
//         });
//     };

//     return (
//         <nav>
//             <button onClick={toggleMenu} className="menu-toggle" aria-expanded={menuOpen}>
//                 <span className="sr-only">Toggle Navigation</span>
//                 <i
//                     className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'}`}
//                     aria-hidden="true"
//                 ></i>
//             </button>
//             <div
//                 className={`nav-overlay ${menuOpen ? 'show' : ''}`}
//                 onClick={toggleMenu}
//             ></div>
//             <ul className={`nav-menu ${menuOpen ? 'show' : ''}`}>
//                 {renderMenuItems(menu)}
//             </ul>
//         </nav>
//     );
// };

// export default Test;
