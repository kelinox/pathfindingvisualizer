class Dijkstra {
  constructor() {
    this.graph = [];
    this.end = [];
    this.start = [];
  }

  /**
   * Execute dijsktra algorithm and return an array of all the nodes in the graph
   * with the updated distance to the starting point and if it has been visited or not
   * @param {int[][]} nodes Array with the rows and columns of the graph
   * @param {int[]} start Array with the coordinates of the starting node (row, column)
   * @param {int[]} end Array with the coordinates of the ending node (row, column)
   */
  execute(nodes, start, end) {
    this.start = start;
    this.end = end;
    this.graph = this.createGraph(nodes);
    this.graph[start[0] * 50 + start[1]].distanceToStart = 0;
    let currentNode = this.getClosestNodeToStart(this.graph);
    const endNode = this.graph[end[0] * 50 + end[1]];
    const visitedNodes = [];

    while (currentNode !== endNode) {
      var neighbors = this.getNeighbors(currentNode);

      for (let i = 0; i < neighbors.length; i++) {
        if (start[0] !== neighbors[i][0] || start[1] !== neighbors[i][1]) {
          let n = this.graph[neighbors[i][0] * 50 + neighbors[i][1]];

          if (!n.obstacle && n.distanceToStart === Number.MAX_SAFE_INTEGER)
            this.graph[neighbors[i][0] * 50 + neighbors[i][1]].distanceToStart =
              currentNode.distanceToStart + 1;
        }
      }
      currentNode.visited = true;
      visitedNodes.push(currentNode);
      currentNode = this.getClosestNodeToStart(this.graph);
    }

    return visitedNodes;
  }

  /**
   * Get the path from the starting node to the ending node
   */
  getPathFromStartToEnd() {
    let currentNode = this.graph[this.end[0] * 50 + this.end[1]];
    let startNode = this.graph[this.start[0] * 50 + this.start[1]];
    const path = [];
    console.log(this.end[0] * 50 + this.end[1]);

    while (currentNode !== startNode) {
      path.push(currentNode);

      currentNode = this.getClosestNeighbor(this.graph, currentNode);
    }

    return path;
  }

  /**
   * Create an int[] of all the nodes in the graph
   * @param {int[][]} nodes Array with the row and columns composing the graph
   */
  createGraph(nodes) {
    var graph = [];
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        graph.push({
          distanceToStart: nodes[row][col].distanceToStart,
          visited: false,
          col: nodes[row][col].col,
          row: nodes[row][col].row,
          obstacle: nodes[row][col].obstacle,
        });
      }
    }
    return graph;
  }

  /**
   * Get the nodes with the shortest distance to the starting node
   * @param {int[]} nodes The nodes in the graph
   */
  getClosestNodeToStart(nodes) {
    var unvisited = [];
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (nodes[row * 50 + col].visited === false)
          unvisited.push(nodes[row * 50 + col]);
      }
    }

    return unvisited.sort((a, b) => a.distanceToStart - b.distanceToStart)[0];
  }

  /**
   * Retrieve the node with the shortest distance to the starting point for a given node
   * @param {int[]} nodes All nodes in the graph
   * @param {any} node Current node
   */
  getClosestNeighbor(nodes, node) {
    const neighbors = this.getNeighbors(node);
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

  /**
   * Get the coordinates of all the neighbors for a given node
   * @param {any} node Current node
   */
  getNeighbors(node) {
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
}

export default Dijkstra;
