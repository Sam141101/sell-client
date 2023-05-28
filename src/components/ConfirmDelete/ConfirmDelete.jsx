import { useDispatch, useSelector } from 'react-redux';

import { deleteProduct } from '../../redux/apiCalls';
import './confirmDelete.css';
import { createAxiosInstance } from '../../useAxiosJWT';

const ConfirmDelete = ({
    noti,
    setNoti,
    token,
    comfirmDelete,
    setComfirmDelete,
    axiosJWT,
}) => {
    // const user = useSelector((state) => state.auth?.currentUser);
    const dispatch = useDispatch();

    const productId = useSelector((state) =>
        state.cart.products.filter((product) => product._id === comfirmDelete),
    );

    // const axiosJWT = createAxiosInstance(user, dispatch);

    const handleClick = (type) => {
        if (type === 'yes') {
            deleteProduct(token, dispatch, productId[0]._id, axiosJWT);
            setNoti('none');
            setComfirmDelete('');
        } else if (type === 'no') {
            setNoti('none');
        }
    };

    return (
        <div className="confirm-delete-container" style={{ display: noti }}>
            <div className="confirm-delete-wrapper">
                <h1 className="confirm-delete-title">
                    Bạn chắc chắn muốn bỏ sản phẩm này ?
                </h1>

                <div className="confirm-delete-name-product">
                    {comfirmDelete && productId[0].product_id.title}
                </div>

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
