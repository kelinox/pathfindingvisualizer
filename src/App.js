import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import "./PathVisualizer/PathVisualizer";
import PathVisualizer from "./PathVisualizer/PathVisualizer";
import Tree from "./PathVisualizer/Tree";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import SortPage from "./SortingAlgorithm/SortPage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Typography variant="h6" className={classes.title}>
              Developer cavern
            </Typography>
            <Button>
              <Link to="/">Home</Link>
            </Button>
            <Button>
              <Link to="/pathfinding">Path finding</Link>
            </Button>
            <Button>
              <Link to="/tree">Tree</Link>
            </Button>
            <Button>
              <Link to="/sort">Sort</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Switch>
          <Route path="/pathfinding">
            <PathVisualizer />
          </Route>
          <Route path="/tree">
            <Tree />
          </Route>
          <Route path="/sort">
            <SortPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
