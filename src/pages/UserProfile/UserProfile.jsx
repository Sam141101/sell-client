import React, { useState, useEffect } from 'react';
import { Close, Create, Person, Search, ShoppingCart } from '@mui/icons-material';
import styled from 'styled-components';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Announcement from '../../components/Announcement/Announcement';
import Navbar from '../../components/NavBar/NavBar';
import app from '../../firebase';
import { updateUser } from '../../redux/apiCalls';
import './userProfile.css';
// import app from '../firebase'

const UserProfile = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const token = user.token;
    const [show, setShow] = useState(false);
    const location = useLocation();

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [currentImg, setCurrentImg] = useState(user.img);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value, token: user.token };
        });
    };

    console.log(inputs);

    // const sendData = async (update) => {
    //     try {
    //         const res = await axios.put(
    //             `http://localhost:5000/api/users/${user._id}`,
    //             update,
    //             {
    //                 headers: { token: `Bearer ${user.token}` },
    //             },
    //         );
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    console.log(file);

    // const handleChangeFile = (e) => {
    //     setFile(e.target.files[0]);

    //     let fileSelected = document.getElementById('file').files;
    //     if (fileSelected.length > 0) {
    //         let fileToLoad = fileSelected[0];
    //         // setCurrentImg(fileToLoad);
    //         // console.log(fileToLoad);

    //         let fileReader = new FileReader();
    //         fileReader.onload = function (fileLoaderEvent) {
    //             let srcData = fileLoaderEvent.target.result;
    //             let newImg = document.getElementById('displayImg');
    //             newImg.src = srcData;
    //             // document
    //         };
    //         fileReader.readAsDataURL(fileToLoad);
    //     }
    // };

    const handleClick = (e) => {
        e.preventDefault();

        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);

        if (file === null) {
            const update = { ...inputs, token };
            updateUser(user.token, dispatch, user._id, update);
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
                        const update = { ...inputs, img: downloadURL, token };
                        console.log(update);
                        //   addProduct(product, dispatch);
                        updateUser(user.token, dispatch, user._id, update);
                        // sendData(update);
                    });
                },
            );
        }
    };

    // useEffect(() => {}, []);

    return (
        // <div style={{ backgroundColor: '#f5f5f5', height: '100vh' }}>
        <div className="user-profile-mobile-frame">
            {show && (
                <div className="user-profile-wrapper">
                    <div className="user-profile-noti">
                        <img
                            className="user-profile-noti-img"
                            src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
                            alt=""
                        />

                        <p className="user-profile-text-noti">Cập nhật hồ sơ</p>
                    </div>
                </div>
            )}

            <Navbar />

            <div className="block-profile-form">
                <div className="block-user-profile-mobile">
                    <div className="grid wide">
                        <div className="row">
                            <div className="col l-3 c-12">
                                <div className="user-profile-container-left">
                                    <div className="user-profile-info-user">
                                        <img
                                            className="user-profile-img-user"
                                            src={
                                                user.img ||
                                                'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
                                            }
                                            alt=""
                                        />
                                        <div className="user-profile-change-info-user">
                                            <h4 className="user-profile-title-user">
                                                {user.username}
                                            </h4>
                                            <span className="user-profile-change-info">
                                                <Create
                                                    style={{
                                                        fontSize: '18px',
                                                        marginRight: '5px',
                                                    }}
                                                />
                                                Sửa hồ sơ
                                            </span>
                                        </div>
                                    </div>

                                    <div className="user-profile-more-item">
                                        <div className="user-profile-item">
                                            <img
                                                className="user-profile-img-item"
                                                src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
                                                alt=""
                                            />
                                            Tài khoản của tôi
                                        </div>
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            to="/ttt"
                                        >
                                            <div className="user-profile-item">
                                                <img
                                                    className="user-profile-img-item"
                                                    src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
                                                    alt=""
                                                />
                                                Đơn mua
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col l-9 c-12">
                                <div className="user-profile-container-right">
                                    <div className="user-profile-manage-user">
                                        <h4 className="user-profile-file-title">
                                            Hồ Sơ Của Tôi
                                        </h4>
                                        <p>
                                            Quản lý thông tin hồ sơ để bảo mật tài khoản
                                        </p>
                                    </div>

                                    <div className="user-profile-form">
                                        <div className="row">
                                            <div className="col l-9 c-12">
                                                <div className="user-profile-form-left">
                                                    <div className="user-profile-form-item">
                                                        <div className="user-profile-form-key">
                                                            Tên đăng nhập
                                                        </div>
                                                        <div className="user-profile-form-value">
                                                            <input
                                                                className="user-profile-form-input"
                                                                name="username"
                                                                type="text"
                                                                placeholder={
                                                                    user.username
                                                                }
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="user-profile-form-item">
                                                        <div className="user-profile-form-key">
                                                            Email
                                                        </div>
                                                        <div className="user-profile-form-value">
                                                            <input
                                                                className="user-profile-form-input"
                                                                name="email"
                                                                placeholder={user.email}
                                                                type="text"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="user-profile-form-item">
                                                        <div className="user-profile-form-key">
                                                            Số điện thoại
                                                        </div>
                                                        <div className="user-profile-form-value">
                                                            <input
                                                                className="user-profile-form-input"
                                                                name="phone"
                                                                placeholder={
                                                                    user?.phone || ''
                                                                }
                                                                type="text"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="user-profile-form-item">
                                                        <div className="user-profile-form-key">
                                                            Địa chỉ
                                                        </div>
                                                        <div className="user-profile-form-value">
                                                            <input
                                                                className="user-profile-form-input"
                                                                name="address"
                                                                placeholder={
                                                                    user?.address || ''
                                                                }
                                                                type="text"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="user-profile-form-item">
                                                        <div className="user-profile-form-key">
                                                            Giới tính
                                                        </div>
                                                        <div className="user-profile-form-value">
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    marginLeft: '5px',
                                                                }}
                                                                onChange={handleChange}
                                                            >
                                                                <input
                                                                    className="user-profile-form-value-select"
                                                                    type="radio"
                                                                    name="gender"
                                                                    id="male"
                                                                    value="Nam"
                                                                />
                                                                <label
                                                                    className="user-profile-form-value-label"
                                                                    htmlFor="male"
                                                                >
                                                                    Nam
                                                                </label>
                                                                <input
                                                                    className="user-profile-form-value-select"
                                                                    type="radio"
                                                                    name="gender"
                                                                    id="female"
                                                                    value="Nữ"
                                                                />
                                                                <label
                                                                    className="user-profile-form-value-label"
                                                                    htmlFor="female"
                                                                >
                                                                    Nữ
                                                                </label>
                                                                <input
                                                                    className="user-profile-form-value-select"
                                                                    type="radio"
                                                                    name="gender"
                                                                    id="other"
                                                                    value="Khác"
                                                                />
                                                                <label
                                                                    className="user-profile-form-value-label"
                                                                    htmlFor="other"
                                                                >
                                                                    Khác
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        className="user-profile-form-save-info hide-on-mobile"
                                                        onClick={handleClick}
                                                    >
                                                        Lưu
                                                    </button>
                                                    <div className="user-profile-drum"></div>
                                                </div>
                                            </div>

                                            <div className="col l-3 c-12">
                                                <div className="user-profile-change-img">
                                                    Thay đổi hình ảnh
                                                </div>
                                                <div className="user-profile-right">
                                                    <label htmlFor="file">
                                                        <img
                                                            className="user-profile-img-user-current"
                                                            src={
                                                                // currentImg ||
                                                                user.img ||
                                                                'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
                                                            }
                                                            alt=""
                                                            id="displayImg"
                                                        />
                                                    </label>

                                                    <label htmlFor="file">
                                                        <div className="user-profile-btn-select">
                                                            Chọn ảnh
                                                        </div>
                                                    </label>

                                                    <input
                                                        className="user-profile-button-select-img"
                                                        type="file"
                                                        id="file"
                                                        onChange={(e) =>
                                                            setFile(e.target.files[0])
                                                        }

                                                        // onChange={handleChangeFile}
                                                    />

                                                    <div style={{ marginTop: '12px' }}>
                                                        <div className="user-profile-note">
                                                            Dụng lượng file tối đa 1 MB
                                                        </div>
                                                        <div className="user-profile-note">
                                                            Định dạng:.JPEG, .PNG
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="user-profile-form-save-info-mobile-button">
                                        <button
                                            className="user-profile-form-save-info-mobile"
                                            onClick={handleClick}
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
