import React, { Component } from "react";
import { Button, ListItemSecondaryAction } from "@material-ui/core";

import "./SortPage.css";

class SortPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsorted: [],
      sorted: [],
      widthItem: 0,
      max: 0,
      size: 40,
      maxItem: 100,
    };

    this.bubbleSort = this.bubbleSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.reset();
  }

  render() {
    const arrayStyle = {
      with: window.innerWidth - 80,
    };
    return (
      <div className="container">
        <div className="actions">
          <Button variant="contained" color="primary" onClick={this.bubbleSort}>
            Bubble sort
          </Button>
          <Button variant="contained" color="primary" onClick={this.quickSort}>
            Quick sort
          </Button>
          <Button variant="outlined" color="primary" onClick={this.reset}>
            Reset
          </Button>
        </div>
        <div className="array" style={arrayStyle}>
          {this.state.sorted.map((v, index) => {
            const style = {
              width: this.state.widthItem,
              height: (v * 500) / this.state.max,
              left: this.state.widthItem * index,
            };

            return <div key={index} className="array-item" style={style}></div>;
          })}
        </div>
      </div>
    );
  }

  reset() {
    this.generateRandomList(this.state.size, this.state.maxItem);
  }

  generateRandomList(listSize, max) {
    const numbers = [];
    for (let i = 0; i < listSize; i++) {
      numbers.push(Math.floor(Math.random() * max));
    }
    this.setState({
      unsorted: numbers,
      sorted: numbers.map((e) => e),
      widthItem: (window.innerWidth - 80) / numbers.length,
      max,
    });
  }

  bubbleSort() {
    this.setState({ sorted: this.state.unsorted.map((e) => e) }, () => {
      const numbers = this.state.sorted.map((e) => e);
      const tracker = [];
      const length = numbers.length;
      for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
          if (numbers[j] > numbers[j + 1]) {
            tracker.push([j, j + 1]);
            const tmp = numbers[j];
            numbers[j] = numbers[j + 1];
            numbers[j + 1] = tmp;
          }
        }
      }

      for (let i = 0; i < tracker.length; i++) {
        setTimeout(() => {
          const numbersSorted = this.state.sorted;

          const tmp = numbersSorted[tracker[i][0]];
          numbersSorted[tracker[i][0]] = numbersSorted[tracker[i][1]];
          numbersSorted[tracker[i][1]] = tmp;

          this.setState({ sorted: numbersSorted });
        }, 100 * i);
      }
    });
  }

  quickSort() {
    this.setState({ sorted: this.state.unsorted.map((e) => e) }, () => {
      const tracker = [];
      let numbers = this.state.sorted.map((e) => e);
      numbers = this.qs(numbers, 0, numbers.length - 1, tracker);

      console.log(tracker);
      console.log(numbers);

      for (let i = 0; i < tracker.length; i++) {
        setTimeout(() => {
          const numbersSorted = this.state.sorted;

          const tmp = numbersSorted[tracker[i][0]];
          numbersSorted[tracker[i][0]] = numbersSorted[tracker[i][1]];
          numbersSorted[tracker[i][1]] = tmp;

          this.setState({ sorted: numbersSorted });
        }, 50 * i);
      }
    });
  }

  qs(array, start, end, tracker) {
    if (array.length < 1) return;

    const index = this.partition(array, start, end, tracker);

    if (start < index - 1) {
      this.qs(array, start, index - 1, tracker);
    }

    if (index < end) {
      this.qs(array, index, end, tracker);
    }

    return array;
  }

  partition(array, start, end, tracker) {
    const pivot = array[Math.floor((end + start) / 2)];
    let i = start;
    let j = end;
    while (i <= j) {
      while (array[i] < pivot) i++;

      while (array[j] > pivot) j--;

      if (i <= j) {
        tracker.push([i, j]);
        const tmp = array[j];
        array[j] = array[i];
        array[i] = tmp;
        i++;
        j--;
      }
    }
    return i;
  }
}

export default SortPage;
