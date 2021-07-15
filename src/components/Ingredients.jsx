import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useIngredients from '../hooks/useIngredients';

export default function Ingredients({ recipe, radioBtn, setEnableBtn }) {
  const inProgreArr = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { handleIngredients,
    checkedBtn, createIngredientsAndMesure, checkEnableBtn } = useIngredients();
  const [arrChecked, setArrChecked] = useState({});

  const ingredients = createIngredientsAndMesure(recipe, 'ingredients');
  const mesure = createIngredientsAndMesure(recipe, 'mesure');

  useEffect(() => {
    const ingreLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setArrChecked({ ...ingreLocal });
  }, []);

  useEffect(() => {
    if (radioBtn) {
      checkEnableBtn(arrChecked, recipe, setEnableBtn, ingredients);
    }
  }, [arrChecked, checkEnableBtn, ingredients, radioBtn, recipe, setEnableBtn]);

  // if (!ingredients.length) {
  //   return (<ClipLoader
  //     size="120px"
  //     css="margin: 100px 130px"
  //   />);
  // }
  return (
    <div className="ingredients-container">
      <h4 className="ingredients-title">Ingredients</h4>
      {ingredients.map((ingredient, index) => (radioBtn ? (
        <div key={ index } className="ingredients-check">
          <label
            htmlFor="ingre"
            data-testid={ `${index}-ingredient-step` }
            className={ checkedBtn(inProgreArr, index, recipe)
              ? 'checked' : 'no-checked' }
          >
            <input
              className="check-input"
              checked={ checkedBtn(inProgreArr, index, recipe) }
              id={ index }
              value={ index }
              type="checkbox"
              onChange={ (e) => handleIngredients(e, recipe, setArrChecked) }

            />
            {ingredient}
          </label>
        </div>
      ) : (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
          className="ingredient-recipe"
        >
          {ingredient}
          -
          {mesure[index]}
        </p>
      )))}
    </div>
  );
}

Ingredients.defaultProps = {
  radioBtn: null,
  setEnableBtn: null,
};

Ingredients.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  radioBtn: PropTypes.bool,
  setEnableBtn: PropTypes.func,

};
