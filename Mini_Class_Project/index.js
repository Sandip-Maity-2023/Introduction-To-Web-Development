const navLinks=document.querySelectorAll('nav ul li a');
const sections=document.querySelectorAll('section');

navLinks.forEach(link=>{
    link.addEventListener('click',(e)=>{
        e.preventDefault();
        const target=link.getAttribute('data-section');

        sections.forEach(section=>{
            if(Selection.id===target){
                section.classList.add('active');
            }else{
                section.classList.remove('active');
            }
        });
    });
});
