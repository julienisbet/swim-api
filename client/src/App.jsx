import { Grommet } from 'grommet';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';

import './App.css';
import New from './components/workouts/New';
import Edit from './components/workouts/Edit';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

export default function App() {
  return (
    <>
      <Grommet theme={theme} full>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts/new" element={<New />} />
          <Route path="/workouts/:id/edit" element={<Edit />} />
        </Routes>
      </Grommet>
    </>
  );
}
