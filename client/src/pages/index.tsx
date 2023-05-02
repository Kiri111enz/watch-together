import styles from 'styles/Home.module.scss';

const Home: React.FC = () => (
    <div className={styles.container}>
        <button className={styles.buttonLarge}>Create room</button>
        <button className={styles.buttonLarge}>Join room</button>
    </div>
);

export default Home;