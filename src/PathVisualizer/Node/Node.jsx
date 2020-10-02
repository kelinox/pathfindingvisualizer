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
    const color =
      this.props.distanceToStart !== Number.MAX_SAFE_INTEGER ? "visited" : "";
    return <div className={`node ${this.state.extraClass} ${color}`}></div>;
  }
}

export default Node;
