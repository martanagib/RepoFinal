import {SET_CITY} from '../actions/searchAction'

const searchReducer = (state = "", action) => {
  switch (action.type) {
    case SET_CITY:
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;

//in questo caso unico reducer del progetto. tiene traccia di ogni cambiamento di stato legato alla barra di ricerca e ne passa il contenuto ai componenti che ne necessitano attraverso lo store
