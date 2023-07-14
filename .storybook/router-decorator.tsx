import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const routerDecorator = (Story) => (
  <Router>
    <Switch>
      <Route path="*">
        <Story />
      </Route>
    </Switch>
  </Router>
);

export default routerDecorator;