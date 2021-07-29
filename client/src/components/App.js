import React from 'react';
import GlobalStyle from './Global.style';
import Root from './Root';
import { GlobalDataProvider } from '../hooks/useGlobalData';

const App = () => (
  <React.StrictMode>
    <GlobalStyle />
    <GlobalDataProvider>
      <Root />
    </GlobalDataProvider>
  </React.StrictMode>
);

export default App;
