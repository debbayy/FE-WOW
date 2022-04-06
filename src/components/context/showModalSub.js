//import metodenya
import { createContext, useReducer } from "react";

export const ShowModalContext = createContext();

const initialState = {
  modal: false,
  show: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SHOW_MODAL":
      return {
        modal: true,
        show: payload,
      };
    case "NOT_SHOW":
      return {
        modal: false,
        show: {},
      };
    case "SUBSCRIBE":
      return {
        ...state,
        isSubscribe: payload,
      };
    case "UPDATE":
      return {
        ...state,
        isUpdate: !state.isUpdate,
      };
    default:
      throw new Error();
  }
};

export const ShowContexModal = ({ children }) => {
  const [state, dispacth] = useReducer(reducer, initialState);
  return (
    <ShowModalContext.Provider value={[state, dispacth]}>
      {children}
    </ShowModalContext.Provider>
  );
};
