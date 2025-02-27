const loaderSpinner=(show)=>{
    const spinner = document.getElementById('loader');
    

    if(show){
        spinner.classList.remove('hidden')
        document.getElementById('card-container').innerHTML=""
    }
    else{
        spinner.classList.add('hidden')
    }
}

const removeActiveClass = ()=>{
    const removeallButtons = document.querySelectorAll(".category-btn");
    console.log(removeallButtons)
    for(const btn of removeallButtons){
        btn.classList.remove('rounded-full', 'border-teal-800', 'bg-emerald-100')
        btn.classList.add('rounded-xl')
       
    }
}

const addActiveClass = (category)=>{
    const activeButtons = document.getElementById(`btn-${category}`);
    console.log(activeButtons)
    activeButtons.classList.remove('rounded-xl');
    activeButtons.classList.add('rounded-full', 'border-teal-800', 'bg-emerald-100')
}
