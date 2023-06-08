import { KeyboardArrowLeft, KeyboardArrowRight, Star } from '@mui/icons-material';
import { Rating } from '@mui/material';
import './comment.css';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { changDate } from '../../support';

// const Comment = ({dispatch, user, axiosJWT, BASE_URL_API}) => {
const Comment = ({ axios, BASE_URL_API }) => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const [option, setOption] = useState('all');
    const [ratingValue, setRatingValue] = useState(null);

    const [listInfoComment, setListInfoComment] = useState({});
    const [filterPage, setFilterPage] = useState(1);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalRows: 20,
    });

    const handlePageChange = (newPage) => {
        setFilterPage(newPage);
    };

    const [img, setImg] = useState('');

    const handleChangeImg = (imgItem) => {
        if (img === imgItem) {
            setImg('');
        } else {
            setImg(imgItem);
        }
    };

    const handleClick = (imgArr, direction) => {
        if (direction === 'left') {
            const currentIndex = imgArr.indexOf(img);
            if (currentIndex > 0) {
                setImg(imgArr[currentIndex - 1]);
            }
        } else if (direction === 'right') {
            const currentIndex = imgArr.indexOf(img);
            if (currentIndex < imgArr.length - 1) {
                setImg(imgArr[currentIndex + 1]);
            }
        }
    };

    const componentRef = useRef(null);

    useEffect(() => {
        const element = componentRef.current;
        if (element != null) {
            const observer = new IntersectionObserver((entries) => {
                // Phát hiện khi phần tử hiển thị trong Viewport
                const [entry] = entries;
                if (entry.isIntersecting) {
                    // Nếu phần tử hiển thị, ta gọi API để tải dữ liệu
                    const getComment = async () => {
                        try {
                            const res = await axios.get(
                                BASE_URL_API +
                                    `comments/find/${id}/${option}?page=${filterPage}&limit=3`,
                            );
                            const { resultProducts, pagi } = res.data;

                            setListInfoComment(resultProducts);
                            setPagination(pagi);
                        } catch (err) {}
                    };
                    getComment();
                    // Sau khi tải xong thì ta ngừng theo dõi thay đổi của element nữa
                    observer.disconnect();
                }
            });

            observer.observe(element);

            // Trả về một function để remove phần tử khỏi Intersection Observer khi unmount component
            return () => {
                if (observer && element) {
                    observer.unobserve(element);
                    observer.disconnect();
                }
            };
        }
    }, [axios, BASE_URL_API, filterPage, id, option]);

    console.log('componentRef.current', componentRef.current);

    return (
        <div className="comment" ref={componentRef}>
            <div className="grid wide">
                <div className="row">
                    <div className="col l-12">
                        <div
                            className="comment-title"
                            style={
                                listInfoComment.mainEvaluateStar !== 0
                                    ? { display: 'block' }
                                    : { display: 'none' }
                            }
                        >
                            đánh giá sản phẩm
                        </div>
                    </div>
                </div>

                <div
                    style={
                        listInfoComment.mainEvaluateStar !== 0
                            ? { display: 'block' }
                            : { display: 'none' }
                    }
                >
                    <div className="main-evaluate-comment">
                        <div className="main-evaluate-comment-left">
                            <div className="main-evaluate-comment-title hide-on-mobile">
                                {listInfoComment &&
                                    listInfoComment.mainEvaluateStar &&
                                    parseFloat(
                                        listInfoComment.mainEvaluateStar.toFixed(1),
                                    )}
                                <span className="main-evaluate-comment-desc">trên 5</span>
                            </div>

                            <Rating
                                name="product-rating"
                                readOnly
                                value={
                                    typeof listInfoComment?.mainEvaluateStar === 'number'
                                        ? parseFloat(
                                              listInfoComment.mainEvaluateStar.toFixed(1),
                                          )
                                        : ratingValue
                                    // '2.5'
                                }
                                onChange={(event, value) => setRatingValue(value)}
                                defaultValue={null}
                                precision={0.1}
                                emptyIcon={<Star fontSize="inherit" />}
                                className="quality-rating-star"
                            />

                            <div className="main-evaluate-comment-title-mobile">
                                {listInfoComment &&
                                    listInfoComment.mainEvaluateStar &&
                                    parseFloat(
                                        listInfoComment.mainEvaluateStar.toFixed(1),
                                    )}
                                /5
                            </div>

                            <div className="main-evaluate-comment-title-mobile evaluate-text-mobile">
                                {/* {listInfoComment &&
                                    listInfoComment.list &&
                                    parseFloat(listInfoComment.list.length)}{' '} */}
                                {pagination &&
                                    pagination.totalRows &&
                                    parseFloat(pagination.totalRows)}{' '}
                                Đánh giá
                            </div>
                        </div>

                        <div className="main-evaluate-comment-right">
                            <div
                                className={`main-evaluate-comment-right-option ${
                                    option === 'all' ? 'option-active' : ''
                                }`}
                                onClick={() => setOption('all')}
                            >
                                Tất cả
                            </div>
                            <div></div>
                            <div
                                className={`main-evaluate-comment-right-option ${
                                    option === '5' ? 'option-active' : ''
                                }`}
                                onClick={() => setOption('5')}
                            >
                                5 Sao (
                                {listInfoComment &&
                                    listInfoComment.amount &&
                                    listInfoComment?.amount.amountStar5}
                                )
                            </div>

                            <div
                                className={`main-evaluate-comment-right-option ${
                                    option === '4' ? 'option-active' : ''
                                }`}
                                onClick={() => setOption('4')}
                            >
                                4 Sao (
                                {listInfoComment &&
                                    listInfoComment.amount &&
                                    listInfoComment?.amount.amountStar4}
                                )
                            </div>

                            <div
                                className={`main-evaluate-comment-right-option ${
                                    option === '3' ? 'option-active' : ''
                                }`}
                                onClick={() => setOption('3')}
                            >
                                3 Sao (
                                {listInfoComment &&
                                    listInfoComment.amount &&
                                    listInfoComment?.amount.amountStar3}
                                )
                            </div>

                            <div
                                className={`main-evaluate-comment-right-option ${
                                    option === '2' ? 'option-active' : ''
                                }`}
                                onClick={() => setOption('2')}
                            >
                                2 Sao (
                                {listInfoComment &&
                                    listInfoComment.amount &&
                                    listInfoComment?.amount.amountStar2}
                                )
                            </div>
                            <div
                                className={`main-evaluate-comment-right-option ${
                                    option === '1' ? 'option-active' : ''
                                }`}
                                onClick={() => setOption('1')}
                            >
                                1 Sao (
                                {listInfoComment &&
                                    listInfoComment.amount &&
                                    listInfoComment?.amount.amountStar1}
                                )
                            </div>
                            <div
                                className={`main-evaluate-comment-right-option ${
                                    option === 'comment' ? 'option-active' : ''
                                }`}
                                onClick={() => setOption('comment')}
                            >
                                Có Bình Luận (
                                {listInfoComment &&
                                    listInfoComment.amount &&
                                    listInfoComment?.amount.amountComment}
                                )
                            </div>
                            <div
                                className={`main-evaluate-comment-right-option ${
                                    option === 'img' ? 'option-active' : ''
                                }`}
                                onClick={() => setOption('img')}
                            >
                                Có Hình Ảnh (
                                {listInfoComment &&
                                    listInfoComment.amount &&
                                    listInfoComment?.amount.amountImg}
                                )
                            </div>
                        </div>
                    </div>
                </div>

                <div className="frame-lists-comment-evaluate-product">
                    <div className="row">
                        <div className="col l-12 c-12">
                            <div className="show-comment">
                                {listInfoComment &&
                                listInfoComment.list &&
                                listInfoComment.list.length > 0 ? (
                                    <>
                                        {listInfoComment?.list.map((item) => (
                                            <div className="buy" key={item._id}>
                                                <div className="user">
                                                    <img
                                                        src={item.user_id.img}
                                                        alt=""
                                                        className="user-img"
                                                    />

                                                    <div className="user-comment">
                                                        <p className="user-name">
                                                            {item.user_id.username}
                                                        </p>

                                                        <div className="evaluate">
                                                            <Rating
                                                                name="product-rating"
                                                                readOnly
                                                                value={item.quantiStar}
                                                                precision={1}
                                                                emptyIcon={
                                                                    <Star fontSize="inherit" />
                                                                }
                                                                className="quality-rating-star"
                                                            />
                                                        </div>
                                                        <div className="date-size-title-product">
                                                            <div className="day-comment">
                                                                {changDate(
                                                                    item.createdAt,
                                                                )}
                                                            </div>

                                                            <div className="comment-line">
                                                                |
                                                            </div>

                                                            <div className="day-comment">
                                                                size : {item.size}
                                                            </div>
                                                        </div>
                                                        <p
                                                            className="text-comment"
                                                            style={{
                                                                overflowWrap:
                                                                    'break-word',
                                                            }}
                                                        >
                                                            {item.comment}
                                                        </p>

                                                        <div className="comment-img">
                                                            {item.img?.map(
                                                                (imgItem, index) => (
                                                                    <div
                                                                        className="comment-block-img"
                                                                        key={index}
                                                                    >
                                                                        <img
                                                                            src={imgItem}
                                                                            alt=""
                                                                            className={`img-content ${
                                                                                img ===
                                                                                imgItem
                                                                                    ? 'active-option-img'
                                                                                    : ''
                                                                            }`}
                                                                            onClick={() =>
                                                                                handleChangeImg(
                                                                                    imgItem,
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>

                                                        <div className="show-block-img-evaluate">
                                                            <div
                                                                style={{
                                                                    display:
                                                                        img.length > 0 &&
                                                                        item.img.indexOf(
                                                                            img,
                                                                        ) > 0
                                                                            ? 'block'
                                                                            : 'none',
                                                                }}
                                                            >
                                                                <div
                                                                    className="button-arrow-evaluate-left"
                                                                    onClick={() =>
                                                                        handleClick(
                                                                            item.img,
                                                                            'left',
                                                                        )
                                                                    }
                                                                    style={{
                                                                        right: '100%',
                                                                        transform:
                                                                            'translateX(calc(50% - 0px))',
                                                                    }}
                                                                >
                                                                    <KeyboardArrowLeft className="button-arrow-evaluate-left-icon" />
                                                                </div>
                                                            </div>
                                                            <div className="main-frame-img-evaluate">
                                                                {/* {img && (
                                                                    <img
                                                                        src={img}
                                                                        alt=""
                                                                        className="show-block-img-evaluate-image"
                                                                    />
                                                                )} */}
                                                                {img &&
                                                                    item.img.includes(
                                                                        img,
                                                                    ) && (
                                                                        <img
                                                                            src={img}
                                                                            alt=""
                                                                            className="show-block-img-evaluate-image"
                                                                        />
                                                                    )}
                                                            </div>

                                                            <div
                                                                style={{
                                                                    display:
                                                                        img.length > 0 &&
                                                                        item.img.indexOf(
                                                                            img,
                                                                        ) !==
                                                                            item.img
                                                                                .length -
                                                                                1
                                                                            ? 'block'
                                                                            : 'none',
                                                                }}
                                                            >
                                                                <div
                                                                    className="button-arrow-evaluate-left"
                                                                    onClick={() =>
                                                                        handleClick(
                                                                            item.img,
                                                                            'right',
                                                                        )
                                                                    }
                                                                    style={{
                                                                        left: '100%',
                                                                        transform:
                                                                            'translateX(calc(-50% - 0px))',
                                                                    }}
                                                                >
                                                                    <KeyboardArrowRight className="button-arrow-evaluate-left-icon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="row">
                                            <div className="col l-12 c-12">
                                                {pagination.totalRows >=
                                                    pagination.limit && (
                                                    <Pagination
                                                        pagination={pagination}
                                                        onPageChange={handlePageChange}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={
                                            listInfoComment.mainEvaluateStar !== 0
                                                ? { display: 'block' }
                                                : { display: 'none' }
                                        }
                                    >
                                        <div className="not-evaluate-option">
                                            <img
                                                className="not-evaluate-option-img"
                                                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/eac95a8ac896158642c2761a9e9cd52e.png"
                                                alt="chưa có đánh giá"
                                            />
                                            <p className="not-evaluate-option-text">
                                                Chưa có đánh giá
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
