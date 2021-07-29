import React, { useMemo } from 'react';
import { useGlobalData } from '../../hooks/useGlobalData';

const BidsStats = () => {
  const { bids } = useGlobalData();
  const { error, lose, win } = useMemo(() => {
    const bidValues = Object.values(bids);
    const errorBids = bidValues.filter((bid) => bid.status === 1);
    const loseBids = bidValues.filter((bid) => bid.status === 2);
    const winBids = bidValues.filter((bid) => bid.status === 3);
    return { error: errorBids, lose: loseBids, win: winBids };
  }, [bids]);

  return (
    <div>
      <p>
        Win:
        {' '}
        {win.length}
      </p>
      <p>
        Lose:
        {' '}
        {lose.length}
      </p>
      <p>
        error:
        {' '}
        {error.length}
      </p>

      <p>
        total:
        {' '}
        {Object.values(bids).length}
      </p>
    </div>
  );
};

export default React.memo(BidsStats);
