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

// remove active button 

const removeActiveClass = ()=>{
    const removeallButtons = document.querySelectorAll(".category-btn");
    console.log(removeallButtons)
    for(const btn of removeallButtons){
        btn.classList.remove('rounded-full', 'border-teal-800', 'bg-emerald-100')
        btn.classList.add('rounded-xl')
       
    }
}
// active all button 
const addActiveClass = (category)=>{
    const activeButtons = document.getElementById(`btn-${category}`);
    console.log(activeButtons)
    activeButtons.classList.remove('rounded-xl');
    activeButtons.classList.add('rounded-full', 'border-teal-800', 'bg-emerald-100')
}

//handle like button

const handleLikedButton = (image)=>{
    const imageContainer = document.getElementById('Liked-button')
    // console.log(image)
    const div = document.createElement('div')
    div.innerHTML=`
        <img class="rounded-lg" src="${image}"/>
    `
    imageContainer.appendChild(div)
}
