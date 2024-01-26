//importazione di tutti cio di cui ho bisogno per questo component
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { GiWindsock } from "react-icons/gi";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { RiWaterPercentFill } from "react-icons/ri";

/*component che, attraverso l'endpoint fornito e i dati che gli vengono mandati dallo stato del search, recupara i dati relativi alle previsioni di oggi. i dati ricevuti verranno utilizzati per popolare la pagina
 */
const Results = () => {
  //questa costante mi serve per recuperare il dato inserito dall'utente, attraverso il cambiamento di stato riportato dalla relativa funzione search di rootReducer che si riferisce alla funzione searchReducer
  const search = useSelector((state) => state.search);

  //questo verrà riempito con i dati provenienti dall'API
  const [city, setCityData] = useState(null);

  //questo riempirà il grafico con i dati provenienti dall'API
  const [chartData, setChartData] = useState(null);

  // GET che recupera i dati dall'API e li inserisce nella costante sopradichiarata (citta), e relativi controlli con eventuale segnalazione di errori qualora i dati non arrivino correttamente
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          search +
          "&units=metric&APPID=a03f37e66ba4c3bdae78d5759287aef7"
      );
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        setCityData(data);

        //aggiunta grafico delle temperature
        const chartData = {
          labels: ["Temp. Max", "Temp. Min", "Temp. Percepita", "Temp. Media"],
          datasets: [
            {
              label: "Temperature",
              data: [
                { label: "Temp. Max", temperature: data.main.temp_max },
                { label: "Temp. Min", temperature: data.main.temp_min },
                { label: "Temperature", temperature: data.main.feels_like },
                { label: "Temp. Feels", temperature: data.main.temp },
              ],
              backgroundColor: [
                "rgb(251, 231, 251, 0.6)",
                "rgb(251, 231, 251, 0.6)",
                "rgb(251, 231, 251, 0.6)",
                "rgb(251, 231, 251, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 205, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };
        setChartData(chartData);
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

  //inizializzo una costante con la data fornita dall'API e la utilizzo per passere il dato ad un'altra costante che con l'utilizzo di Date e del metodo toLocaleString() la 'trasforma' nel formato convenzionale locale gg/mm/aaaa
  const day = city?.dt;
  const printDate = new Date(day * 1000).toLocaleString();

  //creazione dell'HTML corrispondente ai dati sopraelencati
  return (
    <>
      {city && (
        <div className="container">
          <div className="d-flex justify-content-between row">
            <h3 className="col-8">{printDate}</h3>
            <Link to="/Forecast" className="text-white col-4">
              Vai alle previsioni dei prossimi giorni
              <FaArrowRight />
            </Link>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <h2 className="col-6 city">
              {city.name} {city.main.temp}°C
            </h2>
            <div className="col-3"></div>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 descrizione city">
              <h4>{city.weather[0]?.main}</h4>
              <p>{city.weather[0]?.description}</p>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="cardDiv">
            <div className="spazi">
              <div className="d-flex justify-content-evenly prova row">
                <div className="carine col-12 col-md-6">
                  <p>Humidity</p>
                  <RiWaterPercentFill />
                  <p>{city.main.humidity}%</p>
                </div>
                <div className="carine col-12 col-md-6">
                  <p>Wind Speed</p>
                  <GiWindsock />
                  <p>{city.wind.speed}Km/h</p>
                </div>
                <div className="carine col-12 col-md-6">
                  <p>Temp. Max</p>
                  <FaTemperatureArrowUp />
                  <p>{city.main.temp_max}°C</p>
                </div>
                <div className="carine col-12 col-md-6">
                  <p>Temp. Min</p>
                  <FaTemperatureArrowDown />
                  <p>{city.main.temp_min}°C</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row chart">
            {chartData && (
              <BarChart
                width={730}
                height={250}
                data={chartData.datasets[0].data}
                className="grafico"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="temperature" fill="rgba(7, 23, 35, 1)" />
              </BarChart>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Results;
