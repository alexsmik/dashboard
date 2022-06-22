import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e) => {
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{activeMenu,
    handleClick, isClicked, initialState, setIsClicked, setActiveMenu,
    setMode, setColor,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
