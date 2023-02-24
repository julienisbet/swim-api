import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto';

import App from './App';
import { WorkoutProvider } from './context/WorkoutContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <WorkoutProvider>
      <App />
    </WorkoutProvider>
  </BrowserRouter>
);
