import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import './pagination.css';
import { Link } from 'react-router-dom';

const Pagination = (props) => {
    const { pagination, onPageChange } = props;
    const { page, totalRows, limit } = pagination;
    const totalPages = Math.ceil(totalRows / limit);

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            // <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/products/${}?search=${}`}>
            <span
                key={i}
                className={`pagination-number ${i === page ? 'active' : ''}`}
                onClick={() => handleClick(i)}
            >
                {i}
            </span>,
            // </Link>,
        );
    }

    const handlePageChange = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage);
        }
    };

    const handleClick = (newPage) => {
        onPageChange(newPage);
    };

    // return (
    //     <div className="pagination-container">
    //         {/* <span className="pagination-text">
    //             Trang số {page} - {totalPages}
    //         </span> */}

    //         <div className="pagination-pagi">
    //             <button
    //                 className="pagination-button"
    //                 style={page && page <= 1 ? { display: 'none' } : { display: 'flex' }}
    //                 // disabled={page <= 1}
    //                 onClick={() => handlePageChange(page - 1)}
    //             >
    //                 <KeyboardArrowLeft
    //                     style={{ color: 'white', fontWeight: 'bold' }}
    //                     fontSize="large"
    //                 />
    //             </button>

    //             <>
    //                 <span className="pagination-number" onClick={handleClick}>
    //                     1
    //                 </span>
    //                 <span className="pagination-number">2</span>
    //                 <span className="pagination-number">3</span>
    //             </>

    //             <button
    //                 className="pagination-button"
    //                 // disabled={page >= totalPages}
    //                 style={
    //                     page && totalPages && page >= totalPages
    //                         ? { display: 'none' }
    //                         : { display: 'flex' }
    //                 }
    //                 onClick={() => handlePageChange(page + 1)}
    //             >
    //                 <KeyboardArrowRight
    //                     style={{ color: 'white', fontWeight: 'bold' }}
    //                     fontSize="large"
    //                 />
    //             </button>
    //         </div>
    //     </div>
    // );

    return (
        <div className="pagination-container">
            <div className="pagination-pagi">
                {page > 1 && (
                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(page - 1)}
                    >
                        <KeyboardArrowLeft
                            style={{ color: 'white', fontWeight: 'bold' }}
                            fontSize="large"
                        />
                    </button>
                )}

                {pageNumbers}

                {page < totalPages && (
                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(page + 1)}
                    >
                        <KeyboardArrowRight
                            style={{ color: 'white', fontWeight: 'bold' }}
                            fontSize="large"
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Pagination;
