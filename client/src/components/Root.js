import React from 'react';
import { PendingBids } from './PendingBids';
import { CampaignDropdown } from './CampaignDropdown';

const Root = () => (
  <div>
    <CampaignDropdown />
    <PendingBids />
  </div>
);

export default Root;
