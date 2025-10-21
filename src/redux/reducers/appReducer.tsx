import moment from 'moment';
import { AppState } from '../types';
import { SET_TOP, SET_LANGUAGE, SET_CREATED_FROM } from '../types';

const initialState: AppState = {
  top: 50,
  language: 'TypeScript',
  createdFrom: moment().subtract(1, 'year').format('YYYY-MM-DD'),
};

export const appReducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    case SET_TOP:
      return { ...state, top: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_CREATED_FROM:
      return { ...state, createdFrom: action.payload };
    default:
      return state;
  }
};
