import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {QuoteProvider} from './contexts/QuoteContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <QuoteProvider>
            <App/>
        </QuoteProvider>
    </React.StrictMode>
);
