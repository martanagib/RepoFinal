import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// importazione nello store di rootReduce che contiene a sua volta tutti i reducers utilizzati.
// in questo modo i dati vengono immagazinati all'interno dello store stesso che li passerà poi al componente che ne necessita
