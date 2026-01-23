import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Guide from './pages/Guide';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide" element={<Guide />} />
            {/* Fallback to Home for unknown routes */}
            <Route path="*" element={<Home />} />
        </Routes>
    );
};

export default App;
