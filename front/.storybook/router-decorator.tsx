import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default (story) => (
    <Router>
        <Routes>
            <Route path="*" element = {story() }/>
        </Routes>
    </Router>
);