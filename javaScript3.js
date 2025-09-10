    const cus=document.createElement('ul');
    for(var i=1;i<=10;i++){
        const newe=document.createElement('li');
        newe.textContent='This is line' +i;
        newe.addEventListener('click',()=>{
            console.log("Responding")
        })
        cus.appendChild(newe);
    }

    
const c1=document.createElement('ul');

function res(ev){
    if(ev.target.nodeName==="li")  console.log('Responding');

    for(var i=1;i<=10;i++){
        const w=document.createElement('li');
        w.textContent='This is line'+i;
        c1.appendChild(w);
    }
    c1.addEventListener('click',res);
}