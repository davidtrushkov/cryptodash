import React from 'react';
import WelcomeMessage from '../Settings/WelcomeMessage';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';

export default function Welcome() {
    return <Page name="settings">
      <WelcomeMessage />
      <ConfirmButton />
      </Page>
  }