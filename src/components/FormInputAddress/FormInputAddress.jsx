import { useLocation } from 'react-router-dom';

import './formInputAddress.css';
import { Home } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL_API } from '../../requestMethods';
const FormInputAddress = ({ setInputs, inputs, handleClick, notify, setAdvertise }) => {
    // console.log('lll', typeof notify, notify);
    const location = useLocation();
    const typePage = location.pathname.split('/')[1];

    const [listAddress, setListAddress] = useState({
        province: [],
        district: [],
        ward: [],
    });

    const handleChange = (e) => {
        const { name } = e.target;
        setInputs((prev) => {
            if (e.target.name === 'address') {
                return {
                    ...prev,
                    [`${e.target.name}`]: e.target.value,
                };
            } else if (notify !== null && name === 'province') {
                return {
                    ...prev,
                    [`${e.target.name}Id`]: e.target.value,
                    [`${e.target.name}Name`]:
                        e.target.options[e.target.selectedIndex].text,
                    districtId: 0,
                    districtName: '',
                    wardId: 0,
                    wardName: '',
                };
            } else if (notify !== null && name === 'district') {
                return {
                    ...prev,
                    [`${e.target.name}Id`]: e.target.value,
                    [`${e.target.name}Name`]:
                        e.target.options[e.target.selectedIndex].text,
                    wardId: 0,
                    wardName: '',
                };
            } else if (notify !== null && name === 'ward') {
                return {
                    ...prev,
                    [`${e.target.name}Id`]: e.target.value,
                    [`${e.target.name}Name`]:
                        e.target.options[e.target.selectedIndex].text,
                };
            } else {
                return {
                    ...prev,
                    [`${e.target.name}Id`]: e.target.value,
                    [`${e.target.name}Name`]:
                        e.target.options[e.target.selectedIndex].text,
                };
            }
        });
        if (setAdvertise) {
            setAdvertise('');
        }
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get(BASE_URL_API + 'shippings/list-province');
                setListAddress({
                    province: res.data,
                    district: [],
                    ward: [],
                });
            } catch (err) {
                console.log('err', err);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (inputs.provinceId !== 0) {
            const fetchDistricts = async () => {
                try {
                    const res = await axios.post(
                        BASE_URL_API + 'shippings/list-district',
                        {
                            province_id: inputs.provinceId,
                        },
                    );
                    setListAddress((prev) => {
                        return { ...prev, district: res.data, ward: [] };
                    });
                } catch (err) {
                    console.log('err1', err);
                }
            };

            fetchDistricts();
        } else {
            setListAddress((prev) => {
                return { ...prev, district: [], ward: [] };
            });
        }
    }, [inputs.provinceId]);

    useEffect(() => {
        if (inputs.districtId !== 0) {
            const fetchWards = async () => {
                try {
                    const res = await axios.post(BASE_URL_API + 'shippings/list-ward', {
                        district_id: inputs.districtId,
                    });
                    setListAddress((prev) => {
                        return { ...prev, ward: res.data };
                    });
                } catch (err) {
                    console.log('err2', err);
                }
            };

            fetchWards();
        } else {
            setListAddress((prev) => {
                return { ...prev, district: [], ward: [] };
            });
        }
    }, [inputs.districtId]);

    // console.log('district', listAddress);

    return (
        <>
            <div className="input-group">
                <span className="input-group-address">
                    <Home className="input-group-address-icon" />
                </span>

                <input
                    name="address"
                    type="text"
                    placeholder="Địa chỉ"
                    onChange={handleChange}
                    className="form-control"
                    value={notify !== 'null' ? inputs.address : inputs.address}
                />
            </div>

            <div className="add-address-left">
                <div className="select-block">
                    <label
                        className={`label-addres ${
                            inputs.provinceId !== 0 ? 'block' : ''
                        }`}
                    >
                        Tỉnh / Thành
                    </label>
                    <select
                        name="province"
                        onChange={handleChange}
                        value={notify !== 'null' ? inputs.provinceId : undefined}
                    >
                        <option value={0}>Chọn Tỉnh / Thành</option>
                        {listAddress.province.map((item) => (
                            <option key={item.ProvinceID} value={item.ProvinceID}>
                                {item.ProvinceName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="select-block">
                    <label
                        className={`label-addres ${
                            inputs.districtId !== 0 ? 'block' : ''
                        }`}
                    >
                        Quận / Huyện
                    </label>
                    <select
                        name="district"
                        onChange={handleChange}
                        value={notify !== 'null' ? inputs.districtId : undefined}
                    >
                        <option value={0}>Chọn Quận / Huyện</option>
                        {listAddress &&
                            listAddress.district.length > 1 &&
                            listAddress.district.map((item) => (
                                <option
                                    key={item.DistrictID}
                                    value={item.DistrictID || 0}
                                >
                                    {item.DistrictName}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="select-block">
                    <label
                        className={`label-addres ${inputs.wardId !== 0 ? 'block' : ''}`}
                    >
                        Phường / Xã
                    </label>
                    <select
                        name="ward"
                        onChange={handleChange}
                        value={notify !== 'null' ? inputs.wardId : undefined}
                    >
                        <option value={0}>Chọn Phường / Xã</option>
                        {listAddress &&
                            listAddress.ward.length > 1 &&
                            listAddress.ward.map((item) => (
                                <option key={item.WardCode} value={item.WardCode || 0}>
                                    {item.WardName}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <div className="add-address-right">
                <button className="comfirm-update-address" onClick={handleClick}>
                    {typePage === 'account' ? 'Cập nhật' : 'Lưu'}
                </button>
            </div>
        </>
    );
};

export default FormInputAddress;
