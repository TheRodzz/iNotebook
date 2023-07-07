import './App.css';
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/NoteState';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <NoteState>
      <Router basename={process.env.PUBLIC_URL}>
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
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </NoteState>
    </div >
  );
}

export default App;
