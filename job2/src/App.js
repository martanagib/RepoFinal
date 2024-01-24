import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainSearch from "./assets/components/MainSearch";
import CompanySearchResults from "./assets/components/CompanySearchResults";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import Favorites from "./assets/components/Favorites";
import store from "./assets/store/store";

function App() {
  return (
    <Provider store= {store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSearch />} />
        <Route path="/:company" element={<CompanySearchResults />} />
        <Route path='/favorites' element= {<Favorites />} /> 
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
