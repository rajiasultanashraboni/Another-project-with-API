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
//pet details showing by clicked details
const loadAllPetsDetails = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await response.json();
    displayPetDetails(data.petData);
};

// display pet details 
const displayPetDetails = (details) => {
    console.log(details);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <img class="w-full h-60" src="${details.image}" alt="">
        <p class="text-2xl font-bold">${details.pet_name}</p>
        <div class="flex gap-6 my-2">
            <div>
                <p>Breed: ${details.breed ? details.breed : "Not available"}</p>
                <p>Birth: ${details.date_of_birth ? details.date_of_birth : "Not available"}</p>
                <p>Gender: ${details.gender ? details.gender : "Not available"}</p>
            </div>
            <div>
                <p>Price: ${details.price ? details.price : "Not available"}</p>
                <p>Category: ${details.category ? details.category : "Not available"}</p>
            </div>
        </div>
        <h1 class="text-3xl font-bold">Details Information</h1>
        <p class="my-2">${details.pet_details}</p>
    `;
    document.getElementById("details_modal").showModal();
};
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
                        <button onclick="loadAllPetsDetails('${pet.petId}')"  class="btn">Details</button>
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
    const adoptModal = document.getElementById("adopt_modal"); 
    adoptModal.showModal();
    const interval = setInterval(()=>{
        count--
        if(count !==0)countContainer.innerText= count;
        if(count<1){
            clearInterval(interval)
            adoptModal.close()
            event.textContent="Adopted"
            event.disabled=true;
        }
    },1000)
    

}

loadCategories()
loadAllPets()
