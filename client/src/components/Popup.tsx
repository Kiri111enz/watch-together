import { PropsWithChildren } from 'react';
import CloseButton from './CloseButton';
import styles from 'styles/Popup.module.scss';

interface PopupProps {
    showCloseButton?: boolean,
    onClose?: () => void
}

const Popup: React.FC<PropsWithChildren<PopupProps>> = (props) => (
    <div className={styles.container}>
        <div className={styles.popup}>
            {props.showCloseButton !== false &&
            <CloseButton onClick={props.onClose} />
            }
            {props.children}
        </div>
    </div>
);

export default Popup;