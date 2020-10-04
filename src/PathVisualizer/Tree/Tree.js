import TreeNode from "./TreeNode";

class Tree {
  /**
   *
   * @param {TreeNode} node root node of the tree
   */
  constructor(node) {
    this.root = node;
  }

  insert(data) {
    this.root.insert(data);
  }
}
