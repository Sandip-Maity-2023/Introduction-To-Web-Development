import React from 'react'

export default function Insertion(arr) {
    const animations=[];
    let array=arr.slice();
    
    for(let i=1;i<array.length;i++){
        let key =array[i];
        let j=i-1;
        while(j>=0 && array[j]>key){
            animations.push([j,j+1,false]);
            animations.push([j,j+1,true]);
            array[j+1]=array[j];
            j--;
        }
        array[j+1]=key;

    }
  return animations;
}


