import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Popup from 'components/Popup';
import { response } from 'services/ioClient';
import { queryToBool } from 'utils';
import styles from 'styles/VideoPage.module.scss';

interface VideoPageProps {
    roomId: string,
    host: boolean
}

const VideoPage: React.FC<VideoPageProps> = (props) => {
    const [file, setFile] = useState(null);
    
    return (
        <>
            {(props.host && file === null) && 
            <Popup showCloseButton={false}>
                <div className={styles.container}>
                    <div className={styles.roomIdLabel}>Room Id:</div>
                    <div className={styles.roomId}>{props.roomId}</div>
                    <label htmlFor="file-input" className={styles.fileButton}>Choose file</label>
                    <input type="file" id="file-input"
                        onChange={event => {
                            if (event.target.files[0])
                                setFile(event.target.files[0]);
                        }}/>
                </div>
            </Popup>
            }
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params: { roomId }, query: { host } } = context;
    if (await response('roomExists', roomId))
        return { props: { roomId, host: queryToBool(host as string) }};
    return { notFound: true };
};

export default VideoPage;