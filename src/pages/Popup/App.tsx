import React from 'react';
import ColorProvider from './context/ColorContext';
import Popup from './components/Popup';

const App: React.FC = () => (
  <ColorProvider>
    <Popup />
  </ColorProvider>
);

export default App;
