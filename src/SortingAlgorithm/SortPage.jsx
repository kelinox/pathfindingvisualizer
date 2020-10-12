import React, { Component } from "react";
import { Button } from "@material-ui/core";

import "./SortPage.css";

class SortPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsorted: [],
      sorted: [],
      widthItem: 0,
      max: 0,
      size: 100,
      maxItem: 100,
    };

    this.bubbleSort = this.bubbleSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
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
          <Button variant="contained" color="primary" onClick={this.mergeSort}>
            Merge sort
          </Button>
          <Button variant="outlined" color="primary" onClick={this.reset}>
            Generate
          </Button>
        </div>
        <div className="array" style={arrayStyle}>
          {this.state.sorted.map((v, index) => {
            const style = {
              width: this.state.widthItem,
              height: (v.value * 500) / this.state.max,
              left: this.state.widthItem * index,
            };

            const moved = v.moved ? "moved" : "";

            return (
              <div
                key={index}
                className={`array-item ${moved}`}
                style={style}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }

  /**
   * Reset the array of number by generating a new array with new random number
   */
  reset() {
    this.generateRandomList(this.state.size, this.state.maxItem);
  }

  /**
   * Generate a list of random number between 0 and @max
   * The list will have a size of @listSize elements
   * @param {int} listSize Numbers of elements to add to the list
   * @param {int} max maximul value of a number in the list
   */
  generateRandomList(listSize, max) {
    const numbers = [];
    for (let i = 0; i < listSize; i++) {
      numbers.push({
        value: Math.floor(Math.random() * max),
        moved: false,
      });
    }

    this.setState({
      unsorted: numbers,
      sorted: numbers.map((e) => e),
      widthItem: (window.innerWidth - 80) / numbers.length,
      max,
    });
  }

  /**
   * Sort an array using the bubblesort algorithm
   */
  bubbleSort() {
    this.setState(
      {
        sorted: this.state.unsorted.map((e) => {
          e.moved = false;
          return e;
        }),
      },
      () => {
        const numbers = this.state.sorted.map((e) => e.value);
        const tracker = [];
        const length = numbers.length;
        for (let i = 0; i < length - 1; i++) {
          for (let j = 0; j < length - i - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {
              tracker.push([j, j + 1]);
              this.switchElement(numbers, j, j + 1);
            }
          }
        }

        this.displayMoves(tracker);
      }
    );
  }

  /**
   * Handle the click on the quicksort button
   * Will execute the quicksort algorithm
   * And will display the moves made to sort the list
   */
  quickSort() {
    this.setState(
      {
        sorted: this.state.unsorted.map((e) => {
          e.moved = false;
          return e;
        }),
      },
      () => {
        const tracker = [];
        let numbers = this.state.sorted.map((e) => e.value);
        this.qs(numbers, 0, numbers.length - 1, tracker);

        this.displayMoves(tracker);
      }
    );
  }

  /**
   * Quicksort algorithm
   * https://en.wikipedia.org/wiki/Quicksort
   * @param {any[]} array elements to sort
   * @param {int} start starting index in the array
   * @param {int} end ending index in the array
   * @param {int[][]} tracker moves tracker
   */
  qs(array, start, end, tracker) {
    if (array.length < 1) return;

    const index = this.partition(array, start, end, tracker);

    if (start < index - 1) {
      this.qs(array, start, index - 1, tracker);
    }

    if (index < end) {
      this.qs(array, index, end, tracker);
    }
  }

  /**
   * Sort a certain part of an array using the quicksort method
   * return the index of the pivot in the array, which means that every value in the left
   * of this index are lower and all the value to the right are upper
   * @param {any[]} array array to sort
   * @param {int} start starting index
   * @param {int} end ending index
   * @param {int[][]} tracker moves tracker
   */
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

  mergeSort() {
    this.setState(
      {
        sorted: this.state.unsorted.map((e) => {
          e.moved = false;
          return e;
        }),
      },
      () => {
        const tracker = [];
        let numbers = this.state.sorted.map((e) => e.value);
        const tmp = this.state.sorted.map(() => undefined);
        this.ms(numbers, tmp, 0, numbers.length - 1, tracker);
        this.setState({
          sorted: numbers.map((e) => {
            return { value: e, moved: false };
          }),
        });
        this.displayMoves(tracker);
      }
    );
  }

  ms(array, tmp, start, end, tracker) {
    if (start >= end) return;

    const middle = Math.floor((end + start) / 2);
    this.ms(array, tmp, start, middle, tracker);
    this.ms(array, tmp, middle + 1, end, tracker);
    this.mergeHalves(array, tmp, start, end, tracker);
  }

  mergeHalves(array, tmp, start, end, tracker) {
    const leftEnd = Math.floor((end + start) / 2);
    const size = end - start + 1;

    let left = start;
    let right = leftEnd + 1;
    let index = start;

    while (left <= leftEnd && right <= end) {
      if (array[left] <= array[right]) {
        tmp[index] = array[left];
        left++;
      } else {
        tmp[index] = array[right];
        right++;
      }
      index++;
    }

    this.arraycopy(array, left, tmp, index, leftEnd - left + 1);
    this.arraycopy(array, right, tmp, index, end - right + 1);
    this.arraycopy(tmp, start, array, start, size);
  }

  arraycopy(src, srcPos, dst, dstPos, length) {
    let j = dstPos;
    let tempArr = src.slice(srcPos, srcPos + length);
    for (let e in tempArr) {
      dst[j] = tempArr[e];
      j++;
    }
  }

  displayMoves(tracker) {
    for (let i = 0; i < tracker.length; i++) {
      setTimeout(() => {
        const numbersSorted = this.state.sorted;

        this.switchElement(numbersSorted, tracker[i][0], tracker[i][1]);

        this.setMoved(numbersSorted, false);
        numbersSorted[tracker[i][0]].moved = true;
        numbersSorted[tracker[i][1]].moved = true;

        this.setState({ sorted: numbersSorted });
      }, 50 * i);
    }
  }

  /**
   * Switch two element in an array
   * @param {any[]} array
   * @param {*} i first index
   * @param {*} j second index
   */
  switchElement(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }

  /**
   * Set the moved attribute of the element in @numbers with the value @moved
   * @param {any[]} numbers
   * @param {boolean} moved
   */
  setMoved(numbers, moved) {
    numbers.map((e) => (e.moved = moved));
  }
}

export default SortPage;
