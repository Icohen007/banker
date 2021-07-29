const _ = require('lodash');
const { getSortedSet, get } = require('./redis');

const bidsKey = 'LIST_OF_BIDS';
const MAX_RESOLVE_TIME = 60;

const dateToUnix = (date) => Number((date.getTime() / 1000).toFixed(0));
let prevTime = dateToUnix(new Date());

const splitIdsAndScores = (bidIdsAndScores) => {
  const bids = [];
  for (let i = 0; i < bidIdsAndScores.length; i += 2) {
    bids.push({ id: bidIdsAndScores[i], time: bidIdsAndScores[i + 1] });
  }
  return bids;
};

const fetchBidData = async (bid) => {
  const { id, time } = bid;
  try {
    const bidData = JSON.parse(await get(id));
    const bidFullData = { ...bidData, id, time };
    return bidFullData;
  } catch (err) {
    console.err(`error fetching bid id: ${id}`);
  }
  return null;
};

const getBidsData = async (bidIdsAndScores) => {
  const bids = splitIdsAndScores(bidIdsAndScores);
  const bidPromises = bids.map((bid) => fetchBidData(bid));
  const bidsWithData = await Promise.all(bidPromises);
  return bidsWithData;
};

const sendBidsData = (io, bidsWithData) => {
  const campaignToBids = _.groupBy(bidsWithData, 'campaign');
  Object.keys(campaignToBids).forEach((campaignId) => {
    io.emit(campaignId, campaignToBids[campaignId]);
  });
};

const fetchRecentBids = async (io, intervalInMs = 1000) => {
  setTimeout(async () => {
    const now = dateToUnix(new Date());
    try {
      const bidIdsAndScores = await getSortedSet(bidsKey, prevTime - MAX_RESOLVE_TIME - 1, now, 'withscores');
      const bidsWithData = await getBidsData(bidIdsAndScores);
      sendBidsData(io, bidsWithData);
    } catch (err) {
      console.log(`error fetching bids: ${err}`);
    }
    prevTime = now;
    fetchRecentBids(io, intervalInMs);
  }, 1000);
};

module.exports = { fetchRecentBids };
