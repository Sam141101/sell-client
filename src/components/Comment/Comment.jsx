import styled from 'styled-components';
import { KeyboardArrowLeft, KeyboardArrowRight, Star } from '@mui/icons-material';

import './comment.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL_API } from '../../requestMethods';

const Comment = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const user = useSelector((state) => state.auth?.currentUser);
    const [comment, setComment] = useState('');

    const [listComment, setListComment] = useState([]);

    // console.log(listComment);

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleClick = (e) => {
        const infoComment = {
            comment: comment,
            product_id: id,
            user_id: user._id,
        };

        const addComment = async () => {
            try {
                const res = await axios.post(
                    BASE_URL_API + 'comments/' + user._id,
                    // 'http://localhost:5000/api/comments/' + user._id,
                    infoComment,
                    {
                        headers: { token: `Bearer ${user.token}` },
                    },
                );
            } catch (err) {
                console.log(err);
            }
        };
        console.log('success11');
        addComment();
        setComment('');
        // location.reload();
    };

    useEffect(() => {
        const getComment = async () => {
            try {
                // const res = await publicRequest.get('/products/find/' + id);
                const res = await axios.get(
                    'http://localhost:5000/api/comments/find/' + id,
                );
                setListComment(res.data);
            } catch (err) {}
        };
        getComment();
    }, [id]);

    return (
        <div className="comment">
            <div className="grid wide">
                <div className="row">
                    <div className="col l-12">
                        {listComment.length !== 0 && (
                            <div className="comment-title">đánh giá sản phẩm</div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col l-12">
                        {listComment.length !== 0 && (
                            <div className="show-comment">
                                {listComment?.map((item) => (
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
                                                    <Star />
                                                    <Star />
                                                    <Star />
                                                    <Star />
                                                    <Star />
                                                </div>
                                                <div className="day-comment">
                                                    {item.createdAt}
                                                </div>
                                                <p className="text-comment">
                                                    {item.comment}
                                                </p>

                                                <div className="comment-img">
                                                    <img
                                                        src="https://cf.shopee.vn/file/ce03645345c4b23ecdf9e0de006931e5"
                                                        alt=""
                                                        className="img-content"
                                                    />
                                                    <img
                                                        src="https://cf.shopee.vn/file/ce03645345c4b23ecdf9e0de006931e5"
                                                        alt=""
                                                        className="img-content"
                                                    />
                                                    <img
                                                        src="https://cf.shopee.vn/file/ce03645345c4b23ecdf9e0de006931e5"
                                                        alt=""
                                                        className="img-content"
                                                    />
                                                    <img
                                                        src="https://cf.shopee.vn/file/ce03645345c4b23ecdf9e0de006931e5"
                                                        alt=""
                                                        className="img-content"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="comment-container">
                                    <div className="comment-pagi">
                                        <button
                                            className="comment-pagination-button"
                                            style={{ marginRight: '20px' }}
                                            // disabled={page <= 1}
                                            // onClick={() => handlePageChange(page - 1)}
                                        >
                                            <KeyboardArrowLeft
                                                style={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                }}
                                                fontSize="large"
                                            />
                                        </button>

                                        <button
                                            className="comment-pagination-button"
                                            // disabled={page >= totalPages}
                                            // onClick={() => handlePageChange(page + 1)}
                                        >
                                            <KeyboardArrowRight
                                                style={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                }}
                                                fontSize="large"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col l-12">
                        {user && (
                            <div className="not-buy">
                                <div className="rating-comment">Bình luận</div>
                                {/* <div className="block-rating"> */}
                                <div className="row">
                                    <div className="col l-8">
                                        <div className="input-comment">
                                            <textarea
                                                value={comment}
                                                onChange={handleChange}
                                                rows="3"
                                                className="input-box"
                                            />
                                        </div>
                                    </div>

                                    <div className="col l-4">
                                        <button
                                            onClick={handleClick}
                                            className="button-comment"
                                        >
                                            Gửi
                                        </button>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
