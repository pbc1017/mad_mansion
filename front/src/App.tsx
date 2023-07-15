import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteSetup from 'routes/RoutesSetup';

function App() {
  return (
    <BrowserRouter>
      <RouteSetup/>
    </BrowserRouter>
  );
}

export default App;
