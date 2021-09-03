import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MealsContextProvider from './context/mealsContext';
import DrinksContextProvider from './context/drinksContext';

ReactDOM.render(
  <BrowserRouter>
    <MealsContextProvider>
      <DrinksContextProvider>
        <App />
      </DrinksContextProvider>
    </MealsContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
