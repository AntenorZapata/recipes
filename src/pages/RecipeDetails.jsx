import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { ClipLoader } from 'react-spinners';
import { fetchMealById } from '../services/mealsApi';
import { fetchDrinkById } from '../services/drinksApi';
import HeaderDetails from '../components/HeaderDetails';
import Ingredients from '../components/Ingredients';
import Recomendations from '../components/Recomendations';

export default function RecipeDetails() {
  const [showBtn, setShowBtn] = useState(false);
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const { pathname } = useHistory().location;
  const { idMeal, idDrink, strMeal, strYoutube } = recipe;

  useEffect(() => {
    if (pathname.includes('/comidas')) {
      fetchMealById(id).then((data) => setRecipe(...data));
    }
    if (pathname.includes('/bebidas')) {
      fetchDrinkById(id).then((data) => setRecipe(...data));
    }
  }, [id, pathname]);

  useEffect(() => {
    const doneArr = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneArr) {
      setShowBtn(doneArr.some((item) => item.id === id));
    }
  }, [id]);

  const checkInProgrss = () => {
    let inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgress) inProgress = [];
    const categories = Object.keys(inProgress);
    let text = [];
    categories.forEach((item) => {
      text = Object.keys(inProgress[item]);
    });
    if (text.includes(id)) return 'Continuar Receita';
    return 'Iniciar Receita';
  };

  return (
    <div>
      <HeaderDetails recipe={ recipe } pathname={ pathname } />
      {Object.keys(recipe).length ? (
        <main>
          <section className="ingredients">
            <Ingredients recipe={ recipe } />
          </section>
          <div className="instructions">
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>
          <div className="video-container">
            {strMeal && (
              <div>
                <h4>Video</h4>
                <ReactPlayer
                  url={ strYoutube }
                  controls
                  data-testid="video"
                  width="100%"
                  height="85%"
                />
              </div>
            )}
          </div>
          <div className="recomendations">
            <Recomendations strMeal={ strMeal } />
          </div>
          <div className="btn-start-container">
            {!showBtn && (
              <Link
                to={
                  idMeal
                    ? `/comidas/${idMeal}/in-progress`
                    : `/bebidas/${idDrink}/in-progress`
                }
              >
                <button
                  className="btn-start btn-success"
                  type="button"
                  data-testid="start-recipe-btn"
                >
                  {checkInProgrss()}
                </button>
              </Link>
            )}
          </div>
        </main>

      ) : (
        <ClipLoader
          className="cliploader-icon"
          size="120px"
          css="margin: 50% 35%"
        />
      )}
    </div>
  );
}
