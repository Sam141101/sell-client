import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import styled from 'styled-components';
import { login, postCommnetUser } from '../../redux/apiCalls';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './evaluate.css';
import { KeyboardBackspace, Star } from '@mui/icons-material';
import app from '../../firebase';

const stars = [
    {
        id: 1,
        amount: 5,
        text: 'Tuyệt vời',
    },
    {
        id: 2,
        amount: 4,
        text: 'Hài lòng',
    },
    {
        id: 3,
        amount: 3,
        text: 'Bình thường',
    },
    {
        id: 4,
        amount: 2,
        text: 'Không hài lòng',
    },
    {
        id: 5,
        amount: 1,
        text: 'Tệ',
    },
];

const Evaluate = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const user = useSelector((state) => state.auth?.currentUser);
    const token = user.token;
    const [comment, setComment] = useState('');
    const [file, setFile] = useState(null);

    const [quantiStar, setQuantiStar] = useState(5);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);

        let fileSelected = document.getElementById('file').files;
        if (fileSelected.length > 0) {
            let fileToLoad = fileSelected[0];
            // setCurrentImg(fileToLoad);
            // console.log(fileToLoad);

            let fileReader = new FileReader();
            fileReader.onload = function (fileLoaderEvent) {
                let srcData = fileLoaderEvent.target.result;
                let newImg = document.getElementById('displayImg');
                newImg.src = srcData;
                // document
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    };

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleClickStar = (e) => {
        console.log(e);
    };

    const handleClick = (e) => {
        e.preventDefault();

        if (file === null) {
            const infoComment = {
                comment: comment,
                product_id: id,
                user_id: user._id,
            };

            postCommnetUser(token, user._id, infoComment);
            setComment('');
            navigate('/complete');
        } else {
            // add info
            const fileName = new Date().getTime() + file.name;

            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;

                        default:
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const infoComment = {
                            comment: comment,
                            product_id: id,
                            user_id: user._id,
                            img: downloadURL,
                        };

                        postCommnetUser(token, user._id, infoComment);
                        setComment('');
                        navigate('/complete');
                    });
                },
            );
        }
    };

    return (
        <>
            <div className="evaluate_main">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-12 c-12">
                            <div className="evaluate_header">
                                <Link to="/complete" className="evaluate_link">
                                    <KeyboardBackspace className="evaluate_link-icon" />
                                </Link>
                                <h1 className="evaluate_title">Đánh giá sản phẩm</h1>
                            </div>

                            <div className="info_product-evaluate">
                                <div className="info_product-title">
                                    Thông tin sản phẩm
                                </div>
                                <div className="info_product-evaluate-frame">
                                    <img
                                        src="https://cf.shopee.vn/file/ce03645345c4b23ecdf9e0de006931e5"
                                        alt="product-img"
                                        className="info_product-evaluate-img"
                                    />

                                    <div className="info_product-evaluate-text">
                                        <p className="info_product-evaluate-desc">
                                            Tên sản phẩm:
                                            <span>Áo outerity - màu đỏ AA</span>
                                        </p>
                                        <p className="info_product-evaluate-desc">
                                            Size: <span>M </span>
                                        </p>
                                        <p className="info_product-evaluate-desc">
                                            Số lượng: <span>x2 </span>
                                        </p>
                                        <p className="info_product-evaluate-desc">
                                            Kiểu: <span>Tee </span>
                                        </p>
                                        <p className="info_product-evaluate-desc">
                                            Tổng số tiền: <span>20000₫ </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="evaluate_container">
                                <div className="evaluate_wrapper">
                                    <h3 className="evaluate_product-title-content">
                                        Nhận xét
                                    </h3>
                                    <div className="row">
                                        <div className="col l-6">
                                            <div className="evaluate-selected">
                                                <div className="evaluate-star">
                                                    <div className="evaluate-quality">
                                                        Chất lượng sản phẩm
                                                    </div>

                                                    <div className="quality-stars">
                                                        <div
                                                            className="quality-stars-icon-block"
                                                            onClick={handleClickStar}
                                                        >
                                                            <Star
                                                                // onClick={handleClickStar}
                                                                className="quality-stars-icon"
                                                                // value="5"
                                                            />
                                                        </div>
                                                        {/* <Star
                                                            onClick={handleClickStar}
                                                            className="quality-stars-icon"
                                                            value="2"
                                                        />
                                                        <Star
                                                            onClick={handleClickStar}
                                                            className="quality-stars-icon"
                                                            value="3"
                                                        />
                                                        <Star
                                                            onClick={handleClickStar}
                                                            className="quality-stars-icon"
                                                            value="4"
                                                        />
                                                        <Star
                                                            onClick={handleClickStar}
                                                            className="quality-stars-icon"
                                                            value="5"
                                                        /> */}
                                                    </div>

                                                    <div
                                                        onClick={handleClickStar}
                                                        className="quality-equal-text"
                                                    >
                                                        Tuyệt vời
                                                    </div>
                                                </div>

                                                <div className="evaluate-upload-img">
                                                    <label htmlFor="file">
                                                        <div className="evaluate-quality-img-block">
                                                            <Star className="camera-img-icon" />
                                                            <div className="evaluate-upload-title">
                                                                Thêm hình ảnh
                                                            </div>

                                                            <input
                                                                className="user-profile-button-select-img"
                                                                type="file"
                                                                id="file"
                                                                onChange={
                                                                    handleChangeFile
                                                                }
                                                            />
                                                        </div>
                                                    </label>

                                                    <div className="img-selected-upload-more">
                                                        {
                                                            //  <div className="img-frame-block-upload">
                                                            <div
                                                                className="img-frame-block-upload"
                                                                style={
                                                                    file !== null
                                                                        ? {
                                                                              display:
                                                                                  'block',
                                                                          }
                                                                        : {
                                                                              display:
                                                                                  'none',
                                                                          }
                                                                }
                                                            >
                                                                <img
                                                                    src={
                                                                        file === null
                                                                            ? 'https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png'
                                                                            : `${file.name}`
                                                                    }
                                                                    alt="img-upload-user"
                                                                    className="image-upload-comment"
                                                                    id="displayImg"
                                                                />
                                                            </div>
                                                        }
                                                        {/* <div className="img-frame-block-upload">
                                                            <img
                                                                src={
                                                                    file === null
                                                                        ? 'https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png'
                                                                        : `${file.name}`
                                                                }
                                                                alt="img-upload-user"
                                                                className="image-upload-comment"
                                                                id="displayImg"
                                                            />
                                                        </div>

                                                        <div className="img-frame-block-upload">
                                                            <img
                                                                src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
                                                                alt="img-upload-user"
                                                                className="image-upload-comment"
                                                            />
                                                        </div>

                                                        <div className="img-frame-block-upload">
                                                            <img
                                                                src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
                                                                alt="img-upload-user"
                                                                className="image-upload-comment"
                                                            />
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col l-6">
                                            <div className="evaluate_form-input">
                                                <div className="evaluate_form">
                                                    <textarea
                                                        value={comment}
                                                        onChange={handleChange}
                                                        rows="6"
                                                        placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!"
                                                        className="input-box-evaluate"
                                                    />
                                                </div>

                                                <button
                                                    className="evaluate_button"
                                                    onClick={handleClick}
                                                >
                                                    GỬI
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row">
                                <div className="col l-6">
                                </div>

                                <div className="col l-6">
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Evaluate;
