import React, { Component } from "react";
import "./PathVisualizer.css";
import Node from "./Node/Node";
import Dijsktra from "./Algorithm/Dijkstra";
import AStar from "./Algorithm/AStar";

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
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  componentDidMount() {
    this.createGraph();
  }

  render() {
    const { nodes } = this.state;

    return (
      <div>
        <div id="header">
          <button onClick={this.dijsktra.bind(this)}>Dijsktra</button>
          <button onClick={this.aStar.bind(this)}>A Star</button>
          <button onClick={this.reset.bind(this)}>Reset</button>
        </div>
        <div id="actions">
          <input
            type="checkbox"
            id="obstacle"
            name="obstacle"
            onChange={this.handleObstacleCheck.bind(this)}
          />
          <label htmlFor="obstacle">Add obstacles</label>
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
      </div>
    );
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
      console.log("test");
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
    this.createGraph();
  }

  aStar() {
    const { nodes, start, end } = this.state;
    let visited = this.state.aStar.execute(nodes, start, end);

    this.updateNodesAStar(visited);
  }

  dijsktra() {
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
