import './App.css';
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/NoteState';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Alert from './components/Alert';
function App() {
  return (
    <div className="App">
    <NoteState>
      <Router>
      <Navbar/>
      <Alert message="sample alert"/>
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
    </NoteState>
    </div >
  );
}

export default App;
