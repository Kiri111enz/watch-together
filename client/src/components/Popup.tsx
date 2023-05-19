import { PropsWithChildren } from 'react';
import styles from 'styles/Popup.module.scss';

interface PopupProps {
    showCloseButton?: boolean,
    onClose?: () => void
}

const Popup: React.FC<PropsWithChildren<PopupProps>> = (props) => (
    <div className={styles.container}>
        <div className={styles.popup}>
            {props.showCloseButton !== false &&
            <button id={styles.closeButton} onClick={props.onClose}>&times;</button>
            }
            {props.children}
        </div>
    </div>
);

export default Popup;