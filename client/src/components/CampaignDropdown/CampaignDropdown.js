import React from 'react';
import Dropdown from 'react-dropdown';
import useCampaignDropdownService from './useCampaignDropdownService';

const CampaignDropdown = () => {
  const {
    campaigns, onChange, isError, isLoading, selectedCampaignId,
  } = useCampaignDropdownService();

  if (isError) {
    return <div>Error!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Dropdown
      options={campaigns || []}
      onChange={({ value }) => onChange(value)}
      value={selectedCampaignId}
      placeholder="Select Campaign"
      menuClassName="dropdown-menu"
      controlClassName="dropdown-control"
    />
  );
};

export default React.memo(CampaignDropdown);
