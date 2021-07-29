import React, { useMemo } from 'react';
import { Table, Column } from 'react-virtualized';
import { useGlobalData } from '../../hooks/useGlobalData';

const PendingBids = () => {
  const { bids } = useGlobalData();
  const pendingBids = useMemo(() => Object.values(bids).filter((bid) => bid.status === 0), [bids]);

  return (
    <div>
      <h1>Pending Bids</h1>
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
    </div>
  );
};

export default React.memo(PendingBids);
