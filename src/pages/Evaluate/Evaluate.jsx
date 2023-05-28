import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { postCommnetUser } from '../../redux/apiCalls';
import { Link, useLocation } from 'react-router-dom';
import './evaluate.css';
import { CameraAlt, Clear, KeyboardBackspace, Star } from '@mui/icons-material';
import app from '../../firebase';
import { Rating } from '@mui/material';
// import { BASE_URL_API } from '../../requestMethods';
// import { createAxiosInstance } from '../../useAxiosJWT';

const ratingDescriptions = {
    1: 'Tệ',
    2: 'Không hài lòng',
    3: 'Bình thường',
    4: 'Hài lòng',
    5: 'Tuyệt vời',
};

const Evaluate = ({ user, dispatch, navigate, axiosJWT, BASE_URL_API }) => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const order_id = location.pathname.split('/')[3];

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const user = useSelector((state) => state.auth?.currentUser);
    console.log(user);
    const token = user.token;
    const [comment, setComment] = useState('');
    const [product, setProduct] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileList, setFileList] = useState([]);

    const [rating, setRating] = useState(5);

    // const axiosJWT = createAxiosInstance(user, dispatch);

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    // const debounced = useDebounce(comment, 600);

    // const handleChange = (e) => {
    //     setComment(e.target.value);
    // };

    // useEffect(() => {
    //     setComment(debounced);
    // }, [debounced]);

    const handleClick = (e) => {
        e.preventDefault();

        if (fileList === null) {
            const infoComment = {
                comment: comment,
                product_id: id,
                // user_id: user._id,
                quantiStar: rating,
                order_id: order_id,
                size: product.size,
            };

            postCommnetUser(token, user._id, infoComment);
            setComment('');
            navigate('/complete');
        } else {
            //  lặp qua các phần tử của mảng để lấy ra các file
            let promises = [];

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const fileName = new Date().getTime() + file.name;
                const storage = getStorage(app);
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
                const promise = new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
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
                            console.log(error);
                            if (error.code !== 'storage/canceled') {
                                reject(error);
                            }
                        },
                        () => {
                            // Handle successful uploads on complete
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((downloadURL) => {
                                    resolve(downloadURL);
                                })
                                .catch((error) => {
                                    console.log(error);
                                    reject(error);
                                });
                        },
                    );
                });
                promises.push(promise);
            }

            Promise.all(promises)
                .then((downloadURLs) => {
                    console.log(downloadURLs); // in ra danh sách các đường dẫn URL đã được trả về
                    const infoComment = {
                        comment: comment,
                        product_id: id,
                        user_id: user._id,
                        img: downloadURLs,
                        quantiStar: rating,
                        order_id: order_id,
                        size: product.size,
                    };
                    console.log(infoComment);

                    postCommnetUser(token, user._id, infoComment, axiosJWT);
                    setComment('');
                    navigate('/complete');
                })
                .catch((error) => {
                    console.log(error);
                });
            // navigate('/complete');
        }
    };

    const handleChangeFile = async (event) => {
        const files = event.target.files;
        let images = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.readAsDataURL(file);

            // Promisify FileReader onload event
            const onLoad = () => {
                return new Promise((resolve, reject) => {
                    reader.onload = () => {
                        resolve(reader.result);
                    };
                    reader.onerror = reject;
                });
            };

            const src = await onLoad();
            images.push(src);
        }

        setSelectedFiles(selectedFiles.concat(images));
        setFileList((prevFileList) => [...prevFileList, ...[...event.target.files]]);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...selectedFiles];
        newImages.splice(index, 1);
        setSelectedFiles(newImages);

        const newStorage = [...fileList];
        newStorage.splice(index, 1);
        setFileList(newStorage);
    };

    useEffect(() => {
        const getInfoProduct = async () => {
            try {
                const res = await axiosJWT.get(
                    BASE_URL_API +
                        `orders/find-info-product/evaluate/${user._id}/${order_id}/${id}`,
                    // { infoFind: infoFind },
                    {
                        headers: { token: `Bearer ${token}` },
                    },
                );
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getInfoProduct();
    }, [user._id, token, order_id, id]);

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
                                        src={product.img}
                                        alt="product-img"
                                        className="info_product-evaluate-img"
                                    />

                                    <div className="info_product-evaluate-text">
                                        <p className="info_product-evaluate-desc">
                                            Tên sản phẩm:
                                            <span>{product.title}</span>
                                        </p>
                                        <p className="info_product-evaluate-desc">
                                            Size: <span>{product.size}</span>
                                        </p>
                                        <p className="info_product-evaluate-desc">
                                            Số lượng: <span>x{product.quantity}</span>
                                        </p>
                                        <p className="info_product-evaluate-desc">
                                            Kiểu: <span>{product.categories}</span>
                                        </p>
                                        <p className="info_product-evaluate-desc">
                                            Tổng số tiền: <span>{product.price}₫</span>
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
                                                        <Rating
                                                            name="product-rating"
                                                            value={rating}
                                                            precision={1}
                                                            onChange={handleRatingChange}
                                                            emptyIcon={
                                                                <Star fontSize="inherit" />
                                                            }
                                                            className="quality-rating-star"
                                                        />
                                                    </div>
                                                    <p className="quality-equal-text">
                                                        {ratingDescriptions[rating]}
                                                    </p>
                                                </div>

                                                <div className="evaluate-upload-img">
                                                    <label
                                                        className="evaluate-label"
                                                        htmlFor="file"
                                                    >
                                                        <div className="evaluate-quality-img-block">
                                                            <CameraAlt className="camera-img-icon" />
                                                            <div className="evaluate-upload-title">
                                                                Thêm hình ảnh
                                                            </div>

                                                            <input
                                                                className="user-profile-button-select-img"
                                                                type="file"
                                                                id="file"
                                                                multiple
                                                                onChange={
                                                                    handleChangeFile
                                                                }
                                                            />
                                                        </div>
                                                    </label>

                                                    <div className="img-selected-upload-more">
                                                        {selectedFiles.map((item, i) => (
                                                            <div
                                                                className="img-frame-block-upload"
                                                                key={i}
                                                            >
                                                                <img
                                                                    src={item}
                                                                    alt="img-upload-user"
                                                                    className="image-upload-comment"
                                                                />
                                                                <div
                                                                    className="image-delete-upload-comment"
                                                                    onClick={() =>
                                                                        handleRemoveImage(
                                                                            i,
                                                                        )
                                                                    }
                                                                >
                                                                    <Clear className="image-delete-upload-comment-icon" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col l-6">
                                            <div className="evaluate_form-input">
                                                <div className="evaluate_form">
                                                    <textarea
                                                        value={comment}
                                                        // onChange={handleChange}
                                                        onChange={(e) =>
                                                            setComment(e.target.value)
                                                        }
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Evaluate;

// ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AA…AAAAAAAAAAAAAAAAA8Eb43/ogdP4mfHbmAAAAAElFTkSuQmCC']
