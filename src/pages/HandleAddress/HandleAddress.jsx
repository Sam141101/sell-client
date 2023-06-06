import React, { useState, useEffect } from 'react';

import FormInputAddress from '../../components/FormInputAddress/FormInputAddress';

const HandleAddress = ({
    user,
    axiosJWT,
    dispatch,
    navigate,
    BASE_URL_API,
    setToast,
}) => {
    const token = user.token;
    const id = user?._id;

    const [inputs, setInputs] = useState({
        address: '',
        provinceId: 0,
        districtId: 0,
        wardId: 0,

        provinceName: '',
        districtName: '',
        wardName: '',
    });

    const [notify, setNotify] = useState('');
    const [advertise, setAdvertise] = useState('');

    console.log('inputs', inputs);
    const handleClick = async () => {
        let errorMessage = '';

        if (!inputs.address) {
            errorMessage = 'Vui lòng nhập địa chỉ.';
        } else if (!inputs.provinceId) {
            errorMessage = 'Vui lòng nhập Tỉnh / Thành!';
        } else if (!inputs.districtId) {
            errorMessage = 'Vui lòng nhập Quận / Huyện!';
        } else if (!inputs.wardId) {
            errorMessage = 'Vui lòng nhập Phường / Xã!';
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
            let res;
            if (notify === 'null') {
                res = await axiosJWT.post(BASE_URL_API + 'address/' + id, inputs, {
                    headers: { token: `Bearer ${user.token}` },
                });
            } else {
                res = await axiosJWT.put(BASE_URL_API + 'address/' + id, inputs, {
                    headers: { token: `Bearer ${user.token}` },
                });
            }
            setAdvertise(res.data.message);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getAddress = async () => {
            try {
                const res = await axiosJWT.get(BASE_URL_API + 'address/' + id, {
                    headers: { token: `Bearer ${token}` },
                });
                if (res.data !== null) {
                    setInputs({
                        address: res.data.address,
                        provinceId: res.data.province_id,
                        districtId: res.data.district_id,
                        wardId: res.data.ward_id,

                        provinceName: res.data.province,
                        districtName: res.data.district,
                        wardName: res.data.ward,
                    });
                    // setInputs(res.data);
                } else {
                    setNotify(`${res.data}`);
                }
            } catch (err) {
                console.log(err);
                console.log('that bai');
            }
        };
        getAddress();
    }, [token, id]);

    console.log('inputs', inputs);

    return (
        <div className="row">
            <div className="col l-12 c-12">
                <div className="address-manage-user">
                    <h4 className="user-profile-file-title">Thông tin địa chỉ</h4>
                </div>

                <div className="user-address-form">
                    <div className="row">
                        <div className="col l-12 c-12">
                            <div className="user-profile-form-frame">
                                <div className="user-address-form-item">
                                    <div className="user-change-address-form-key">
                                        Nhập địa chỉ
                                    </div>

                                    <div className="frame-update-address">
                                        <FormInputAddress
                                            inputs={inputs}
                                            setInputs={setInputs}
                                            handleClick={handleClick}
                                            notify={notify}
                                            setAdvertise={setAdvertise}
                                        />
                                    </div>

                                    <span className="advertise">{advertise}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HandleAddress;
