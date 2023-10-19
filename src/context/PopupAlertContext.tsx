// MyContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define your context type
export type PopupAlertType = {
  title: string | JSX.Element;
  subTitle: string | JSX.Element;
  action: ActionType[];
};

type ActionType = {
  text: string | JSX.Element;
  className?: string;
  onClick?: Function;
};

type Popups = {
  popups: PopupAlertType[];
  newPopup: (popup: PopupAlertType) => void;
  setPopups: React.Dispatch<React.SetStateAction<PopupAlertType[]>>;
};

// Create a context
const PopupAlertContext = createContext<Popups | null>(null);

// Create a custom hook for accessing the context
export const usePopupAlertContext = () => {
  const context = useContext(PopupAlertContext);
  if (!context) {
    throw new Error('usePopupAlertContext must be used within a PopupAlertContextProvider');
  }
  return context;
};

// Create the provider component
export const PopupAlertContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [popups, setPopups] = useState<PopupAlertType[]>([]);

  function newPopup(popup: PopupAlertType) {
    const old = [...popups];
    old.push(popup);
    setPopups(old);
  }

  return <PopupAlertContext.Provider value={{ popups, newPopup, setPopups }}>{children}</PopupAlertContext.Provider>;
};
