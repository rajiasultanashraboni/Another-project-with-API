// category scetion is here 

const loadCategories = async ()=>{
    const response = await fetch(` https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await response.json();
    displayAllCategories(data.categories)
}

const displayAllCategories=(category)=>{
    category.forEach(element => {
        // console.log(element)
        const {category,category_icon} = element
        const categoryContainer = document.getElementById('button-container');
        const div = document.createElement('div')
        div.innerHTML = `
            <button class="flex items-center gap-4 border rounded-xl px-4 py-2">
            <img class = "w-10" src="${category_icon}" alt="">
            <p>${category}</p>
        </button>
        `

        categoryContainer.appendChild(div)
    });
}

loadCategories()