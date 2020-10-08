import React, { Component } from "react";
import TreeNode from "./Tree/TreeNode";
import TreeNodeComponent from "./Tree/Node";
import "./Tree.css";

import { Button, TextField } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      root: undefined,
      newData: "",
      logs: [],
      autoBalance: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.draw = this.draw.bind(this);
    this.inorderSort = this.inorderSort.bind(this);
    this.postorderSort = this.postorderSort.bind(this);
    this.preorderSort = this.preorderSort.bind(this);
    this.handleBalancedCheck = this.handleBalancedCheck.bind(this);
    this.reset = this.reset.bind(this);
  }

  render() {
    return (
      <div>
        <div className="actions">
          <TextField
            size="small"
            type="number"
            variant="outlined"
            value={this.state.newData}
            onChange={this.handleChange}
          />
          <Button
            color="secondary"
            variant="contained"
            onClick={this.handleSubmit}
          >
            Insert
          </Button>
        </div>
        <div className="actions">
          <Button
            color="primary"
            variant="contained"
            onClick={this.inorderSort}
          >
            Inorder sort
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.preorderSort}
          >
            Preorder sort
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.postorderSort}
          >
            Postorder sort
          </Button>
          <Button color="primary" variant="outlined" onClick={this.reset}>
            Reset
          </Button>
        </div>
        <div className="autoSort">
          <FormControlLabel
            control={
              <Switch
                checked={this.state.autoBalance}
                onChange={this.handleBalancedCheck}
                name="checkedB"
                color="primary"
              />
            }
            label="Auto balanced tree"
          />
        </div>
        <div className="content">
          <div className="tree">
            {this.draw(this.state.root, 0, false, 300).map((e, index) => (
              <TreeNodeComponent
                key={index}
                data={e.data}
                top={e.top}
                left={e.left}
              />
            ))}
          </div>
          <div className="console">
            {this.state.logs.map((e, index) => {
              let type = "";
              let typeClass = "";
              switch (e.type) {
                case 0:
                  type = "Inorder";
                  typeClass = "inorder";
                  break;
                case 1:
                  type = "Preorder";
                  typeClass = "preorder";
                  break;
                case 2:
                  type = "Postorder";
                  typeClass = "postorder";
                  break;
                case 3:
                  type = "Added";
                  typeClass = "added";
                  break;
                case 4:
                  type = "Reseted";
                  typeClass = "reset";
                  break;

                default:
                  break;
              }

              return (
                <div className="logItem" key={index}>
                  <div className={`logType ${typeClass}`}>{type}</div>
                  <p>{e.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  reset() {
    this.setState({ root: undefined }, () => {
      this.setLogs([
        {
          text: "Reset tree",
          type: 4,
        },
      ]);
    });
  }

  inorderSort() {
    const path = [];
    this.state.root.inorderSort(path);

    this.setLogs(
      path.map((p) => {
        return {
          text: `Path through node ${p}`,
          type: 0,
        };
      })
    );
  }

  preorderSort() {
    const path = [];
    this.state.root.preorderSort(path);

    this.setLogs(
      path.map((p) => {
        return {
          text: `Path through node ${p}`,
          type: 1,
        };
      })
    );
  }

  postorderSort() {
    const path = [];
    this.state.root.postorderSort(path);

    this.setLogs(
      path.map((p) => {
        return {
          text: `Path through node ${p}`,
          type: 2,
        };
      })
    );
  }

  handleChange(event) {
    this.setState({ newData: event.target.value });
  }

  handleBalancedCheck(event) {
    this.setState({ autoBalance: event.target.checked });
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
      const newRoot = root.insert(parsed, this.state.autoBalance);
      this.setState({ root: newRoot });
    }

    this.setLogs([
      {
        type: 3,
        text: `Add data ${parsed}`,
      },
    ]);

    this.setState({ newData: "" });
  }

  draw(node, level, isLeft, parentLeft) {
    let nodes = [];

    if (node !== undefined) {
      const xOffset = isLeft ? -1 : 1;
      let left = parentLeft + xOffset * this.getSpaceBetweenNode(level);
      nodes.push({
        data: node.data,
        top: level * 45,
        left: left,
      });
      level++;
      nodes = nodes.concat(this.draw(node.leftNode, level, true, left));
      nodes = nodes.concat(this.draw(node.rightNode, level, false, left));
    }

    return nodes;
  }

  setLogs(newlogs) {
    const logs = newlogs.concat(this.state.logs);
    this.setState({ logs });
  }

  getSpaceBetweenNode(level) {
    if (level === 0) return 300;
    else return 200 / level;
  }
}

export default Tree;
