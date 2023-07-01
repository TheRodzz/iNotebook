import './App.css';
import Home from './components/Home'
import About from './components/About'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <h1>iNotebook</h1>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
