import React, { useEffect }  from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteSetup from 'routes/RoutesSetup';
import { LoginProvider } from 'contexts/LoginContext';

const App: React.FC = () => {
  return (
    <LoginProvider>
      <BrowserRouter>
        <RouteSetup/>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
