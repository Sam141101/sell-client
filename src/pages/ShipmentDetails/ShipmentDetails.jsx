import { useDispatch, useSelector } from 'react-redux';
import { KeyboardArrowDown, KeyboardArrowUp, ShoppingCart } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL_API } from '../../requestMethods';
import './shipmentDetails.css';
import { addTemporary } from '../../redux/temporaryRedux';
import { createAxiosInstance } from '../../useAxiosJWT';
import FormInputAddress from '../../components/FormInputAddress/FormInputAddress';
import Notify from '../../components/Notify/Notify';
import { formatMoney } from '../../support';
import { resetProduct } from '../../redux/cartRedux';
import { logout } from '../../redux/apiCalls';
import { getAddress } from '../../redux/addressRedux';

const ShipmentDetails = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const cart = useSelector((state) => state.cart?.products);
    let getUseraddress = useSelector((state) => state.address?.currentAddress);
    console.log('cart', cart);
    const quantiProduct = useSelector((state) => state.cart?.quantity);
    const total = useSelector((state) => state?.cart);
    const userId = user._id;
    const totalPrice = total.total;
    let errorMessage = '';
    const [inputs, setInputs] = useState({
        fullname: user.fullname,
        phone: user.phone,
    });
    const [infoCoupon, setInfoCoupon] = useState({});
    const [show, setShow] = useState(false);
    const [servicePack, setServicePack] = useState({});
    const [toggleInfo, setToggleInfo] = useState(true);
    const [codeCoupon, setCodeCoupon] = useState('');
    const [notify, setNotify] = useState('');
    const [totalPriceProduct, setTotalPriceProduct] = useState(totalPrice);
    const [totalPriceDelivery, setTotalPriceDelivery] = useState(0);
    const [couponUpdated, setCouponUpdated] = useState(false);
    // const [initialTotalPriceProduct, setInitialTotalPriceProduct] = useState(totalPrice);
    const [initialTotalPriceDelivery, setInitialTotalPriceDelivery] =
        useState(totalPriceDelivery); /// 30000 ------> total delivery

    console.log('getUseraddress', getUseraddress);
    const [address, setAddress] = useState({
        address: '',
        provinceId: 0,
        districtId: 0,
        wardId: 0,

        provinceName: '',
        districtName: '',
        wardName: '',
    });

    const [confirmAddress, setConfirmAddress] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosJWT = createAxiosInstance(user, dispatch);

    const handleClickToggle = () => {
        setToggleInfo(!toggleInfo);
        const showList = document.querySelector('.ship_ment-details-show-mobile');
        showList.classList.toggle('show-list');
    };

    const handleClickLogout = (event) => {
        event.preventDefault();
        logout(dispatch, user._id, user.token, axiosJWT, navigate);
        resetProduct();
    };

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleClickSave = async () => {
        try {
            let errorMessage = '';
            if (
                !inputs.address ||
                !inputs.provinceId ||
                !inputs.districtId ||
                !inputs.wardId
            ) {
                errorMessage = 'Vui lòng điền các trường địa chỉ.';
            }
            if (errorMessage) {
                alert(errorMessage);
                return;
            }
            let res;
            if (confirmAddress === 'null') {
                res = await axiosJWT.post(BASE_URL_API + 'address/' + userId, address, {
                    headers: { token: `Bearer ${user.token}` },
                });
            } else {
                res = await axiosJWT.put(BASE_URL_API + 'address/' + userId, address, {
                    headers: { token: `Bearer ${user.token}` },
                });
            }
            dispatch(getAddress(res.data.address));

            if (res.data.message === 'Cập nhật thành công địa chỉ!') {
                errorMessage = 'Cập nhật thành công địa chỉ!';
            } else if (res.data.message === 'Thêm thành công địa chỉ!') {
                errorMessage = 'Thêm thành công địa chỉ!';
            } else {
                errorMessage = 'Cập nhật địa chỉ thất bại!';
            }
            if (errorMessage) {
                setTimeout(() => {
                    alert(errorMessage);
                }, 800); // Sau 1 giây mới hiển thị thông báo
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleFinishClick = async () => {
        try {
            if (!inputs.fullname) {
                errorMessage = 'Vui lòng điền tên người nhận.';
            } else if (!inputs.phone) {
                errorMessage = 'Điền số điện thoại người nhận.';
            } else if (!inputs.service_id) {
                errorMessage = 'Chọn phương thức vận chuyển.';
            } else if (!inputs.method) {
                errorMessage = 'Chọn phương thức thanh toán.';
            }
            if (errorMessage) {
                alert(errorMessage);
                return;
            }
            let infoOrder;
            if (notify === 'Át mã giảm giá thành công.') {
                infoOrder = {
                    inputs: inputs,
                    cart: cart,
                    userId: userId,
                    totalPrice: totalPriceProduct,
                    codeCoupon: codeCoupon,
                    totalPriceDelivery: totalPriceDelivery,
                };
            } else if (notify === '') {
                infoOrder = {
                    inputs: inputs,
                    cart: cart,
                    userId: userId,
                    totalPriceDelivery: totalPriceDelivery,
                    totalPrice: totalPriceProduct,
                };
                console.log('Không dùng phiếu giảm giá');
            } else {
                console.log('không thể dùng mã giảm giá');
                return;
            }
            console.log('infoOrder', infoOrder);

            const res = await axiosJWT.post(
                BASE_URL_API + `${inputs.method}/pay/`,
                infoOrder,
                {
                    headers: { token: `Bearer ${user.token}` },
                },
            );
            console.log(res.data);

            if (inputs.method === 'paypal') {
                dispatch(addTemporary(res.data));
                window.location.href = `${res.data.link}`;
            } else if (res.data === 'success') {
                setShow(true);
                setTimeout(() => {
                    navigate('/wait-for-confirmation');
                }, 5000);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleChangeInput = (e) => {
        setCodeCoupon(e.target.value);
        setNotify('');
    };

    const handleUseVoucher = async (e) => {
        e.preventDefault();
        try {
            const checkAddress = {
                inputs: inputs.service_id,
            };

            const res = await axiosJWT.post(
                BASE_URL_API +
                    `discounts/use-coupon/${user._id}/${codeCoupon}/${totalPrice}`,
                checkAddress,
                {
                    headers: { token: `Bearer ${user.token}` },
                },
            );
            setNotify(res.data.message);
            setInfoCoupon(res.data.infoCoupon);
            setCouponUpdated(true);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (notify === 'Át mã giảm giá thành công.' && couponUpdated) {
            let newTotalPrice;
            if (infoCoupon.descCoupon === 'Mã giảm giá') {
                if (infoCoupon.discount_type === 'percentage') {
                    newTotalPrice =
                        totalPriceProduct * (1 - infoCoupon.discount_amount / 100);
                } else {
                    newTotalPrice = totalPriceProduct - infoCoupon.discount_amount;
                }
                setTotalPriceProduct(newTotalPrice);
            } else {
                if (infoCoupon.discount_type === 'percentage') {
                    newTotalPrice =
                        totalPriceDelivery * (1 - infoCoupon.discount_amount / 100);
                } else {
                    newTotalPrice = totalPriceDelivery - infoCoupon.discount_amount;
                    if (newTotalPrice < 0) {
                        newTotalPrice = 0;
                    }
                }
                setTotalPriceDelivery(newTotalPrice);
            }
            setCouponUpdated(false);
        } else if (notify === '' || notify !== 'Át mã giảm giá thành công.') {
            // } else if (notify !== 'Át mã giảm giá thành công.') {
            // Nếu không sử dụng mã giảm giá hoặc sử dụng mã thất bại, trả về giá trị ban đầu của sản phẩm
            // setTotalPriceProduct(initialTotalPriceProduct);totalPrice
            setTotalPriceProduct(totalPrice);
            setTotalPriceDelivery(initialTotalPriceDelivery);
        }
    }, [notify, infoCoupon, couponUpdated]);

    useEffect(() => {
        if (getUseraddress) {
            setAddress({
                address: getUseraddress?.address,
                provinceId: getUseraddress?.province_id,
                districtId: getUseraddress?.district_id,
                wardId: getUseraddress?.ward_id,

                provinceName: getUseraddress?.province,
                districtName: getUseraddress?.district,
                wardName: getUseraddress?.ward,
            });
        } else {
            console.log('khoong phai goi api adddresss');
            const getAddress = async () => {
                try {
                    const res = await axiosJWT.get(BASE_URL_API + 'address/' + userId, {
                        headers: { token: `Bearer ${user.token}` },
                    });
                    if (res.data !== null) {
                        setAddress({
                            address: res.data.address,
                            provinceId: res.data.province_id,
                            districtId: res.data.district_id,
                            wardId: res.data.ward_id,

                            provinceName: res.data.province,
                            districtName: res.data.district,
                            wardName: res.data.ward,
                        });
                    } else {
                        setConfirmAddress(`${res.data}`);
                    }
                } catch (err) {
                    console.log(err);
                }
            };
            getAddress();
        }
    }, [getUseraddress, userId, user.token]);

    // Lấy ra các phương thức vận chuyển
    useEffect(() => {
        console.log('lấy ra phương thức chuyển lần đầu tiên');
        const getService = async () => {
            try {
                const res = await axiosJWT.get(
                    BASE_URL_API + 'shippings/service-pack/' + userId,
                    {
                        headers: { token: `Bearer ${user.token}` },
                    },
                );
                console.log('lấy ra phương thức chuyển lần 2');
                setServicePack(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getService();
    }, [user.token, userId, confirmAddress]);

    // Lấy ra giá vận chuyển
    useEffect(() => {
        const getServiceCharge = async () => {
            try {
                const res = await axiosJWT.post(
                    BASE_URL_API + 'shippings/service-charge/' + userId,
                    {
                        service_id: inputs.service_id,
                        to_district_id: address.districtId,
                        to_ward_code: address.wardId,
                        quantiProduct: quantiProduct,
                    },
                    {
                        headers: { token: `Bearer ${user.token}` },
                    },
                );

                console.log('res.data', res.data);
                console.log('lấy ra giá vạn chuyển lần 2');
                if (res.data !== 0) {
                    setTotalPriceDelivery(res.data.data.total);
                    setInitialTotalPriceDelivery(res.data.data.total);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getServiceCharge();
        // }
    }, [
        user.token,
        userId,
        inputs.service_id,
        confirmAddress,
        address.districtId,
        address.wardId,
    ]);

    return (
        <div className="ship_ment-details-container">
            <>
                <Notify show={show} title="Đặt hàng thành công" />
            </>

            <div className="grid wide">
                <div className="row">
                    <div className="col l-12 c-12">
                        <Link to="/" className="ship_ment-details-container-left-link">
                            <div className="ship_ment-details-title fw500">Outerity</div>
                        </Link>
                    </div>
                </div>
                <div className="row mobile-famre">
                    <div className="col l-6 c-12">
                        <div className="ship_ment-details-container-left">
                            <div className="ship_ment-details-text-title">
                                Thông tin giao hàng
                            </div>
                            <div>
                                <div className="ship_ment-details-user df ai">
                                    <img
                                        className="ship_ment-details-user-img"
                                        src={user.img}
                                        alt=""
                                    />
                                    <div>
                                        <div className="ship_ment-details-user-text fz15">
                                            {user.username} ({user.email})
                                        </div>
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            onClick={(e) => handleClickLogout(e)}
                                        >
                                            <div className="ship_ment-details-logout-user fw500">
                                                Đăng xuất
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div className="ship_ment-details-add-info">
                                    <input
                                        className="ship_ment-details-info-user out fz15"
                                        type="text"
                                        name="fullname"
                                        onChange={handleChange}
                                        placeholder="Họ và tên"
                                        value={inputs.fullname}
                                    />
                                    <input
                                        className="ship_ment-details-info-user out fz15"
                                        type="text"
                                        name="phone"
                                        onChange={handleChange}
                                        placeholder="Số điện thoại"
                                        value={inputs.phone}
                                    />

                                    <FormInputAddress
                                        inputs={address}
                                        setInputs={setAddress}
                                        handleClick={handleClickSave}
                                        notify={confirmAddress}
                                    />
                                </div>

                                <div
                                    className="ship_ment-details-payment-method fz15"
                                    style={{
                                        display: `${
                                            Object.keys(servicePack).length !== 0
                                                ? 'block'
                                                : 'none'
                                        }`,
                                    }}
                                >
                                    <div className="ship_ment-details-form-key fw500">
                                        Phương thức vận chuyển
                                    </div>
                                    <div className="ship_ment-details-form-value df flex-direction">
                                        {servicePack?.listService &&
                                            servicePack.listService.data.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="ship_ment-details-block-payment df ai"
                                                        onChange={handleChange}
                                                    >
                                                        <input
                                                            className="ship_ment-details-form-value-select cs"
                                                            type="radio"
                                                            name="service_id"
                                                            id={item.service_id.toString()}
                                                            value={item.service_id}
                                                        />
                                                        <label
                                                            htmlFor={item.service_id.toString()}
                                                        >
                                                            {item.short_name}
                                                        </label>
                                                    </div>
                                                ),
                                            )}
                                    </div>
                                </div>

                                <div className="ship_ment-details-payment-method fz15">
                                    <div className="ship_ment-details-form-key fw500">
                                        Thanh toán
                                    </div>
                                    <div className="ship_ment-details-form-value df flex-direction">
                                        <div
                                            className="ship_ment-details-block-payment df ai"
                                            onChange={handleChange}
                                        >
                                            <input
                                                className="ship_ment-details-form-value-select cs"
                                                type="radio"
                                                name="method"
                                                id="receive"
                                                value="receive"
                                            />
                                            <label htmlFor="receive">
                                                Thanh toán khi nhận hàng
                                            </label>
                                        </div>

                                        <div
                                            className="ship_ment-details-block-payment df ai"
                                            onChange={handleChange}
                                        >
                                            <input
                                                className="ship_ment-details-form-value-select cs"
                                                type="radio"
                                                name="method"
                                                id="paypal"
                                                value="paypal"
                                            />
                                            <label
                                                htmlFor="paypal"
                                                className="ship_ment-details-payment-name"
                                            >
                                                <img
                                                    className="ship_ment-details-payment-paypal df"
                                                    src="https://canhme.com/wp-content/uploads/2016/01/Paypal.png"
                                                    alt=""
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="ship_ment-details-block-button df ai fz15">
                                    <Link style={{ textDecoration: 'none' }} to="/cart">
                                        <div className="ship_ment-details-cart fw500">
                                            Giỏ hàng
                                        </div>
                                    </Link>
                                    <button
                                        className="ship_ment-details-finished dib fw500 fz15 cs"
                                        onClick={handleFinishClick}
                                    >
                                        Hoàn tất đơn hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col l-6 c-12">
                        <div className="mobile-in-block">
                            <div className="ship_ment-details-title-mobile cs df ai">
                                <div
                                    className="ship_ment-details-title-mobile-left df ai"
                                    onClick={handleClickToggle}
                                >
                                    <ShoppingCart className="ship_ment-details-title-mobile-icon" />
                                    {toggleInfo ? (
                                        <p className="ship_ment-details-title-mobile-info df ai fw500">
                                            Hiển thị thông tin đơn hàng
                                            <KeyboardArrowDown className="ship_ment-details-info-mobile-icon" />
                                        </p>
                                    ) : (
                                        <p className="ship_ment-details-title-mobile-info df ai fw500">
                                            Ẩn thông tin đơn hàng
                                            <KeyboardArrowUp className="ship_ment-details-info-mobile-icon" />
                                        </p>
                                    )}
                                </div>

                                <div className="ship_ment-details-title-mobile-right">
                                    {formatMoney(totalPriceProduct)}₫
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l-1 c-0 custom-line"></div>

                            <div className="col l-11 c-12">
                                <div className="ship_ment-details-show-mobile">
                                    <div className="ship_ment-details-container-right">
                                        <div className="ship_ment-details-product-list">
                                            {cart?.map((item, index) => (
                                                <div
                                                    className="ship_ment-details-details-product df ai"
                                                    key={index}
                                                    quanti={item.quantity}
                                                >
                                                    <div className="df ai">
                                                        <img
                                                            className="ship_ment-details-img"
                                                            src={item.product_id.img}
                                                            alt=""
                                                        />
                                                        <div>
                                                            <div className="fw500">
                                                                {item.product_id.title}
                                                            </div>
                                                            <div className="ship_ment-details-size">
                                                                {item.size}
                                                            </div>
                                                            <div className="ship_ment-details-quanti df bd50pt ai jc">
                                                                {item.quantity}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>{formatMoney(item.price)}₫</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="ship_ment-details-voucher df flex-direction">
                                            <div className="ship_ment-details-voucher-wrapper df ai">
                                                <div className="ship_ment-details-voucher-block">
                                                    <input
                                                        type="text"
                                                        className="ship_ment-details-voucher-input"
                                                        placeholder="Mã giảm giá"
                                                        onChange={(e) =>
                                                            handleChangeInput(e)
                                                        }
                                                    />
                                                </div>

                                                <button
                                                    style={
                                                        codeCoupon !== ''
                                                            ? {
                                                                  backgroundColor:
                                                                      '#338dbc',
                                                                  color: 'white',
                                                              }
                                                            : {}
                                                    }
                                                    className={`ship_ment-details-use-voucher cs ${
                                                        notify ===
                                                        'Át mã giảm giá thành công.'
                                                            ? 'disabled'
                                                            : ''
                                                    }`}
                                                    onClick={handleUseVoucher}
                                                >
                                                    Sử dụng
                                                </button>
                                            </div>

                                            {notify && (
                                                <p className="notify-voucher-line fw500">
                                                    {notify}
                                                </p>
                                            )}
                                        </div>

                                        <div className="ship_ment-details-total-delivery">
                                            <div className="ship_ment-details-title-price-product df ai">
                                                <span>Tạm tính</span>
                                                <span>
                                                    {formatMoney(totalPriceProduct)}₫
                                                </span>
                                            </div>
                                            <div className="ship_ment-details-delivery-price df ai">
                                                <span>Phí vận chuyển</span>
                                                {confirmAddress !== 'null' &&
                                                inputs.service_id ? (
                                                    <span>
                                                        {formatMoney(totalPriceDelivery)}₫
                                                    </span>
                                                ) : (
                                                    <span>–</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="ship_ment-details-total-sum fz16 df ai">
                                            <div className="ship_ment-details-text-sum">
                                                Tổng cộng
                                            </div>
                                            <div
                                                className="ship_ment-details-text-price df ai"
                                                style={{ color: '#979696' }}
                                            >
                                                VND{' '}
                                                <div className="ship_ment-details-number-price fw500">
                                                    {formatMoney(
                                                        totalPriceProduct +
                                                            totalPriceDelivery,
                                                    )}
                                                    ₫
                                                </div>
                                            </div>
                                        </div>
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

export default ShipmentDetails;
