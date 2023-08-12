import {LOADER} from '../Services/Type';

const initialState = {
  loader: false,
};

export const LoaderReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;
  switch (type) {
    case LOADER:
      return {
        ...prevState,
        loader: action.loader,
      };
  }
  return prevState;
};
