class TreeNode {
  constructor(data) {
    this.data = data;
    this.leftNode = undefined;
    this.rightNode = undefined;
  }

  insert(data, autoBalance) {
    let current = this;
    if (current.data > data) {
      if (current.leftNode !== undefined) {
        current.leftNode = current.leftNode.insert(data);

        if (autoBalance) current = this.balanceTree(current);
      } else {
        current.leftNode = new TreeNode(data);
      }
    } else {
      if (current.rightNode !== undefined) {
        current.rightNode = current.rightNode.insert(data);

        if (autoBalance) current = this.balanceTree(current);
      } else {
        current.rightNode = new TreeNode(data);
      }
    }
    return current;
  }

  inorderSort(path) {
    if (this.leftNode !== undefined) this.leftNode.inorderSort(path);
    path.push(this.data);
    if (this.rightNode !== undefined) this.rightNode.inorderSort(path);
  }

  preorderSort(path) {
    console.log(this.data);
    path.push(this.data);
    if (this.leftNode !== undefined) this.leftNode.preorderSort(path);
    if (this.rightNode !== undefined) this.rightNode.preorderSort(path);
  }

  postorderSort(path) {
    if (this.leftNode !== undefined) this.leftNode.postorderSort(path);
    if (this.rightNode !== undefined) this.rightNode.postorderSort(path);
    path.push(this.data);
  }

  height(node) {
    if (node === undefined) return -1;

    const l = node.height(node.leftNode) + 1;
    const r = node.height(node.rightNode) + 1;
    return Math.max(l, r);
  }

  dfs(root) {
    let path = [];
    let stack = [];
    let current = root;
    while (current !== undefined) {
      path.push(current.data);

      if (current.rightNode !== undefined) stack.push(current.rightNode);
      if (current.leftNode !== undefined) stack.push(current.leftNode);

      current = stack.pop();
    }
    return path;
  }

  bfs(root) {
    let path = [];
    let queue = [];
    let current = root;
    while (current !== undefined) {
      path.push(current.data);

      if (current.leftNode !== undefined) queue.push(current.leftNode);

      if (current.rightNode !== undefined) queue.push(current.rightNode);

      current = queue.shift();
    }
    return path;
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
