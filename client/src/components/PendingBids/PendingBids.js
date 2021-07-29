import React, { useMemo } from 'react';
import { Table, Column } from 'react-virtualized';
import styled from 'styled-components';
import { useGlobalData } from '../../hooks/useGlobalData';
import { STATUS } from '../../lib/contants';

const getRowClassName = ({ index }) => (index % 2 === 0 ? 'even' : 'odd');

const PendingBids = () => {
  const { bids } = useGlobalData();
  const pendingBids = useMemo(() => Object.values(bids)
    .filter((bid) => bid.status === STATUS.PENDING), [bids]);

  return (
    <StyledTableWrapper>
      <Header>Pending Bids</Header>
      <StyledTable
        height={300}
        width={800}
        headerHeight={20}
        rowHeight={35}
        rowCount={pendingBids.length}
        rowGetter={({ index }) => pendingBids[index]}
        overscanRowCount={100}
        rowClassName={getRowClassName}
      >
        <Column label="Bid id" dataKey="id" width={400} />
        <Column label="Bid Time" dataKey="time" width={150} />
        <Column label="Price" dataKey="price" width={50} />
      </StyledTable>
    </StyledTableWrapper>
  );
};

const Header = styled.h1`
padding-bottom: 20px;
font-size: 20px;
font-weight: 700;
`;

const StyledTableWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const StyledTable = styled(Table)`
  & .odd {
    background-color: #f8f8f8;
  }

  & .even {
    background-color: #efefef;
  }
`;

export default React.memo(PendingBids);
