import React, { createContext, useState } from 'react';

export const IngredientsContext = createContext();

export const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

  const addIngredients = (newIngredients) => {
    setIngredients((prevIngredients) => [...prevIngredients, ...newIngredients]);
  };

  const clearIngredients = () => {
    setIngredients([]);
  };

  return (
    <IngredientsContext.Provider value={{ ingredients, addIngredients, clearIngredients }}>
      {children}
    </IngredientsContext.Provider>
  );
};