import React, { useState, useEffect } from 'react';
import { Close, Create, Person, Search, ShoppingCart } from '@mui/icons-material';
import styled from 'styled-components';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Router, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Announcement from '../components/Announcement';
import Navbar from '../components/NavBar';
import app from '../firebase';
import { updateUser } from '../redux/apiCalls';
import WaitPurchase from '../components/WaitPurchase';
// import app from '../firebase'

const Container = styled.div`
height: 100vh;
    display: flex;
    padding: 30px 150px 100px 150px;
    // height: 75vh;
    // background-color: #f5f5f5;
}
    
`;

const ContainerLeft = styled.div`
    flex: 1;
    margin-right: 30px;
`;

const InfoUser = styled.div`
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #efefef;
`;

const ImgUser = styled.img`
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`;

const ChangInfoUser = styled.div`
    margin-left: 17px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const TitleUser = styled.h4`
    font-size: 15px;
`;

const ChangeInfo = styled.span`
    cursor: pointer;
    color: #9b9b9b;
    display: flex;
    align-items: center;
    font-size: 15px;
`;

const MoreItem = styled.div`
    margin-top: 20px;
`;

const Item = styled.div`
    // margin-top: 20px;
    display: flex;
    align-items: center;
    font-size: 15px;
    padding: 7px 0;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        color: #ee4d2d;
    }
`;

const ImgItem = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

const ContainerRight = styled.div`
    flex: 3;
    background-color: white;
    border-radius: 3px;
    padding: 0 30px;
`;

const ManageUser = styled.div`
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-around;
    padding: 18px 0;
`;
const FileTitle = styled.div`
    font-weight: 500;
    font-size: 18px;
`;

const Form = styled.div``;
const FormLeft = styled.div`
    flex: 3;
    padding-right: 50px;
`;

const FormItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`;

const FormKey = styled.div`
    width: 20%;
    text-align: right;
    color: rgba(85, 85, 85, 0.8);
    overflow: hidden;
`;

const FormValue = styled.div`
    width: 80%;
    padding-left: 20px;
    color: #333;
`;

const FormInput = styled.input`
    padding-left: 13px;
    align-items: center;
    display: flex;
    width: 100%;
    height: 40px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 2px;
    box-shadow: inset 0 2px 0 rgb(0 0 0 / 2%);
`;

const FormValueSelect = styled.input`
    margin-right: 5px;
    width: 18px;
`;

const FormValueLabel = styled.label`
    margin-right: 20px;
    color: #333;
    font-weight: 600;
`;

const SaveInfo = styled.button`
    border: none;
    color: #fff;
    overflow: visible;
    outline: 0;
    background: #ee4d2d;
    margin-left: calc(20% + 20px);
    padding: 12px 25px;
    font-size: 15px;
    cursor: pointer;

    &:hover {
        background: #f05d40;
    }
`;

const Drum = styled.div`
    padding-bottom: 60px;
`;

const FormRight = styled.div`
    flex: 1;
    border-left: 1px solid #efefef;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ImgUserCurrent = styled.img`
    width: 100px;
    border-radius: 50%;
    margin: 20px 0;
    cursor: pointer;
    height: 100px;
    object-fit: cover;
`;
const ButtonSelectImg = styled.input`
    display: none;
`;
const Note = styled.div`
    color: #999;
    font-size: 14px;
    line-height: 22px;
`;

const BtnSelect = styled.div`
    cursor: pointer;
    font-size: 16px;
    outline: 0;
    background: #fff;
    color: #555;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 3%);
    overflow: visible;
    height: 40px;
    padding: 0 20px;
    min-width: 70px;
    max-width: 220px;
    display: flex;
    align-items: center;
    text-align: center;

    &:hover {
        background: rgba(0, 0, 0, 0.02);
    }

    &:active {
        box-shadow: rgb(0 0 0 / 5%) 0px 2px 1px 0px inset;
        background: rgba(0, 0, 0, 0.02);
    }
`;

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 600;
    background-color: rgba(0, 0, 0, 0.4);
`;

const Noti = styled.div`
    padding: 0 20px 20px 20px;
    background-color: #fff;
    width: 300px;
    max-height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NotiImg = styled.img`
    width: 130px;
    background: white;
    color: #989595;
`;
const TextNoti = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

const Purchase = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
    };

    return (
        <div style={{ backgroundColor: '#f5f5f5', height: 'auto' }}>
            {/* {show && (
                <Wrapper>
                    <Noti>
                        <NotiImg
                            src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
                            alt=""
                        />

                        <TextNoti>Cập nhật hồ sơ</TextNoti>
                    </Noti>
                </Wrapper>
            )} */}

            <div style={{ backgroundColor: 'white' }}>
                <Announcement />
                <Navbar />
            </div>

            <Container>
                <ContainerLeft>
                    <InfoUser>
                        <ImgUser
                            src={
                                user.img ||
                                'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
                            }
                            alt=""
                        />
                        <ChangInfoUser>
                            <TitleUser>{user.username}</TitleUser>
                            <ChangeInfo>
                                <Create
                                    style={{ fontSize: '18px', marginRight: '5px' }}
                                />
                                Sửa hồ sơ
                            </ChangeInfo>
                        </ChangInfoUser>
                    </InfoUser>

                    <MoreItem>
                        <Link style={{ textDecoration: 'none' }} to="/account/profile">
                            <Item>
                                <ImgItem
                                    src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
                                    alt=""
                                />
                                Tài khoản của tôi
                            </Item>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/ttt">
                            <Item>
                                <ImgItem
                                    src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
                                    alt=""
                                />
                                Đơn mua
                            </Item>
                        </Link>
                    </MoreItem>
                </ContainerLeft>

                <ContainerRight>
                    <ManageUser>
                        <Link style={{ color: 'red', textDecoration: 'none' }} to="/ttt1">
                            <FileTitle>Chờ lấy hàng</FileTitle>
                        </Link>
                        <FileTitle>Đang giao</FileTitle>
                        <FileTitle>Hoàn thành</FileTitle>
                        <FileTitle>Đã huỷ</FileTitle>
                    </ManageUser>

                    <Form>
                        <WaitPurchase />
                        {/* <Router>
                            <Routes>
                                <Route path="/ttt1" element={<WaitPurchase />} />
                                <Route path="/ttt2" element={<Delivering />} />
                                <Route path="/ttt3" element={<Finish />} />
                                <Route path="/ttt4" element={<Canceled />} />
                            </Routes>
                        </Router> */}
                    </Form>
                </ContainerRight>
            </Container>
        </div>
    );
};

export default Purchase;
