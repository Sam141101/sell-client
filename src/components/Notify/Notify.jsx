import './notify.css';

const Notify = ({ show, title }) => {
    return (
        <>
            {show && (
                <div className="change-password-wrapper">
                    <div className="change-password-noti">
                        <img
                            className="change-password-noti-img"
                            src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
                            alt=""
                        />

                        <p className="change-password-text-noti">{title}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Notify;
