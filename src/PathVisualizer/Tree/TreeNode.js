class TreeNode {
  constructor(data, level) {
    this.data = data;
    this.level = level;
    this.leftNode = undefined;
    this.rightNode = undefined;
  }

  insert(data, level) {
    let current = this;
    if (current.data > data) {
      if (current.leftNode !== undefined) {
        current.leftNode = current.leftNode.insert(data, level + 1);
        current = this.balanceTree(current);
      } else {
        current.leftNode = new TreeNode(data, level + 1);
      }
    } else {
      if (current.rightNode !== undefined) {
        current.rightNode = current.rightNode.insert(data, level + 1);
        current = this.balanceTree(current);
      } else {
        current.rightNode = new TreeNode(data, level + 1);
      }
    }
    console.log(current);
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
    pivot.rightNode.level--;
    pivot.level--;
    pivot.leftNode.level++;
    return pivot;
  }

  rotateLL(parent) {
    let pivot = parent.leftNode;
    parent.leftNode = pivot.rightNode;
    pivot.rightNode = parent;
    this.increaseAllRightNodeLevel(pivot);
    //pivot.rightNode.level++;
    pivot.level--;
    pivot.leftNode.level--;
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

  increaseAllRightNodeLevel(node) {
    let current = node.rightNode;
    while (current !== undefined) {
      current.level++;
      current = current.rightNode;
    }
  }
}

export default TreeNode;
