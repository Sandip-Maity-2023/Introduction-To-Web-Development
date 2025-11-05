/* 
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    bool swapped;
  
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
      
        // If no two elements were swapped, then break
        if (!swapped)
            break;
    }
}
// Function to print a vector
void printVector(const vector<in>& arr) {
    for (int num : arr)
        cout << " " << num;
}
*/

import React from "react";

export default function BubbleSort(arr) {
  let animations = [];
  let temp = [...arr]; //temporary array of original
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
