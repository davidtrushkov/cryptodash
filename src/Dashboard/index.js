import React from 'react';
import Page from '../Shared/Page';
import PriceGrid from './PriceGrid';

export default function Welcome() {
    return <Page name="dashboard">
      <PriceGrid />
      </Page>
  }