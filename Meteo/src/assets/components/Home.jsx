//importazione di tutti cio di cui ho bisogno per questo component
import React from "react";
import Results from "./Results";
import { useState } from "react";
import { setCity } from "../actions/searchAction";
import { useDispatch } from "react-redux";

/*component HOME con relativa root che attraverso redux raccoglie il dato inserito dall'utente nella sua barra di ricerca e lo 'dispatcha' ai compinenti che ne necessitano.
al click del tasto 'cerca' la funzione parte e visualizza la pagina Result con le previsioni relative al giorno corrente ed un link per visualizzare i giorni successivi 
*/
const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const sendSearch = () => {
    if (search.length > 0) {
      dispatch(setCity(search));
    }
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Inserisci il nome della città"
      />
      <button type="button" onClick={() => sendSearch()}>
        Cerca
      </button>

      <Results></Results>
    </div>
  );
};

export default Home;
