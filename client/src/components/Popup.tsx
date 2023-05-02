import { PropsWithChildren } from 'react';
import styles from 'styles/Popup.module.scss';

interface PopupProps {
    onClose: () => void
}

const Popup: React.FC<PropsWithChildren<PopupProps>> = (props) => (
    <div className={styles.container}>
        <div className={styles.popup}>
            <button id={styles.closeButton} onClick={props.onClose}>&times;</button>
            {props.children}
        </div>
    </div>
);

export default Popup;