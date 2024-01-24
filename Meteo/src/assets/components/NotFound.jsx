//pagina che viene visualizzata dall'utente qualora venga inserita un path non corrispondente a nessuna Route

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <p>Pagina non trovata!</p>
      <Link to="/">Torna alla home</Link>
    </div>
  );
};

export default NotFound;
