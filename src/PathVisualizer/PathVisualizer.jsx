import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PathVisualizer.css";
import Node from "./Node/Node";
import Dijsktra from "./Algorithm/Dijkstra";
import AStar from "./Algorithm/AStar";

import { Button, Tab, Tabs, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class PathVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      start: [4, 15],
      end: [6, 37],
      addObstacles: false,
      mouseDown: false,
      dijkstra: new Dijsktra(),
      aStar: new AStar(),
      tabsValue: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    this.createGraph();
  }

  render() {
    const { nodes } = this.state;

    return (
      <div className="app">
        <div id="header">
          <Button
            color="primary"
            variant="contained"
            onClick={this.dijsktra.bind(this)}
          >
            Dijsktra
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.aStar.bind(this)}
          >
            A Star
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.reset.bind(this)}
          >
            Reset
          </Button>
        </div>
        <div id="actions">
          <FormControlLabel
            control={
              <Switch
                checked={this.state.addObstacles}
                onChange={this.handleObstacleCheck.bind(this)}
                name="checkedB"
                color="primary"
              />
            }
            label="Add obstacle"
          />
        </div>
        <div
          id="grid"
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
        >
          {nodes.map((row, index) => {
            return (
              <div key={index} className="column">
                {row.map((node, nodeIndex) => {
                  return (
                    <Node
                      key={nodeIndex}
                      isStart={node.isStart}
                      isEnd={node.isEnd}
                      distanceToStart={node.distanceToStart}
                      isInPath={node.isInPath}
                      onClick={this.handleClick}
                      row={node.row}
                      col={node.col}
                      obstacle={node.obstacle}
                      onMouseOver={this.handleMouseOver}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="blog">
          <div className="blog-tabs">
            <Tabs
              centered
              value={this.state.tabsValue}
              onChange={this.handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Dijkstra" />
              <Tab label="A Star" />
            </Tabs>
          </div>
          <div className="blog-content">
            <TabPanel value={this.state.tabsValue} index={0}>
              <Typography variant="h4">Introduction</Typography>
              <Typography variant="h6">Description</Typography>
              <div className="blog-body">
                There is a set of problems in computer science that require us
                to find the shortest path between a set of points. The
                applications are numerous and commonplace — from satellite
                navigation to internet packet routing; even finding the shortest
                length of wire needed to connect pins on a circuit board is an
                example of a shortest path problem. Seeing as this type of
                problem arises so frequently, there are some standard algorithms
                that can be used to find a solution. One of these is known as
                Dijkstra’s algorithm. It was designed by Dutch physicist Edsger
                Dijkstra in 1956, when he thought about how he might calculate
                the shortest route from Rotterdam to Groningen.
              </div>
              <Typography variant="h6">Algorithm</Typography>
              <div className="blog-body">
                The steps of the algorithm are describe below:
                <ul>
                  <li>
                    Mark your selected initial node with a current distance of 0
                    and the rest with infinity.
                  </li>
                  <li>
                    Set the non-visited node with the smallest current distance
                    as the current node C.
                  </li>
                  <li>
                    For each neighbour N of your current node C: add the current
                    distance of C with the weight of the edge connecting C-N. If
                    it's smaller than the current distance of N, set it as the
                    new current distance of N.
                  </li>
                  <li>Mark the current node C as visited.</li>
                  <li>If there are non-visited nodes, go to step 2.</li>
                </ul>
              </div>
              <Typography variant="h4">Code</Typography>
              <div className="blog-body">
                We will see here a possible implementation of the Dijkstra
                algorithm using the javascript language. The code will be the
                one used on this website. You can easily use that code base in
                your prefered coding language as it is not using any complex
                data structure.
                <br />
                First, we will start by create a class named Dijkstra which will
                contain all the logic.
              </div>
              <pre>
                <code>
                  {`
class Dijkstra { 
  execute(nodes, start, end) {}
}`}
                </code>
              </pre>
            </TabPanel>
            <TabPanel value={this.state.tabsValue} index={1}>
              <Typography variant="h3">Introduction</Typography>
              <div className="blog-body">
                Another pathfinding solution, the A* search algorithm, builds on
                the principles of Dijkstra’s. It adds some functionality that
                makes it much better at finding the path between a source and a
                target. Dijkstra’s algorithm is really good at finding the
                shortest paths to all of the nodes in a graph. However, when
                finding a target node, it is designed to always follow the node
                with the shortest path in its unvisited list, regardless of
                where that node is in relation to the target. This leads to some
                unnecessary computation of paths that are technically shorter,
                but are not closer to the target.
              </div>
            </TabPanel>
          </div>
        </div>
      </div>
    );
  }

  handleTabChange(event, newValue) {
    console.log(newValue);
    this.setState({ tabsValue: newValue });
  }

  handleMouseDown() {
    this.setState({
      mouseDown: true,
    });
  }

  handleMouseUp() {
    this.setState({
      mouseDown: false,
    });
  }

  handleObstacleCheck(e) {
    const addObstacles = e.target.checked;
    this.setState({ addObstacles });
  }

  handleMouseOver(row, col) {
    const { nodes } = this.state;
    if (
      this.state.addObstacles &&
      this.state.mouseDown &&
      !nodes[row][col].obstacle
    ) {
      nodes[row][col].obstacle = true;
      this.setState({ nodes });
    }
  }

  handleClick(row, col) {
    const { nodes } = this.state;
    if (this.state.addObstacles) {
      nodes[row][col].obstacle = true;
      this.setState({ nodes });
    }
  }

  createGraph() {
    const nodes = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          col,
          row,
          isStart: row === this.state.start[0] && col === this.state.start[1],
          isEnd: row === this.state.end[0] && col === this.state.end[1],
          distanceToStart: Number.MAX_SAFE_INTEGER,
          visited: false,
          isInPath: false,
          obstacle: false,
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes });
  }

  reset() {
    const { nodes } = this.state;
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        nodes[row][col].visited = false;
        nodes[row][col].distanceToStart = Number.MAX_SAFE_INTEGER;
        nodes[row][col].isInPath = false;
      }
    }
    this.setState({ nodes });
  }

  aStar() {
    this.reset();
    const { nodes, start, end } = this.state;
    let visited = this.state.aStar.execute(nodes, start, end);

    this.updateNodesAStar(visited);
  }

  dijsktra() {
    this.reset();
    const { nodes, start, end } = this.state;
    let visitedNodes = this.state.dijkstra.execute(nodes, start, end);
    this.updateNodes(visitedNodes);
  }

  updateNodesAStar(visitedNodes) {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const { nodes } = this.state;
        nodes[visitedNodes[i].row][visitedNodes[i].col] = visitedNodes[i];
        this.setState({ nodes });

        if (i === visitedNodes.length - 1) this.getPathFromStartToEndAStar();
      }, 5 * i);
    }
  }

  updateNodes(visitedNodes) {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const { nodes } = this.state;
        nodes[visitedNodes[i].row][visitedNodes[i].col] = visitedNodes[i];
        this.setState({ nodes });

        if (i === visitedNodes.length - 1) this.getPathFromStartToEnd();
      }, 5 * i);
    }
  }

  getPathFromStartToEnd() {
    let path = this.state.dijkstra.getPathFromStartToEnd();

    for (let i = path.length - 1; i >= 0; i--) {
      setTimeout(() => {
        const { nodes } = this.state;
        nodes[path[i].row][path[i].col].isInPath = true;
        this.setState({ nodes });
      }, 100 * (i - path.length));
    }
  }

  getPathFromStartToEndAStar() {
    let path = this.state.aStar.getPathFromStartToEnd();

    for (let i = path.length - 1; i >= 0; i--) {
      setTimeout(() => {
        const { nodes } = this.state;
        nodes[path[i].row][path[i].col].isInPath = true;
        this.setState({ nodes });
      }, 100 * (i - path.length));
    }
  }
}

export default PathVisualizer;
