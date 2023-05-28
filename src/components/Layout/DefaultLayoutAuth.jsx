import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';

function DefaultLayoutAuth({ children, page }) {
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
