import { initMenu, initFadeInObserver, initAccordion } from './helpers.js';

initMenu();
const heroProductSwiper = new Swiper('.hero-product-swiper-container', {
    navigation: {
        nextEl: '.hero-product-swiper-btn-next',
        prevEl: '.hero-product-swiper-btn-prev',
     },
     pagination: {
        el: '.hero-product-swiper-pagination',
    },    
    loop: false,
    watchOverflow: true,
    centerSlide: "true",
    observer: true,
	observeParents: true,
	slidesPerView: 1,
    centeredSlides: true,
    speed: 800,
 });


initAccordion();
initFadeInObserver();

function isValid(value) {
    if (value.trim() !== '' && !/\d+/.test(value)) {
        return true;
    } else {
        return false;
    }
}

const products = [
    {
        lable: "Chair",
        title: "White Aesthetic Chair",
        description: "Combination of wood and wool",
        price: 63.47,
        imgSrc: "images/hero-product/item01.png"
    },
    {
        lable: "Cupboard",
        title: "Wooden Cupboard 3 Row",
        description: "Combination of wood and wool",
        price: 79.88,
        imgSrc: "images/hero-product/item02.png"
    },
    {
        lable: "Chair",
        title: "Minimalist Lounge Chair",
        description: "Combination of wood and wool",
        price: 14.74,
        imgSrc: "images/hero-product/item03.png"
    },
    {
        lable: "Table",
        title: "Working Desk Setup",
        description: "Combination of wood and wool",
        price: 47.90,
        imgSrc: "images/hero-product/item04.png"
    },
    {
        lable: "Cupboard",
        title: "Minimalist White Cuppboard",
        description: "Combination of wood and wool",
        price: 40.73,
        imgSrc: "images/hero-product/item05.png"
    },
    {
        lable: "Table",
        title: "Wooden Dining Table",
        description: "Combination of wood and wool",
        price: 16.50,
        imgSrc: "images/hero-product/item06.png"
    },
    {
        lable: "Decoration",
        title: "White Minimalist Vase",
        description: "Combination of wood and wool",
        price: 58.39,
        imgSrc: "images/hero-product/item07.png"
    },
    {
        lable: "Decoration",
        title: "Plant With Clay Stand",
        description: "Combination of wood and wool",
        price: 61.49,
        imgSrc: "images/hero-product/item08.png"
    },
    {
        lable: "Decoration",
        title: "Oval Gold Mirror",
        description: "Combination of wood and wool",
        price: 32.43,
        imgSrc: "images/hero-product/item06.png"
    },
]
let productsToDisplay = [...products];
let sortedProducts = [];

const sortBtn = document.querySelector(".header-catalog__sort");
const catalogSubmenu = document.querySelector(".submenu-header-catalog");
const productItemsParent = document.querySelector(".catelog__items");
let sortAlgorithm;
sortBtn.addEventListener("click", () => {
    catalogSubmenu.classList.toggle("hidden");
    if (!catalogSubmenu.classList.contains("hidden")) {
        let catalogSubmenuArr = Array.from(catalogSubmenu.children);
        for (let i = 0; i < catalogSubmenuArr.length; i++) {
            catalogSubmenuArr[i].addEventListener("click", (e) => {
                sortAlgorithm = e.target.textContent.toLowerCase().trim();
                catalogSubmenu.classList.add("hidden");
                if (sortAlgorithm === "ascending prices") {
                    sortedProducts = [...ascendingProductsSort([...productsToDisplay])];
                    console.log(sortedProducts);
                    updateProductItems(sortedProducts);
                } 
                else if (sortAlgorithm === "descending prices") {
                    sortedProducts = [...descendingProductsSort([...productsToDisplay])];
                    updateProductItems(sortedProducts);
                }
            })
        }
    }
})


const searchBtn = document.querySelector(".form-hero-product__search");
const propertyInput = document.querySelector(".form-hero-product input");

function liveSearch(value) {
    const searchedProducts = products.filter(product =>
        product.title.toLowerCase().includes(value.toLowerCase())
    );
    updateProductItems(searchedProducts);
}

function validatedSearch(value) {
    if (isValid(value)) {
        propertyInput.classList.remove("error-placeholder");
        propertyInput.placeholder = 'Search property';
        liveSearch(value);
    } else {
        propertyInput.value = '';
        propertyInput.placeholder = 'Invalid property name';
        propertyInput.classList.add('error-placeholder');
        updateProductItems([]);
    }
}

propertyInput.addEventListener("input", function () {
    liveSearch(this.value);
});

searchBtn.addEventListener("click", () => {
    validatedSearch(propertyInput.value);
});



function ascendingProductsSort(products) {
    let swapped = true;
    do {
        swapped = false;
        for (let i = 0; i < products.length - 1; i++) {
        if (products[i].price > products[i + 1].price) {
            let temp = products[i];
            products[i] = products[i + 1];
            products[i + 1] = temp;
            swapped = true;
        }
    } 
  } while (swapped);
  return products;
}

function descendingProductsSort(products) {
    let swapped = true;
    do {
        swapped = false;
        for (let i = 0; i < products.length - 1; i++) {
            if (products[i].price < products[i + 1].price) {
                let temp = products[i];
                products[i] = products[i + 1];
                products[i + 1] = temp;
                swapped = true;
            }
        } 
    } while (swapped);
    return products;
}

function updateProductItems(sortedProducts) {
    productItemsParent.innerHTML = "";
        sortedProducts.forEach((product) => {
        const item = document.createElement("div");
        item.classList.add("item-catalog");
        item.innerHTML = `
            <img src=${product.imgSrc} alt="">
            <div class="item-catalog__lable">${product.lable}</div>
            <h4 class="item-catalog__title">${product.title}</h4>
            <div class="item-catalog__desc">${product.description}</div>
            <div class="item-catalog__price">\$${product.price.toFixed(2)}</div>
        `;
        productItemsParent.appendChild(item);
    })
}

function filterProducts() {
    const selectedInputs = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    productsToDisplay = products.filter(product => {
        return selectedInputs.length === 0 || selectedInputs.includes(product.lable.toLowerCase());
    })
    updateProductItems(productsToDisplay);
}


const filterBtn = document.querySelector(".form-hero-product__filter");
const filterMenu = document.querySelector(".filter-menu");
const closeFilterMenuBtn = document.querySelector(".filter-menu__close");
const checkboxes = document.querySelectorAll(".checkbox__input");

filterBtn.addEventListener("click", () => {
    filterMenu.classList.toggle("hide-filter-menu");
})

closeFilterMenuBtn.addEventListener("click", () => filterMenu.classList.add("hide-filter-menu"));

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", filterProducts);
})

document.addEventListener("click", (event) => {
    const isClickInsideMenu = filterMenu.contains(event.target);
    const isClickOnButton = filterBtn.contains(event.target);

    if (!isClickInsideMenu && !isClickOnButton) {
        filterMenu.classList.add("hide-filter-menu");
    }
})

