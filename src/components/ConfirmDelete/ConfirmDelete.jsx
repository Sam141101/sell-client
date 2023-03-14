import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../redux/apiCalls';
import { useRef } from 'react';
import './confirmDelete.css';

const ConfirmDelete = ({ id, noti, setNoti, name, token }) => {
    const notiRef = useRef();

    const [confirm, setConfirm] = useState(false);

    const cart = useSelector((state) => state?.cart);
    const user = useSelector((state) => state.auth?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (type) => {
        console.log('type', type);

        if (type === 'yes') {
            deleteProduct(token, dispatch, id);
            setNoti('none');
        } else if (type === 'no') {
            setNoti('none');
        }

        // console.log('notifi', notifi);
        // console.log('noti', noti);

        // return noti;
    };

    // useEffect(() => {
    //     console.log('llllllll');
    // }, [noti]);

    return (
        // <Container style={{ display: `${notiRef.current}` }}>
        <div className="confirm-delete-container" style={{ display: noti }}>
            <div className="confirm-delete-wrapper">
                <h1 className="confirm-delete-title">
                    Bạn chắc chắn muốn bỏ sản phẩm này ?
                </h1>

                <div className="confirm-delete-name-product">{name}</div>

                <div className="confirm-delete-wrapper-button">
                    <div
                        className="confirm-delete-button-yes"
                        onClick={() => handleClick('yes')}
                    >
                        Có
                    </div>
                    <div
                        className="confirm-delete-button-no"
                        onClick={() => handleClick('no')}
                    >
                        Không
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
