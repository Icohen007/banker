import React, { useMemo } from 'react';
import { Table, Column } from 'react-virtualized';
import styled from 'styled-components';
import { useGlobalData } from '../../hooks/useGlobalData';
import { STATUS } from '../../lib/contants';

const getRowClassName = ({ index }) => (index % 2 === 0 ? 'even' : 'odd');
const dateToUnix = (date) => Number((date.getTime() / 1000).toFixed(0));
const MAX_RESOLVE_TIME = 60;

const PendingBids = () => {
  const { bids } = useGlobalData();
  const pendingBids = useMemo(() => {
    const currentDateUnix = dateToUnix(new Date());
    return Object.values(bids)
      .filter((bid) => bid.status === STATUS.PENDING)
      .filter((bid) => bid.time >= currentDateUnix - MAX_RESOLVE_TIME);
  }, [bids]);

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
        <Column label="Bid Time" dataKey="time" width={150} cellRenderer={({ cellData }) => new Date(cellData * 1000).toLocaleTimeString()} />
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
