import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const routerDecorator = (story) => (
    <Router>
        <Routes>
            <Route path="*" element = {story() }/>
        </Routes>
    </Router>
);

export default routerDecorator;