import { GetServerSideProps } from 'next';
import { roomExists } from 'services/ioClient';

interface VideoPageProps {
    roomId: string
}

const VideoPage: React.FC<VideoPageProps> = ({ roomId }) => {
    return (
        <>{roomId}</>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params: { roomId } } = context;
    if (await roomExists(roomId as string))
        return { props: { roomId }};
    return { notFound: true };
};

export default VideoPage;