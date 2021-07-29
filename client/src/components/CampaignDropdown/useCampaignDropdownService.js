import { useCallback } from 'react';
import { useGlobalData } from '../../hooks/useGlobalData';
import useFetcher from '../../hooks/useFetcher';

const useCampaignDropdownService = () => {
  const {
    selectedCampaignId, setSelectedCampaignId, socket, setBids, bids,
  } = useGlobalData();
  const [{ isLoading, isError, data: campaigns }] = useFetcher('http://localhost:5000/campaigns');

  const resolveBids = useCallback((newBids) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const newBid of newBids) {
      if (bids[newBid.id]) {
        bids[newBid.id].status = newBid.status;
      } else {
        bids[newBid.id] = newBid;
      }
    }
    setBids({ ...bids });
  }, [bids]);

  const onChange = useCallback((newCampaignId) => {
    setSelectedCampaignId(() => {
      socket.removeAllListeners();
      socket.on(newCampaignId, resolveBids);
      return newCampaignId;
    });
    setBids({});
  }, [socket, selectedCampaignId, resolveBids]);

  return {
    campaigns, onChange, isError, isLoading, selectedCampaignId,
  };
};

export default useCampaignDropdownService;
