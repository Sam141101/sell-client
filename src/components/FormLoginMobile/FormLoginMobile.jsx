import { Link } from 'react-router-dom';

const FormLoginMobile = ({
    inputRef1,
    changeInputUserName,
    changeInputPassword,
    inputRef2,
    isFetching,
    handleClickLogin,
}) => {
    return (
        <>
            <div className="nav-header-login-mobile">
                <h2 className="nav-header-login-mobile-title fw500 tx-tran">
                    đăng nhập tài khoản
                </h2>
                <p className="nav-header-login-mobile-desc">
                    Nhập email và mật khẩu của bạn
                </p>
            </div>

            <div className="form-login-mobile">
                <form action="" className="nav-form-mobile-login">
                    <div className="nav-form-block">
                        <input
                            type="text"
                            className="nav-login-tk"
                            placeholder="Email"
                            ref={inputRef1}
                            onChange={(e) => changeInputUserName(e)}
                        />
                    </div>

                    <div className="nav-form-block">
                        <input
                            type="password"
                            className="nav-login-mk"
                            placeholder="Mật khẩu"
                            ref={inputRef2}
                            onChange={(e) => changeInputPassword(e)}
                        />
                    </div>

                    <div className="nav-login-desc-police">
                        This site is protected by reCAPTCHA and the Google
                        <Link to="" className="nav-login-link">
                            Privacy Policy
                        </Link>
                        and
                        <Link className="nav-login-link">Terms of Service</Link>
                        apply
                    </div>

                    <button
                        className="nav-btn-login-mobile w100pt out tx-tran dib"
                        onClick={handleClickLogin}
                        disabled={isFetching}
                    >
                        đăng nhập
                    </button>

                    <div className="nav-more-info-mobile">
                        <p className="nav-more-info-mobile-text">
                            Khách hàng mới?
                            <Link
                                to={'/confirm/register'}
                                className="nav-more-info-mobile"
                            >
                                Tạo tài khoản
                            </Link>
                        </p>

                        <p className="nav-more-info-mobile-text">
                            Quên mật khẩu?
                            <Link
                                to={'/forgot-password'}
                                className="nav-more-info-mobile"
                            >
                                Khôi phục mật khẩu
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormLoginMobile;
