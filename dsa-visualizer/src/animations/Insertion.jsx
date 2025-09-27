import React from 'react'

export default function Insertion(animations,speed,setisSorting) {
    const bars=document.getElementsByClassName("bar");

    for(let i=0;i<animations.length;i++){
        const [barOneIdx,bartwoIdx,swap]=animations[i];
        const barOne=bars[barOneIdx];
        const bartwo=bars[bartwoIdx];
        setTimeout(()=>{
            barOne.style.backgroundColor=swap?'red':'yellow';
            bartwo.style.backgroundColor=swap?'red':'yellow';

            if(swap){
                const height=barOne.style.height;
                barOne.style.height=bartwo.style.height;
                bartwo.style.height=height;

                const content=barOne.innerHTML;
                barOne.innerHTML=bartwo.innerHTML;
                bartwo.innerHTML=content;
            }
            setTimeout(()=>{
                barOne.style.backgroundColor='blue';
                bartwo.style.backgroundColor='blue';
            },speed);

        },i*speed);
    }
    setTimeout(()=>{
for(let j=0;j<bars.length;j++){
    setTimeout(()=>{
        bars[j].style.backgroundColor='green';
    },j*speed);
}
setisSorting(false);
    },animations.length*speed);
}

