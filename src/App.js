import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from './pages/Home';
import { Details } from "./pages/Details";
// rafc

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path='/' element={ <Home/> }/>
              <Route path='/details/:id' element={ <Details/> }/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
