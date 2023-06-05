import { useSelector } from 'react-redux';

import { deleteProduct } from '../../redux/apiCalls';
import './confirmDelete.css';

const ConfirmDelete = ({
    noti,
    setNoti,
    token,
    comfirmDelete,
    setComfirmDelete,
    axiosJWT,
    dispatch,
}) => {
    console.log('comfirmDelete', comfirmDelete);
    const productId = useSelector((state) =>
        state.cart.products.filter((product) => product._id === comfirmDelete),
    );

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
