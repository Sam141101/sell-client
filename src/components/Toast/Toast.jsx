import React, { useEffect } from 'react';

import { Close, Info, Check } from '@mui/icons-material';
import './toast.css';

const Toast = ({ title, message, type = 'info', duration = 3000, setShow, show }) => {
    useEffect(() => {
        let timer = setTimeout(() => setShow(false), duration);
        return () => {
            clearTimeout(timer);
        };
    }, [duration]);

    const handleClose = () => setShow(false);

    const delay = (duration / 1000).toFixed(2);

    return (
        show && (
            <div id="toast">
                <div
                    className={`toast toast--${type}`}
                    style={{
                        animation: `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`,
                    }}
                >
                    <div className="toast__icon">
                        {type === 'success' && <Check />}
                        {type === 'info' && <Info />}
                        {type === 'error' && <Info />}
                    </div>
                    <div className="toast__body">
                        <h3 className="toast__title">{title}</h3>
                        <p className="toast__msg">{message}</p>
                    </div>
                    <div className="toast__close" onClick={handleClose}>
                        <Close />
                    </div>
                </div>
            </div>
        )
    );
};

export default Toast;
