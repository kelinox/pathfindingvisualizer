import React, { Component } from "react";
import "./PathVisualizer.css";
import Node from "./Node/Node";

class PathVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      start: [4, 15],
      end: [4, 30],
      addObstacles: false,
    };

    this.handleClick = this.handleClick.bind(this);
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
        <div id="grid">
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

  handleObstacleCheck(e) {
    const addObstacles = e.target.checked;
    this.setState({ addObstacles });
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

  dijsktra() {
    const { start, end } = this.state;
    const nodes = this.getNodesForDijsktra();
    nodes[start[0] * 50 + start[1]].distanceToStart = 0;
    let currentNode = this.getMinNode(nodes);
    const endNode = nodes[end[0] * 50 + end[1]];
    const visitedNodes = [];

    while (currentNode !== endNode) {
      var neighbors = this.getNeighbor(currentNode);

      for (let i = 0; i < neighbors.length; i++) {
        if (start[0] !== neighbors[i][0] || start[1] !== neighbors[i][1]) {
          let n = nodes[neighbors[i][0] * 50 + neighbors[i][1]];

          if (!n.obstacle && n.distanceToStart === Number.MAX_SAFE_INTEGER)
            nodes[neighbors[i][0] * 50 + neighbors[i][1]].distanceToStart =
              currentNode.distanceToStart + 1;
        }
      }
      currentNode.visited = true;
      visitedNodes.push(currentNode);
      currentNode = this.getMinNode(nodes);
    }
    this.updateNodes(visitedNodes);
  }

  getNodesForDijsktra() {
    var nodes = [];
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        nodes.push({
          distanceToStart: this.state.nodes[row][col].distanceToStart,
          visited: false,
          col: this.state.nodes[row][col].col,
          row: this.state.nodes[row][col].row,
          obstacle: this.state.nodes[row][col].obstacle,
        });
      }
    }
    return nodes;
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

  getVisitedNodes(nodes) {
    var visited = [];
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (nodes[row * 50 + col].visited) visited.push(nodes[row * 50 + col]);
      }
    }

    return visited;
  }

  getMinNode(nodes) {
    var unvisited = [];
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (nodes[row * 50 + col].visited === false)
          unvisited.push(nodes[row * 50 + col]);
      }
    }

    return unvisited.sort((a, b) => a.distanceToStart - b.distanceToStart)[0];
  }

  getNeighbor(node) {
    if (node.row === 0 && node.col === 0) {
      return [
        [node.row, node.col + 1],
        [node.row + 1, node.col],
      ];
    } else if (node.col === 0 && node.row === 19) {
      return [
        [node.row, node.col + 1],
        [node.row - 1, node.col],
      ];
    } else if (node.row === 0) {
      return [
        [node.row, node.col - 1],
        [node.row, node.col + 1],
        [node.row + 1, node.col],
      ];
    } else if (node.col === 0) {
      return [
        [node.row, node.col + 1],
        [node.row - 1, node.col],
        [node.row + 1, node.col],
      ];
    } else if (node.row === 19) {
      return [
        [node.row, node.col - 1],
        [node.row, node.col + 1],
        [node.row - 1, node.col],
      ];
    } else if (node.col === 49) {
      return [
        [node.row, node.col - 1],
        [node.row - 1, node.col],
        [node.row + 1, node.col],
      ];
    }

    return [
      [node.row, node.col - 1],
      [node.row, node.col + 1],
      [node.row - 1, node.col],
      [node.row + 1, node.col],
    ];
  }

  getNode(nodes, row, col) {
    return nodes[row * 50 + col];
  }

  getPathFromStartToEnd() {
    const nodes = this.getNodesForDijsktra();
    let currentNode = nodes[this.state.end[0] * 50 + this.state.end[1]];
    let startNode = nodes[this.state.start[0] * 50 + this.state.start[1]];
    const path = [];

    while (currentNode !== startNode) {
      path.push(currentNode);

      currentNode = this.getClosestNeighbor(nodes, currentNode);
    }

    for (let i = path.length - 1; i >= 0; i--) {
      setTimeout(() => {
        const { nodes } = this.state;
        nodes[path[i].row][path[i].col].isInPath = true;
        this.setState({ nodes });
      }, 100 * (i - path.length));
    }
  }

  getClosestNeighbor(nodes, node) {
    const neighbors = this.getNeighbor(node);
    let closest = nodes[neighbors[0][0] * 50 + neighbors[0][1]];
    for (let i = 1; i < neighbors.length; i++) {
      if (
        closest.distanceToStart >
        nodes[neighbors[i][0] * 50 + neighbors[i][1]].distanceToStart
      )
        closest = nodes[neighbors[i][0] * 50 + neighbors[i][1]];
    }

    return closest;
  }
}

export default PathVisualizer;
