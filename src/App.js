import React from 'react';
import { StoreProvider } from './store';
import Setup from './Setup';

function App() {
  // record example: https://github.com/naomiaro/waveform-playlist/blob/master/ghpages/js/record.js
  return (
    <StoreProvider>
      <Setup />
    </StoreProvider>
  );
}

export default App;
