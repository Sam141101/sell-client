import React, { useState } from 'react';
import './changePassword.css';
import { BASE_URL_API } from '../../requestMethods';

const ChangePassword = ({ user, axiosJWT, dispatch, navigate, setToast }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();

        let errorMessage = '';
        if (!currentPassword || !newPassword || !confirmPassword) {
            errorMessage = 'Vui lòng điền đầy đủ thông tin cần thiết.';
        } else if (newPassword.length < 6) {
            errorMessage = 'Mật khẩu không được ít hơn 6 kí tự.';
        } else if (newPassword !== confirmPassword) {
            errorMessage = 'Mật khẩu xác nhận không trùng khớp.';
        }

        if (errorMessage) {
            setToast({
                show: true,
                title: errorMessage,
                type: 'info',
                duration: 1200,
            });
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

            if (res.data.message === 'Update success') {
                errorMessage = 'Cập nhật thành công.';
            } else {
                errorMessage = 'Cập nhật thất bại.';
            }

            if (errorMessage) {
                setToast({
                    show: true,
                    title: errorMessage,
                    type: 'success',
                    duration: 1200,
                });
                return;
            }
        } catch (error) {
            setToast({
                show: true,
                title: 'Đổi mật khẩu thất bại',
                type: 'error',
                duration: 1200,
            });
            console.log(error);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col l-12 c-12">
                    <div className="change-password-container-right">
                        <div className="change-password-manage-user">
                            <h4 className="user-profile-file-title">Đổi mật khẩu</h4>
                        </div>

                        <div className="change-password-form">
                            <div className="change-password-form-left">
                                <div className="change-password-form-item df ai">
                                    <div className="change-password-form-key">
                                        Mật khẩu cũ
                                    </div>
                                    <div className="change-password-form-value">
                                        <input
                                            className="change-password-form-input df ai"
                                            type="text"
                                            onChange={(e) =>
                                                setCurrentPassword(e.target.value)
                                            }
                                            value={currentPassword}
                                        />
                                    </div>
                                </div>

                                <div className="change-password-form-item df ai">
                                    <div className="change-password-form-key">
                                        Mật khẩu mới
                                    </div>
                                    <div className="change-password-form-value">
                                        <input
                                            className="change-password-form-input df ai"
                                            type="text"
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            value={newPassword}
                                        />
                                    </div>
                                </div>

                                <div className="change-password-form-item df ai">
                                    <div className="change-password-form-key">
                                        Xác nhận mật khẩu
                                    </div>
                                    <div className="change-password-form-value">
                                        <input
                                            className="change-password-form-input df ai"
                                            type="text"
                                            onChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }
                                            value={confirmPassword}
                                        />
                                    </div>
                                </div>

                                <button
                                    className="change-password-form-save-info fz15 cs"
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
