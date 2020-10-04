class TreeNode {
  constructor(data) {
    this.data = data;
    this.leftNode = undefined;
    this.rightNode = undefined;
  }

  insert(data) {
    if (this.data <= data) {
      if (this.leftNode !== undefined) {
        this.leftNode.insert(data);
      } else {
        this.leftNode = new TreeNode(data);
      }
    } else {
      if (this.rightNode !== undefined) {
        this.rightNode.insert(data);
      } else {
        this.rightNode = new TreeNode(data);
      }
    }
  }
}

export default TreeNode;
