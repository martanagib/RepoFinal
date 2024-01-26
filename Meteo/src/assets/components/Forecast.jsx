//importazione di tutti cio di cui ho bisogno per questo component
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { LiaClockSolid } from "react-icons/lia";
import { FaTemperatureLow } from "react-icons/fa";

/*component che, attraverso l'endpoint fornito e i dati che gli vengono mandati dallo stato del search, recupara i dati relativi alle previsioni dei prossimi 5 giorni (ognuno dei quali diviso in fasce orarie ogni 3 ore).                         i dati ricevuti verranno utilizzati per popolare la pagina
 */

const Forecast = () => {
  //questa costante mi serve per recuperare il dato inserito dall'utente, attraverso il cambiamento di stato riportato dalla relativa funzione search di rootReducer che si riferisce alla funzione searchReducer
  const search = useSelector((state) => state.search);

  //questo verrà riempito con i dati provenienti dall'API
  const [citta, setCitta] = useState(null);

  // GET che recupera i dati dall'API e li inserisce nella costante sopradichiarata (citta), e relativi controlli con eventuale segnalazione di errori qualora i dati non arrivino correttamente
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          search +
          "&units=metric&APPID=a03f37e66ba4c3bdae78d5759287aef7"
      );
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        setCitta(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //funzione che triggera la funzione precedente solo se la barra di ricerca non è null e contiene più di 2 caratteri
  useEffect(() => {
    if (search?.length > 2) fetchData();
  }, [search]);

  //dal momento che l'API restituisce le previsioni con intervallo di 3 ore per ogni giorno, con questa funzione recupero i dati corrispondenti a 8 fasce orarie per ogni giorno, per un totale di 3 giorni a partire da domani
  const dayByDay = () => {
    const groupedData = {};

    citta.list.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString();
      if (!groupedData[day]) {
        groupedData[day] = [];
      }
      groupedData[day].push(forecast);
    });
    return Object.keys(groupedData)
      .slice(1, 4)
      .map((day) => ({
        day,
        forecasts: groupedData[day],
      }));
  };

  //creazione dell'HTML corrispondente ai dati sopraelencati
  return (
    <>
      {citta && citta.list && (
        <div className="margine container">
          <div className="row">
            <h2 className="citta col">{citta?.city.name}</h2>
          </div>
          <div className="destra row">
            <Link className="text-white" to="/">
              Vai alla previsioni di oggi
              <FaArrowRight />
            </Link>
          </div>

          <div>
            {dayByDay().map((dayData, index) => (
              <div key={index}>
                <div className="row">
                  <h3 className="data">{dayData.day}</h3>
                </div>
                <div className="row">
                  <div className="d-flex  flex-wrap justify-content-between col-xs-6">
                    {dayData.forecasts.map((cit, i) => (
                      <div key={i}>
                        <div className="carine">
                          <LiaClockSolid />
                          <p>{new Date(cit.dt * 1000).toLocaleTimeString()}</p>
                          <FaTemperatureLow />
                          <p>{cit.main.temp}°C</p>

                          <p>{cit.weather[0].main}</p>
                          <p>{cit.weather[0].description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Forecast;
