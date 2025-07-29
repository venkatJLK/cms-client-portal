
import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes/routes';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const element = useRoutes(routes);
  return <>{element}</>;
}

export default App;
