// algorithms.js
import React from "react";

/* ===========================
   Binary Search
=========================== */
export function LinearSearch(array, target) {
  const animations = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      animations.push([i, true]);
      break;
    } else {
      animations.push([i, false]);
    }
  }
  if (!animations.some(([_, found]) => found === true)) {
    animations.push([-1, "notfound"]);
  }
  return animations;
}


export function BinarySearch(array, target) {
  const animations = [];
  let l = 0,
    h = array.length - 1;

  while (l <= h) {
    let mid = Math.floor((l + h) / 2);
    animations.push([mid, false]); // highlight

    if (array[mid] === target) {
      animations.push([mid, true]);
      break;
    } else if (array[mid] < target) {
      l = mid + 1;
    } else h = mid - 1;
  }
  if (!animations.some(([_, found]) => found === true)) {
    animations.push([-1, "notfound"]);
  }
  return animations;
}

/* ===========================
   Bubble Sort
=========================== */
export function BubbleSort(arr) {
  let animations = [];
  let temp = [...arr];
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push([j, j + 1, false]);
      if (temp[j] > temp[j + 1]) {
        animations.push([j, j + 1, true]);
        let t = temp[j];
        temp[j] = temp[j + 1];
        temp[j + 1] = t;
      }
    }
  }
  return animations;
}

/* ===========================
   Insertion Sort
=========================== */
export function InsertionSort(arr) {
  const animations = [];
  let array = arr.slice();

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      animations.push([j, j + 1, false]);
      animations.push([j, j + 1, true]);
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
  return animations;
}

/* ===========================
   Merge Sort
=========================== */
export function MergeSort(arr) {
  const animations = [];
  if (arr.length <= 1) return animations;

  const auxiliary = arr.slice();
  const sorted = arr.slice();

  mergeSortHelper(sorted, 0, sorted.length - 1, auxiliary, animations);
  return animations;
}

function mergeSortHelper(sorted, startIdx, endIdx, auxiliary, animations) {
  if (startIdx === endIdx) return;

  const midIdx = Math.floor((startIdx + endIdx) / 2);

  mergeSortHelper(auxiliary, startIdx, midIdx, sorted, animations);
  mergeSortHelper(auxiliary, midIdx + 1, endIdx, sorted, animations);
  merge(sorted, startIdx, midIdx, endIdx, auxiliary, animations);
}

function merge(sorted, startIdx, midIdx, endIdx, auxiliary, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = midIdx + 1;

  while (i <= midIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliary[i] <= auxiliary[j]) {
      animations.push([k, auxiliary[i]]);
      sorted[k++] = auxiliary[i++];
    } else {
      animations.push([k, auxiliary[j]]);
      sorted[k++] = auxiliary[j++];
    }
  }
  while (i <= midIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliary[i]]);
    sorted[k++] = auxiliary[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliary[j]]);
    sorted[k++] = auxiliary[j++];
  }
}

/* ===========================
   Quick Sort
=========================== */
export function QuickSort(array) {
  const animations = [];
  let arr = array.slice();
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
}

function quickSortHelper(arr, l, h, animations) {
  if (l < h) {
    let pi = partition(arr, l, h, animations);
    quickSortHelper(arr, l, pi - 1, animations);
    quickSortHelper(arr, pi + 1, h, animations);
  }
}

function partition(arr, low, high, animations) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    animations.push([j, high, false]);
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
      animations.push([i, j, true]);
    }
  }
  swap(arr, i + 1, high);
  animations.push([i + 1, high, true]);
  return i + 1;
}

/* ===========================
   Selection Sort
=========================== */
export function SelectionSort(arr) {
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

/* ===========================
   Helper Function
=========================== */
function swap(arr, idx1, idx2) {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}
