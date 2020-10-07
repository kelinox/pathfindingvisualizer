class TreeNode {
  constructor(data) {
    this.data = data;
    this.leftNode = undefined;
    this.rightNode = undefined;
  }

  insert(data) {
    let current = this;
    if (current.data > data) {
      if (current.leftNode !== undefined) {
        current.leftNode = current.leftNode.insert(data);
        current = this.balanceTree(current);
      } else {
        current.leftNode = new TreeNode(data);
      }
    } else {
      if (current.rightNode !== undefined) {
        current.rightNode = current.rightNode.insert(data);
        current = this.balanceTree(current);
      } else {
        current.rightNode = new TreeNode(data);
      }
    }
    return current;
  }

  balanceTree(node) {
    const balancedFactor = this.balanceFactor(node);

    if (balancedFactor > 1) {
      if (this.balanceFactor(node.leftNode) > 0) {
        node = this.rotateLL(node);
      } else {
        node = this.rotateLR(node);
      }
    } else if (balancedFactor < -1) {
      if (this.balanceFactor(node.rightNode) > 0) {
        node = this.rotateRL(node);
      } else {
        node = this.rotateRR(node);
      }
    }
    return node;
  }

  balanceFactor(node) {
    return this.getHeight(node.leftNode) - this.getHeight(node.rightNode);
  }

  getHeight(node) {
    let height = 0;
    if (node !== undefined) {
      const l = this.getHeight(node.leftNode);
      const r = this.getHeight(node.rightNode);
      height = Math.max(l, r) + 1;
    }
    return height;
  }

  rotateRR(parent) {
    let pivot = parent.rightNode;
    parent.rightNode = pivot.leftNode;
    pivot.leftNode = parent;
    return pivot;
  }

  rotateLL(parent) {
    let pivot = parent.leftNode;
    parent.leftNode = pivot.rightNode;
    pivot.rightNode = parent;
    return pivot;
  }

  rotateLR(parent) {
    let pivot = parent.leftNode;
    parent.leftNode = this.rotateRR(pivot);
    return pivot;
  }

  rotateRL(parent) {
    const pivot = parent.right;
    parent.right = this.rotateLL(pivot);
    return this.rotateRR(parent);
  }
}

export default TreeNode;
