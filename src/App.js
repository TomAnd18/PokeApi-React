import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from './pages/Home';
import { Details } from "./pages/Details";
// rafc

function App() {
  return (
    <div className="App">
      <Router basename="/PokeApi-React">
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/details/:id' element={ <Details/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
