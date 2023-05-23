import styles from 'styles/CloseButton.module.scss';

interface CloseButtonProps {
    onClick?: () => void
}

const CloseButton: React.FC<CloseButtonProps> = (props) => (
    <button id={styles.closeButton} onClick={props.onClick}>&times;</button>
);

export default CloseButton;