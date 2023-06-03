import React, { useState } from 'react';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import app from '../../firebase';
import { updateUser } from '../../redux/apiCalls';
import './userProfile.css';

const UserProfile = ({ user, axiosJWT, dispatch, navigate }) => {
    const token = user.token;
    // const [show, setShow] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value, token: user.token };
        });
    };

    // let img = document.getElementById('displayImg');

    // const handleChangeFile = (e) => {
    //     setFile(e.target.files[0]);

    //     if (e.target.files[0]) {
    //         img.src = URL.createObjectURL(e.target.files[0]);
    //     }
    // };

    const handleChangeFile = (e) => {
        const selectedFile = e.target.files[0];
        // Tạo ra một instance của đối tượng FileReader
        const reader = new FileReader();

        reader.addEventListener(
            'load',
            () => {
                // Đọc dữ liệu URL base64 được tạo bởi FileReader
                setImgUrl(reader.result);
            },
            false,
        );

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();

        if (file === null) {
            const update = { ...inputs, token };
            updateUser(user.token, dispatch, user._id, update, axiosJWT);
        } else {
            // add info
            const fileName = new Date().getTime() + file.name;

            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, file);

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
                    // Handle unsuccessful uploads
                },
                //          () => {
                //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                //                 const update = { ...inputs, img: downloadURL, token };

                //                 const result = await updateUser(user.token, dispatch, user._id, update, axiosJWT);

                // let errorMessage = '';
                // if (result === "update-user-succes") {
                //     errorMessage = 'Loại bỏ thành công sản phẩm.';
                // } else {
                //     errorMessage = 'Loại bỏ không thành công sản phẩm.';
                // }

                // if (errorMessage) {
                //     setTimeout(() => {
                //         alert(errorMessage);
                //     }, 800); // Sau 1 giây mới hiển thị thông báo
                //     return;
                // }
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const update = { ...inputs, img: downloadURL, token };
                    console.log(update);
                    const result = await updateUser(
                        user.token,
                        dispatch,
                        user._id,
                        update,
                        axiosJWT,
                    );

                    let errorMessage = '';
                    if (result === 'update-user-succes') {
                        errorMessage = 'Cập nhật thành công.';
                    } else {
                        errorMessage = 'Cập nhật thất bại.';
                    }

                    if (errorMessage) {
                        setTimeout(() => {
                            alert(errorMessage);
                        }, 800); // Sau 1 giây mới hiển thị thông báo
                        return;
                    }

                    // });
                },
            );
        }
    };

    return (
        <>
            <div className="user-profile-manage-user">
                <h4 className="user-profile-file-title">Hồ Sơ Của Tôi</h4>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>

            <div className="user-profile-form">
                <div className="row">
                    <div className="col l-9 c-12">
                        <div className="user-profile-form-left">
                            <div className="user-profile-form-item">
                                <div className="user-profile-form-key">Tên đăng nhập</div>
                                <div className="user-profile-form-value">
                                    <input
                                        className="user-profile-form-input"
                                        name="username"
                                        type="text"
                                        placeholder={user.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="user-profile-form-item">
                                <div className="user-profile-form-key">Email</div>
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
                                <div className="user-profile-form-key">Số điện thoại</div>
                                <div className="user-profile-form-value">
                                    <input
                                        className="user-profile-form-input"
                                        name="phone"
                                        placeholder={user?.phone || ''}
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="user-profile-form-item">
                                <div className="user-profile-form-key">Giới tính</div>
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
                        <div className="user-profile-change-img">Thay đổi hình ảnh</div>
                        <div className="user-profile-right">
                            {/* <label htmlFor="file">
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
                            </label> */}

                            <label htmlFor="file">
                                <img
                                    className="user-profile-img-user-current"
                                    src={
                                        imgUrl ||
                                        user.img ||
                                        'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
                                    }
                                    alt=""
                                    id="displayImg"
                                />
                            </label>

                            <label htmlFor="file">
                                <div className="user-profile-btn-select">Chọn ảnh</div>
                            </label>

                            {/* <input
                                className="user-profile-button-select-img"
                                type="file"
                                id="file"
                                // onChange={(e) => setFile(e.target.files[0])}

                                onChange={handleChangeFile}
                            /> */}

                            <input
                                className="user-profile-button-select-img"
                                type="file"
                                id="file"
                                onChange={handleChangeFile}
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
        </>
    );
};

export default UserProfile;
