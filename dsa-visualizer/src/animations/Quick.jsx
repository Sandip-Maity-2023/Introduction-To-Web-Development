import React from 'react'

export default function Quick(animations,speed,setisSorting) {

    const bars=document.getElementsByClassName('bar');

    for(let i=0;i<animations.length;i++){
        let [baroneIdx,bartwoIdx,swap]=animations[i];
        let barOne=bars[baroneIdx];
        let bartwo=bars[bartwoIdx];

        setTimeout(()=>{
            barOne.style.backgroundColor=swap?'red':'yellow';
            bartwo.style.backgroundColor=swap?'red':'yellow';

            if(swap){
                const height=barOne.style.height;
                barOne.style.backgroundColor=bartwo.style.backgroundColor;
                bartwo.style.backgroundColor=height;

                const content=barOne.style.height;
                barOne.style.height=bartwo.style.height;
                bartwo.style.height=content;
            }

            setTimeout(()=>{
                barOne.style.backgroundColor='blue';
                bartwo.style.backgroundColor='blue';
            },speed);

        },i*speed);
    }

    setTimeout(()=>{
        for(let i=0;i<bars.length;i++){
            setTimeout(()=>{
                bars[i].style.backgroundColor='green';
            },i*speed);
        }
        setisSorting(false);
    },animations.length*speed+speed);
}
