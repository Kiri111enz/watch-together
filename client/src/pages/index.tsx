import { useState, useRef } from 'react';
import Popup from 'components/Popup';
import * as ioClient from 'services/ioClient';
import styles from 'styles/Home.module.scss';

enum MenuState {
    None,
    ChooseFile,
    EnterId
}

const Home: React.FC = () => {
    const [menuState, setMenuState] = useState(MenuState.None);
    const fileLabel = useRef(null);
    const roomIdInput = useRef(null);

    return (
        <>
            <div className={styles.container}>
                <button className={styles.buttonLarge}
                    onClick={() => setMenuState(MenuState.ChooseFile)}>Create room</button>
                <button className={styles.buttonLarge}
                    onClick={() => setMenuState(MenuState.EnterId)}>Join room</button>
            </div>

            {menuState !== MenuState.None &&
            <Popup onClose={() => setMenuState(MenuState.None)}>
                {menuState === MenuState.ChooseFile &&
                <div id={styles.chooseFileContainer}>
                    <label htmlFor="file-input" className={styles.fileButton}>Choose file</label>
                    <span ref={fileLabel} className={styles.fileLabel}>no file yet</span>
                    <input type="file" id="file-input"
                        onChange={event => {
                            fileLabel.current.textContent = event.target.files[0] ? 
                                event.target.files[0].name : 'no file yet';
                        }}/>
                    <button className={styles.buttonContinue}
                        onClick={async () => console.log(await ioClient.createRoom())}>Continue</button>
                </div>
                }
                {menuState === MenuState.EnterId && 
                <div id={styles.enterIdContainer}>
                    <input ref={roomIdInput} className={styles.textInput} type="text" placeholder="Enter room id..." />
                    <button className={styles.button}
                        onClick={async () => console.log(await ioClient.joinRoom(roomIdInput.current.value))}>Continue</button>
                </div>
                }
            </Popup>
            }
        </>
    );
};

export default Home;