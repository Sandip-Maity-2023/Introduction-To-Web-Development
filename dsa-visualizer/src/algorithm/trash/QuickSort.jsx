/*
int partition(vector<int>&arr,int low,int high){

int pivot=arr[high];
int i=low-1;
for(int j=low;j<=high;j++){
if(arr[j]<pivot){
i++;
swap(arr[i],arr[j]);
}
}
swap(arr[i+1],arr[high]);
return i+1;
}
void quickSort(vector<int>&arr,int low,int high){
if(low<high){
int pi=partition(arr,low,high);
quickSort(arr,low,pi-1);
quickSort(arr,pi+1,high);
}
   }

*/


import React from 'react'
   
export default function QuickSort(array) {
const animations=[];
let arr=array.slice();
//if(arr.length<=1) return animations;
quickSortHelper(arr,0,arr.length-1,animations);

return animations;
}

function quickSortHelper(arr,l,h,animations){
if(l<h){
  let pi=partition(arr,l,h,animations);
  quickSortHelper(arr,l,pi-1,animations);
  quickSortHelper(arr,pi+1,h,animations);
}
}

function swap(arr,i,j){
let temp=arr[i];
arr[i]=arr[j];
arr[j]=temp;
}

function partition(arr,low,high,animations){

  let pivot=arr[high];
  let i=low-1;

  for(let j=low;j<=high-1;j++){
    animations.push([j,high,false]);

    if(arr[j]<pivot){
      i++;
      swap(arr,i,j);
      animations.push([i,j,true]);
    } 
  }
  swap(arr,i+1,high);
  animations.push([i+1,high,true]);
  return i+1;
}

