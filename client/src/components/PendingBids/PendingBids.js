import React, { useMemo } from 'react';
import { Table, Column } from 'react-virtualized';
import styled from 'styled-components';
import { useGlobalData } from '../../hooks/useGlobalData';
import { STATUS } from '../../lib/contants';

const PendingBids = () => {
  const { bids } = useGlobalData();
  const pendingBids = useMemo(() => Object.values(bids)
    .filter((bid) => bid.status === STATUS.PENDING), [bids]);

  return (
    <StyledTable>
      <Header>Pending Bids</Header>
      <Table
        height={300}
        width={800}
        headerHeight={20}
        rowHeight={30}
        rowCount={pendingBids.length}
        rowGetter={({ index }) => pendingBids[index]}
        overscanRowCount={100}
      >
        <Column label="Bid id" dataKey="id" width={400} />
        <Column label="Bid Time" dataKey="time" width={150} />
        <Column label="Price" dataKey="price" width={50} />
      </Table>
    </StyledTable>
  );
};

const Header = styled.h1`
padding-bottom: 20px;
font-size: 20px;
font-weight: 700;
`;

const StyledTable = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export default React.memo(PendingBids);
