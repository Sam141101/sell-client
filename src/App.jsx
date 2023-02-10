import ProductList from './pages/ProductList';
import Home from './pages/Home';
import Product from './pages/Product/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart/Cart';
// import ConfirmDelete from './components/ConfirmDelete/ConfirmDelete';
// import Pagination from './components/Pagination/Pagination';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    // Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfile from './pages/UserProfile/UserProfile';
import Search from './pages/Search';
import EmailVerify from './pages/EmailVerify/EmailVerify';
import ShipmentDetails from './pages/ShipmentDetails';
import Purchase from './pages/Purchase';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import NewPassword from './pages/NewPassword/NewPassword';
import ChangePassword from './pages/ChangePassword/ChangePassword';

function App() {
    // test
    const user = useSelector((state) => state.auth?.currentUser);

    //

    return (
        <Router>
            <Routes>
                <Route path="/ttt3" element={<ChangePassword />} />
                <Route path="/ttt2" element={<ForgotPassword />} />
                <Route path="/ttt" element={<Purchase />} />

                {/* Thử nghiệm */}
                <Route
                    path="/register"
                    element={user ? <Navigate to="/" /> : <Register />}
                />

                {/* sản phẩm */}
                <Route path="/search/:category" element={<Search />} />
                <Route path="/account/profile" element={<UserProfile />} />
                <Route path="/" element={<Home />} />
                <Route path="/products/:category" element={<ProductList />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<ShipmentDetails />} />

                {/* <Route
                    path="/cart"
                    element={user ? <Navigate to="/login" /> : <Cart />}
                /> */}
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

                {/* <Route
                    path="/register"
                    element={user ? <Navigate to="/" /> : <Register />}
                /> */}

                <Route
                    path="/confirm/register"
                    element={user ? <Navigate to="/" /> : <EmailVerify />}
                />
                <Route path="/auth/:id/verify/:token" element={<Register />} />
                <Route path="/reset-password/:id/:token/" element={<NewPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
