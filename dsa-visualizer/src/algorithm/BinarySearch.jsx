import React from 'react'

export default function BinarySearch(array,target) {
    const animations=[];
    let l=0,h=array.length-1;

    while(l<=h){
        let mid=Math.floor((l+h)/2);
        animations.push([mid]); //highlight

        if(array[mid]===target){
            animations.push([mid,true]);
            break;
        }else if(array[mid]<target){
            l=mid+1;
        }else h=mid-1;
        animations.push([mid,false]); //not found
    }
    return animations; 
}
