import { useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { SocketContext } from './_app';
import Popup from 'components/Popup';
import Alert from 'components/Alert';
import styles from 'styles/Home.module.scss';

enum MenuState {
    None,
    EnterId
}

const Home: React.FC = () => {
    const [menuState, setMenuState] = useState(MenuState.None);
    const [showAlert, setShowAlert] = useState(false);
    const roomIdInput = useRef(null);
    const router = useRouter();
    const socket = useContext(SocketContext);

    return (
        <>
            <div className={styles.container}>
                <button className={styles.buttonLarge}
                    onClick={async () => {
                        const roomId = await socket.getResponse('createRoom');
                        router.push({ pathname: `/${roomId}`, query: { host: true } }, `/${roomId}`);
                    }}>Create room</button>
                <button className={styles.buttonLarge}
                    onClick={() => setMenuState(MenuState.EnterId)}>Join room</button>
            </div>

            {menuState == MenuState.EnterId &&
            <Popup onClose={() => setMenuState(MenuState.None)}>
                <div id={styles.enterIdContainer}>
                    <input ref={roomIdInput} className={styles.textInput} type="text" placeholder="Enter room id..." />
                    <button className={styles.button}
                        onClick={async () => {
                            if (await socket.getResponse('joinRoom', roomIdInput.current.value))
                                router.push(
                                    { pathname: `/${roomIdInput.current.value}`, query: { host: false }}, 
                                    `/${roomIdInput.current.value}`
                                );
                            else
                                setShowAlert(true);
                        }}>Continue</button>
                </div>
            </Popup>
            }

            {showAlert &&
            <Alert message='Wrong roomId!' closeTime={5000} onClose={() => setShowAlert(false)} />
            }
        </>
    );
};

export default Home;