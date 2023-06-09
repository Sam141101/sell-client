import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import './pagination.css';

const Pagination = (props) => {
    const {
        pagination,
        onPageChange,
        // setFilterPage,
    } = props;
    const { page, totalRows, limit } = pagination;
    const totalPages = Math.ceil(totalRows / limit);

    // const onPageChange = (newPage) => {
    //     // Update the filterPage state with the new page value
    //     setFilterPage(newPage);

    //     // Get the current URL and append the new "page" query parameter
    //     const url = new URL(window.location.href);
    //     url.searchParams.set('page', newPage);

    //     // Change the URL and add a new record to the browser's history
    //     window.history.pushState({}, '', url);
    // };

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <span
                key={i}
                className={`pagination-number cs fz16 ${i === page ? 'active' : ''}`}
                onClick={() => handleClick(i)}
            >
                {i}
            </span>,
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
            {totalPages > 1 && (
                <div className="pagination-pagi df ai jc">
                    {page > 1 && (
                        <button
                            className="pagination-button df out cs fz15"
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
                            className="pagination-button df out cs fz15"
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
