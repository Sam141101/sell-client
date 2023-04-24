import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';

function DefaultLayoutAuth({ children, page }) {
    const location = useLocation();
    const pathpolicy = location.pathname.split('/')[1];

    // const handleClickList = () => {
    //     const check = document.querySelector('.about-list');
    //     check.classList.toggle('list-check');
    // };

    // useEffect(() => {
    //     const check = document.querySelector('.about-list');
    //     check.classList.remove('list-check');
    // }, [pathpolicy]);

    return (
        <div className="default-layout-wrapper">
            <Navbar />

            <>{children}</>

            <Footer />
        </div>

        // <div>{children}</div>
    );
}

export default DefaultLayoutAuth;
