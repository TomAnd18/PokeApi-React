import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from './pages/Home';
import { Details } from "./pages/Details";
import { Type } from "./components/Type";

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
              <Route path='/' element={ <Home/> }/>
              <Route path='/details/:id' element={ <Details/> }/>
              <Route path='/types/:type' element={ <Type/> }/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
