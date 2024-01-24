import { combineReducers } from "@reduxjs/toolkit";
import utenteReducers from "./utenteReducers";

const rootReducer = combineReducers({
    utente: utenteReducers
})

export default rootReducer

//componente che raggruppa al suo interno tutti i reducer e che verrà passato allo store