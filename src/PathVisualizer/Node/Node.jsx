import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraClass: props.isStart
        ? "starting-node"
        : props.isEnd
        ? "ending-node"
        : "",
    };
  }

  render() {
    let color = "";
    if (this.props.obstacle) {
      color = "obstacle";
    } else if (this.props.isInPath) {
      color = "node-in-path";
    } else if (this.props.distanceToStart !== Number.MAX_SAFE_INTEGER) {
      color = "visited";
    }

    return (
      <div
        className={`node ${this.state.extraClass} ${color}`}
        onClick={this.handleClick.bind(this)}
      ></div>
    );
  }

  handleClick() {
    this.props.onClick(this.props.row, this.props.col);
  }
}

export default Node;
