import React, { useState } from 'react';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import app from '../../firebase';
import { updateUser } from '../../redux/apiCalls';
import './userProfile.css';
// import {} from '../../support';

const UserProfile = ({ user, axiosJWT, dispatch, navigate, setToast }) => {
    const token = user.token;
    const [imgUrl, setImgUrl] = useState(null);

    const [inputs, setInputs] = useState({
        gender: user.gender,
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value, token: user.token };
        });
    };

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

    console.log('inputs', inputs);

    const handleClick = async (e) => {
        e.preventDefault();

        let state;
        let errorMessage = '';
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (
            !inputs.fullname &&
            !inputs.gender &&
            !inputs.phone &&
            !inputs.email &&
            !file
        ) {
            errorMessage = 'Vui lòng điền đầy thông tin muốn thay đổi.';
        } else if (inputs.email && !regex.test(inputs.email)) {
            errorMessage = 'Email không hợp lệ!';
        }

        setToast({
            show: true,
            title: errorMessage,
            type: 'info',
            duration: 1200,
        });

        if (file === null) {
            const update = { ...inputs, token };
            const result = await updateUser(
                user.token,
                dispatch,
                user._id,
                update,
                axiosJWT,
            );
            if (result === 'update-user-succes') {
                errorMessage = 'Cập nhật thành công.';
                state = 'success';
            } else {
                errorMessage = 'Cập nhật thất bại.';
                state = 'error';
            }

            setToast({
                show: true,
                title: errorMessage,
                type: state,
                duration: 1200,
            });
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

                    if (result === 'update-user-succes') {
                        errorMessage = 'Cập nhật thành công.';
                        state = 'success';
                    } else {
                        errorMessage = 'Cập nhật thất bại.';
                        state = 'error';
                    }

                    setToast({
                        show: true,
                        title: errorMessage,
                        type: state,
                        duration: 1200,
                    });
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
                                <div className="user-profile-form-key">Họ và tên</div>
                                <div className="user-profile-form-value">
                                    <input
                                        className="user-profile-form-input"
                                        name="fullname"
                                        type="text"
                                        placeholder={user.fullname}
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
                                        // onChange={handleChange}
                                    >
                                        <input
                                            className="user-profile-form-value-select"
                                            type="radio"
                                            name="gender"
                                            id="male"
                                            value="Nam"
                                            onChange={handleChange}
                                            checked={inputs.gender === 'Nam'}
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
                                            checked={inputs.gender === 'Nữ'}
                                            onChange={handleChange}
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
                                            checked={inputs.gender === 'Khác'}
                                            onChange={handleChange}
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
