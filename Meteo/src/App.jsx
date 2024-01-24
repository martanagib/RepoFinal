//importazione di tutti cio di cui ho bisogno
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./assets/components/NotFound";
import Home from "./assets/components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./assets/store/store";
import { Provider } from "react-redux";
import Forecast from "./assets/components/Forecast";

//wrappo tutto nel componente principale dell'app
function App() {
  return (
    <>
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/forecast" element={<Forecast />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </>
  );
}

export default App;
