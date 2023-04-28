import { BrowserRouter as Router, Route, Routes, HashRouter } from "react-router-dom";
import './App.css';
import { Home } from './pages/Home';
import { Details } from "./pages/Details";
// rafc

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Router basename="/PokeApi-React">
          <Routes>
            <Route path='/' element={ <Home/> }/>
            <Route path='/details/:id' element={ <Details/> }/>
          </Routes>
        </Router>
      </HashRouter>
    </div>
  );
}

export default App;
