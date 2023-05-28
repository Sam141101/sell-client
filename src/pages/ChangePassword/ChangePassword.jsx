import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './changePassword.css';
import { BASE_URL_API } from '../../requestMethods';
import { createAxiosInstance } from '../../useAxiosJWT';
import Notify from '../../components/Notify/Notify';

const ChangePassword = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const axiosJWT = createAxiosInstance(user, dispatch);

    const handleClick = async (e) => {
        e.preventDefault();

        // setShow(true);
        // setTimeout(() => {
        //     setShow(false);
        // }, 3000);

        let errorMessage = '';
        if (!currentPassword || !newPassword || !confirmPassword) {
            errorMessage = 'Vui lòng điền đầy đủ thông tin cần thiết.';
        }

        if (newPassword.length < 6) {
            errorMessage = 'Mật khẩu không được ít hơn 6 kí tự.';
        }

        if (newPassword !== confirmPassword) {
            errorMessage = 'Mật khẩu xác nhận không trùng khớp.';
        }

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        try {
            const url = BASE_URL_API + `auth/change-password/${user._id}`;
            const res = await axiosJWT.post(
                url,
                {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                },
                {
                    headers: { token: `Bearer ${user.token}` },
                },
            );
            // console.log(res.data.message);
            console.log('cập nhật mật khẩu thành công');
            // setMsg(res.data.message);
            // navigate('/login');
        } catch (error) {
            console.log('cập nhật mật khẩu thất bại');
            console.log(error);
        }
    };

    return (
        <>
            {/* {show && (
                <div className="change-password-wrapper">
                    <div className="change-password-noti">
                        <img
                            className="change-password-noti-img"
                            src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
                            alt=""
                        />

                        <p className="change-password-text-noti">Cập nhật hồ sơ</p>
                    </div>
                </div>
            )} */}

            <Notify show={show} title="Đổi mật khẩu thành công" />

            <div className="row">
                <div className="col l-12 c-12">
                    <div className="change-password-container-right">
                        <div className="change-password-manage-user">
                            <h4 className="user-profile-file-title">Đổi mật khẩu</h4>
                            {/* <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p> */}
                        </div>

                        <div className="change-password-form">
                            <div className="change-password-form-left">
                                <div className="change-password-form-item">
                                    <div className="change-password-form-key">
                                        Mật khẩu cũ
                                    </div>
                                    <div className="change-password-form-value">
                                        <input
                                            className="change-password-form-input"
                                            type="text"
                                            onChange={(e) =>
                                                setCurrentPassword(e.target.value)
                                            }
                                            value={currentPassword}
                                        />
                                    </div>
                                </div>

                                <div className="change-password-form-item">
                                    <div className="change-password-form-key">
                                        Mật khẩu mới
                                    </div>
                                    <div className="change-password-form-value">
                                        <input
                                            className="change-password-form-input"
                                            type="text"
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            value={newPassword}
                                        />
                                    </div>
                                </div>

                                <div className="change-password-form-item">
                                    <div className="change-password-form-key">
                                        Xác nhận mật khẩu
                                    </div>
                                    <div className="change-password-form-value">
                                        <input
                                            className="change-password-form-input"
                                            type="text"
                                            onChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }
                                            value={confirmPassword}
                                        />
                                    </div>
                                </div>

                                <button
                                    className="change-password-form-save-info"
                                    onClick={handleClick}
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
