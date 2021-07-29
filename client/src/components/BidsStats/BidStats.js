import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useGlobalData } from '../../hooks/useGlobalData';
import { STATUS } from '../../lib/contants';

const BidsStats = () => {
  const { bids } = useGlobalData();
  const { error, lose, win } = useMemo(() => {
    const bidValues = Object.values(bids);
    const errorBids = bidValues.filter((bid) => bid.status === STATUS.ERROR);
    const loseBids = bidValues.filter((bid) => bid.status === STATUS.LOSE);
    const winBids = bidValues.filter((bid) => bid.status === STATUS.WIN);
    return { error: errorBids, lose: loseBids, win: winBids };
  }, [bids]);

  return (
    <div>
      <Header>Resolved Bids</Header>
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
        Error:
        {' '}
        {error.length}
      </p>
      <p>
        Total:
        {' '}
        {Object.values(bids).length}
      </p>
    </div>
  );
};

const Header = styled.h1`
padding-bottom: 10px;
font-size: 20px;
font-weight: 700;
`;

export default React.memo(BidsStats);
