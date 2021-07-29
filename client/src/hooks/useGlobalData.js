import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import io from 'socket.io-client';

const GlobalStateContext = React.createContext({});

export const useGlobalData = () => useContext(GlobalStateContext);

const baseUrl = 'http://localhost:5000';

export const GlobalDataProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [bids, setBids] = useState({});
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  useEffect(() => {
    if (!socket?.connected) {
      const socketInstance = io(baseUrl, { transport: ['websocket'] });
      setSocket(socketInstance);
    }

    return () => {
      socket?.disconnect();
    };
  }, []);

  const value = useMemo(() => ({
    socket,
    setSocket,
    bids,
    setBids,
    selectedCampaignId,
    setSelectedCampaignId,
  }), [socket, setSocket, bids, setBids, selectedCampaignId, setSelectedCampaignId]);

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
