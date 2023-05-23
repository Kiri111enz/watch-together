import CloseButton from './CloseButton';
import styles from 'styles/Alert.module.scss';

interface AlertProps {
    message: string
    closeTime?: number
    onClose?: () => void
}

const Alert: React.FC<AlertProps> = (props) => {
    setTimeout(props.onClose, props.closeTime);

    return (
        <div className={styles.alert}>
            <CloseButton onClick={props.onClose} />
            {props.message}
        </div>
    );
};

export default Alert;