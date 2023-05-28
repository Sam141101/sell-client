import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';
import { createAxiosInstance } from '../../useAxiosJWT';
import { useNavigate } from 'react-router-dom';

function DefaultLayoutAuth({ children, page }) {
    const user = useSelector((state) => state.auth?.currentUser);
    const quantity = useSelector((state) => state.cart?.quantity);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const axiosJWT = createAxiosInstance(user, dispatch);

    return (
        <div className="default-layout-wrapper">
            <Navbar
                axiosJWT={axiosJWT}
                quantity={quantity}
                user={user}
                navigate={navigate}
                dispatch={dispatch}
            />

            <>{children}</>

            <Footer />
        </div>

        // <div>{children}</div>
    );
}

export default DefaultLayoutAuth;
