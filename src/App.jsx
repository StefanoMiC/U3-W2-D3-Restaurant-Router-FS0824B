import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import menu from "./data/menu.json";
import TopBar from "./components/TopBar";
import Home from "./components/Home";
import Counter from "./components/Counter";
import ReservationForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";
import NotFound from "./components/NotFound";
import MenuList from "./components/MenuList";
import PastaDetails from "./components/PastaDetails";

// ROUTING IN REACT

// per fare in modo di poter avere un cambio di pagina in una SPA (Single Page Application) mi dovrò avvalere di un sistema che mi renderizzi
// in maniera CONDIZIONALE i componenti a partire da un indirizzo URL, in modo che tali componenti riflettano il cambiamento di pagina (seppure virtuale)

// questo è il motivo per cui abbiamo implementato il pacchetto react-router-dom che ci aiuterà a gestire le dinamiche di un cambio pagina
// sempre a partire da segmenti presenti nella URL

// a questo punto dovremmo importare 3 componenti fondamentali per il funzionamento di questa meccanica: BrowserRouter, Routes, Route.

// 1) BrowserRouter permette agli altri due di funzionare: lo inseriremo come CORNICE DI TUTTO il contenuto di App.jsx
// 2) Routes sarà il secondo componente da utilizzare DENTRO a BrowserRouter (l'ordine è importante). Potremo usare un Routes solo se avremo un BrowserRouter esterno.
// Con Routes delimiteremo solamente il contenuto che vorremo effetivamente rendere DINAMICO (visibile condizionalmente),
// quindi delle rotte singole che attiveranno il proprio componente nel venire renderizzato.
// 3) Route quindi è un componente che può esistere SOLO DENTRO Routes e dovrà contenere il nostro componente da renderizzare per uno specifico PATH

const App = () => (
  <BrowserRouter
    future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true
    }}
  >
    <TopBar claim="Niente secondi piatti!" />
    <Routes>
      <Route path="/" element={<Home menu={menu} />} />
      <Route path="/prenotazioni" element={<ReservationList title="Prenotazioni" />} />
      <Route path="/prenota-tavolo" element={<ReservationForm title="Prenota un tavolo" />} />
      <Route path="/menu" element={<MenuList menu={menu} />} />
      {/* il valore che inseriamo dopo i due punti viene considerato un valore dinamico
        potrà essere letteralmente qualsiasi cosa, e sarà poi un valore recuperabile all'interno del componente
      */}
      <Route path="/menu/dettagli/:pastaId/" element={<PastaDetails menu={menu} />} />

      <Route path="/counter" element={<Counter />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
