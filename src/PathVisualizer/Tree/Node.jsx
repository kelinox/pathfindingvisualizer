import React, { Component } from "react";
import "./Node.css";

class TreeNodeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let style = {
      top: this.props.top,
      left: this.props.left,
    };
    return (
      <div className="treeNode" style={style}>
        {this.props.data}
      </div>
    );
  }
}

export default TreeNodeComponent;
