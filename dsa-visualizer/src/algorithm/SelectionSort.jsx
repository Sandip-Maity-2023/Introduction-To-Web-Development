/*
void selectionSort(vector<int> &arr) {
    int n = arr.size();

    for (int i = 0; i < n - 1; ++i) {

        // Assume the current position holds
        // the minimum element
        int min_idx = i;

        // Iterate through the unsorted portion
        // to find the actual minimum
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[min_idx]) {

                // Update min_idx if a smaller
                // element is found
                min_idx = j; 
            }
        }

        // Move minimum element to its
        // correct position
        swap(arr[i], arr[min_idx]);
    }
}
*/

import React from "react";

export default function SelectionSort(arr) {
  const animations = [];
  const auxiliary = arr.slice();

  for (let i = 0; i < auxiliary.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < auxiliary.length; j++) {
      animations.push([i, j, false]);
      if (auxiliary[j] < auxiliary[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      animations.push([i, minIdx, true]);
      swap(auxiliary, i, minIdx);
    }
  }
  return animations;
}

const swap = (arr, idx1, idx2) => {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
};
