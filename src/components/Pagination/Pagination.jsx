import styled from 'styled-components';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import './pagination.css';

// const Container = styled.div`
//     text-align: center;
//     margin: 0px 0 20px 0;
// `;

// const Pagi = styled.div`
//     display: flex;
//     align-items: center;

//     justify-content: center;
//     margin-top: 15px;
// `;

// const Text = styled.span`
//     font-size: 18px;
//     font-weight: 500;
// `;

// const Button = styled.button`
//     padding: 10px;
//     background-color: red;
//     border-radius: 3px;
//     display: flex;
//     outline: none;
//     border: none;
//     cursor: pointer;

//     &:hover {
//         opacity: 0.85;
//     }

//     &:disabled {
//         opacity: 0.6;
//         cursor: not-allowed;
//     }
// `;

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
