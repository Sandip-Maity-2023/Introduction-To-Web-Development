const wrapper=document.querySelector('.wrapper');
const question=document.querySelector('.question');
const yesBtn=document.querySelector('.yes-btn');
const noBtn=document.querySelector('.no-Btn');


yesBtn.addEventListener('click',() => {
    question.innerHTML='I Love You Too:';
});

noBtn.addEventListener('mouseover',()=>{
     const wrapperRect=wrapper.getBoundingClientRect();
     const noBtnRect=noBtn.getBoundingClientRect();

    const i=Math.floor(Math.random() * (wrapperRect.width-noBtn.width));
    const j=Math.floor(Math.random() * (wrapperRect.height-noBtnRect.height));
    noBtn.style.left=i+'px';
    noBtn.style.top=j+'px';
});
