import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import "./PathVisualizer/PathVisualizer";
import PathVisualizer from "./PathVisualizer/PathVisualizer";
import Tree from "./PathVisualizer/Tree";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pathfinding">Path finding</Link>
          </li>
          <li>
            <Link to="/tree">Tree</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Switch>
          <Route path="/pathfinding">
            <PathVisualizer />
          </Route>
          <Route path="/tree">
            <Tree />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
