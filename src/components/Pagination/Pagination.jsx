import styled from 'styled-components';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import './pagination.css';

const Pagination = (props) => {
    const { pagination, onPageChange } = props;
    const { page, totalRows } = pagination;
    const totalPages = Math.ceil(totalRows / 12);

    const handlePageChange = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="pagination-container">
            <span className="pagination-text">
                Trang số {page} - {totalPages}
            </span>

            <div className="pagination-pagi">
                <button
                    className="pagination-button"
                    style={{ marginRight: '20px' }}
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    <KeyboardArrowLeft
                        style={{ color: 'white', fontWeight: 'bold' }}
                        fontSize="large"
                    />
                </button>

                <button
                    className="pagination-button"
                    disabled={page >= totalPages}
                    onClick={() => handlePageChange(page + 1)}
                >
                    <KeyboardArrowRight
                        style={{ color: 'white', fontWeight: 'bold' }}
                        fontSize="large"
                    />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
