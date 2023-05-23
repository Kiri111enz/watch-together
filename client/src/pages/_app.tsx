import type { AppProps } from 'next/app';
import { createContext } from 'react';
import useSocket, { SocketPlus } from 'hooks/useSocket';
import 'styles/index.scss';

export const SocketContext = createContext<SocketPlus>(null);

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const socket = useSocket();

    return (
        <SocketContext.Provider value={socket}>
            <Component {...pageProps} />
        </SocketContext.Provider>
    );
};

export default App;