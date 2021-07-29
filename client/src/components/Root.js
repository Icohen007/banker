import React from 'react';
import styled from 'styled-components';
import { PendingBids } from './PendingBids';
import { CampaignDropdown } from './CampaignDropdown';
import { BidsStats } from './BidsStats';

const Root = () => (
  <Container>
    <Title>BigaBid Banker</Title>
    <CampaignDropdown />
    <MainSection>
      <PendingBids />
      <BidsStats />
    </MainSection>
  </Container>
);

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 1400px;
margin: auto;
`;

const MainSection = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
max-width: 1000px;
width: 100%;
margin-top: 60px;
`;

const Title = styled.h1`
margin-top: 100px;
margin-bottom: 100px;
font-size: 50px;
`;

export default Root;
