import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Popup from 'components/Popup';
import { response } from 'services/ioClient';
import styles from 'styles/Home.module.scss';

enum MenuState {
    None,
    EnterId
}

const Home: React.FC = () => {
    const [menuState, setMenuState] = useState(MenuState.None);
    const roomIdInput = useRef(null);
    const router = useRouter();

    return (
        <>
            <div className={styles.container}>
                <button className={styles.buttonLarge}
                    onClick={async () => {
                        const roomId = await response('createRoom');
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
                            if (await response('joinRoom', roomIdInput.current.value))
                                router.push(
                                    { pathname: `/${roomIdInput.current.value}`, query: { host: false }}, 
                                    `/${roomIdInput.current.value}`
                                );
                        }}>Continue</button>
                </div>
            </Popup>
            }
        </>
    );
};

export default Home;