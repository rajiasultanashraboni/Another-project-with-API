// category scetion is here 

const loadCategories = async ()=>{
    const response = await fetch(` https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await response.json();
    displayAllCategories(data.categories)
}

const loadAllPets = async()=>{
    loaderSpinner(true)
    const response = await fetch(' https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json()
    setTimeout(() => {
        displayAllPets(data.pets)
        storedPetsdata=data.pets
        loaderSpinner(false)
    }, 2000);
    
}

const loadAllPetsByCategory=async(category)=>{
    //remove active class
    removeActiveClass()
    //add active class
    addActiveClass(category)
    //spinner
    loaderSpinner(true)
    // console.log(category)
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await response.json()
    setTimeout(() => {
        displayAllPets(data.data)
        storedPetsdata=data.data
        loaderSpinner(false)
    }, 1000);
    
}

const displayAllCategories=(categories)=>{
    categories.forEach(element => {
        // console.log(element)
        const {category,category_icon} = element
        const categoryContainer = document.getElementById('button-container');
        const div = document.createElement('div')
        div.innerHTML = `
            <button id="btn-${category}" onclick="loadAllPetsByCategory('${category}')" class="flex items-center gap-4 category-btn border rounded-xl px-4 py-2">
            <img class = "w-10" src="${category_icon}" alt="">
            <p>${category}</p>
        </button>
        `

        categoryContainer.appendChild(div)
    });
}

const displayAllPets = (pets)=>{
    
   
    const cardContainer = document.getElementById('card-container');
    if(pets.length ===0){
        cardContainer.classList.remove('grid')
        cardContainer.innerHTML=`
            <div class="text-center">
                <img class="mx-auto" src="./images/error.webp" alt="">
                <p class="text-2xl font-bold">No Available content is here</p>
            </div>
        `
        return
    }
    else{
        cardContainer.classList.add('grid')
    }
    
    pets.forEach(pet => {
        // console.log(pet)
        const {breed,category,date_of_birth,price,image,gender,pet_name
        }=pet;
        
        const div = document.createElement('div');
        div.classList.add("border", "p-2", "rounded-lg");
        div.innerHTML=`
                
                    <img class="rounded-lg" src="${image}" alt="">
                    <h1 class="text-2xl font-bold">${pet_name
                    }</h1>
                
                    <div class = "text-gray-600">
                        <p>Breed:${breed?breed:"not available"}</p>
                        <p>Birth:${date_of_birth?date_of_birth:"not available"}</p>
                        <p>Gender: ${gender?gender:"not available"}</p>
                        <p>Price: ${price?price:"not available"}</p>
                        <p>category: ${category?category:"not available"}</p>
                    </div>
                    <hr class="my-2">

                    <div class="flex items-center justify-between">
                        <button onclick="handleLikedButton('${image}')" class="btn"><img src="https://img.icons8.com/?size=24&id=82788&format=png" alt=""></button>
                        <button onclick="adoptedModal(this)" class="btn">Adopt</button>
                        <button class="btn">Details</button>
                    </div>
                
                

         
        `
        cardContainer.appendChild(div)
    });
}


// adopted button functionality

const adoptedModal=(event)=>{
    // console.log(event)
    let count = 3
    const countContainer = document.getElementById('countdown-container');
    countContainer.innerText= count;
    my_modal_5.showModal()
    const interval = setInterval(()=>{
        count--
        if(count !==0)countContainer.innerText= count;
        if(count<1){
            clearInterval(interval)
            my_modal_5.close()
            event.textContent="Adopted"
            event.disabled=true;
        }
    },1000)
    

}

loadCategories()
loadAllPets()