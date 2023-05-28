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

    return (
        <div className="pagination-container">
            {/* <span className="pagination-text">
                Trang số {page} - {totalPages}{' '}
            </span> */}
            {totalPages > 1 && (
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
            )}
        </div>
    );
};

export default Pagination;
