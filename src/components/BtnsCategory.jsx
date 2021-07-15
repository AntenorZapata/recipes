import React from 'react';
import PropTypes from 'prop-types';
import { useMealsContext } from '../context/mealsContext';
import { useDrinksContext } from '../context/drinksContext';

export default function BtnsCategory({ label, title }) {
  const { strCategory } = label;
  const { setValueMealsInput, valueMealsInput,
    setValueMealInputByIngre } = useMealsContext();
  const { serValueDrinksInput, valueDrinksInput,
    setValueDrinksInputByIngre } = useDrinksContext();

  const handleFilterByCategory = ({ target: { value } }) => {
    if (title === 'Comidas') {
      if (valueMealsInput !== value && value !== 'All') {
        setValueMealsInput(value);
      } else {
        setValueMealsInput('');
      }
      setValueMealInputByIngre('');
    }
    if (title === 'Bebidas') {
      if (valueDrinksInput !== value && value !== 'All') {
        serValueDrinksInput(value);
      } else {
        serValueDrinksInput('');
      }
      setValueDrinksInputByIngre('');
    }
  };

  return (
    <div className="btns-category">
      <button
        type="button"
        value={ strCategory }
        data-testid={ `${strCategory}-category-filter` }
        onClick={ handleFilterByCategory }
        className="btn btn-success"
      >
        {strCategory}
      </button>
    </div>
  );
}

BtnsCategory.propTypes = {
  label: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
};
