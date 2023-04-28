import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
// import Nav from './components/Nav';
import { Home } from './pages/Home';
import { Details } from "./pages/Details";
// rafc

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Nav/> */}
        <Routes>
          <Route exact path='/PokeApi-React/' element={ <Home/> }/>
          <Route exact path='/PokeApi-React/details/:id' element={ <Details/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
