import React, { Component } from "react";
import TreeNode from "./Tree/TreeNode";
import TreeNodeComponent from "./Tree/Node";
import "./Tree.css";

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      root: undefined,
      newData: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.draw = this.draw.bind(this);
  }

  render() {
    return (
      <div>
        <div className="actions">
          <input
            type="number"
            value={this.state.newData}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Insert</button>
        </div>
        <div className="tree">
          {this.draw(this.state.root, false, 400).map((e, index) => (
            <TreeNodeComponent
              key={index}
              data={e.data}
              top={e.top}
              left={e.left}
            />
          ))}
        </div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ newData: event.target.value });
  }

  handleSubmit() {
    const parsed = parseInt(this.state.newData);

    if (isNaN(parsed)) return;

    if (this.state.root === undefined) {
      this.setState(
        {
          root: new TreeNode(parsed, 0),
        },
        () => {
          this.draw();
        }
      );
    } else {
      let { root } = this.state;
      const newRoot = root.insert(parsed, 0);
      this.setState({ root: newRoot });
    }

    this.setState({ newData: "" });
  }

  draw(node, isLeft, parentLeft) {
    let nodes = [];

    if (node !== undefined) {
      const xOffset = isLeft ? -1 : 1;
      let left = parentLeft + xOffset * this.getSpaceBetweenNode(node.level);
      nodes.push({
        data: node.data,
        top: node.level * 45,
        left: left,
      });
      nodes = nodes.concat(this.draw(node.leftNode, true, left));
      nodes = nodes.concat(this.draw(node.rightNode, false, left));
    }

    return nodes;
  }

  getSpaceBetweenNode(level) {
    if (level === 0) return 400;
    else return 300 / level;
  }
}

export default Tree;
