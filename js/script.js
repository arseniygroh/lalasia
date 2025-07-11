import { initMenu, initFadeInObserver, initAccordion, initCountingAnimation } from './helpers.js';



document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    
    const searchBtn = document.querySelector(".hero__form button");
    function isValid(value) {
        if (value.trim() !== '' && !/\d+/.test(value)) {
            return true;
        } else {
            return false;
        }
    }
    
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            const propertyInput = document.getElementsByName("property")[0];
            const propertyInputValue = propertyInput.value;
            if (isValid(propertyInputValue)) {
                propertyInput.classList.remove("error-placeholder");
                propertyInput.placeholder = 'Search property';
            } else {
                propertyInput.value = '';
                propertyInput.placeholder = 'Invalid property name';
                propertyInput.classList.add('error-placeholder');
            }
        }); 
    }
    
    const swiper = new Swiper('.popular-products__swiper-container', {
        navigation: {
           nextEl: '.popular-products__swiper-next',
           prevEl: '.popular-products__swiper-prev',
        },
        loop: false,
        watchOverflow: true,
        slidesOffsetAfter: 0,
        spaceBetween: 30,
        freeMode: false,
        slidesPerView: "auto",
        breakpoints: {
             320: {
                spaceBetween: 10,
             }, 
             480: {
           
                spaceBetween: 15,
            },
        }
     });
    
    const headerExperience = document.querySelector(".header-experience");
    const bodyExperience = document.querySelector(".body-experience");
    const listExperience = document.querySelector(".list-header-experience");
    
    
    const breakpoint = 967.98;
    
    function moveElement() {
      if (window.innerWidth <= breakpoint) {
        const btn = bodyExperience.children[1];
        bodyExperience.insertBefore(listExperience, btn.nextElementSibling);
      } else {
        headerExperience.appendChild(listExperience);
      }
    }
    
    window.addEventListener("load", moveElement);
    window.addEventListener("resize", moveElement);
    
    initCountingAnimation({
        selector: ".list-header-experience__number",
        interval: 5000,
        threshold: 1
    });

    const swiperTestimonials = new Swiper('.testimonials-swiper-container', {
        loop: false,
        slidesPerView: "auto",
        watchOverflow: true,
        spaceBetween: 30,
        slidesOffsetAfter: 0,
        breakpoints: {
            320: {
                spaceBetween: 10,
            }, 
            480: {
                spaceBetween: 15,
    
            },
        }
     });
    
    
    const swiperArticle = new Swiper('.articles-swiper-container', {
        navigation: {
            nextEl: '.articles-swiper-next',
            prevEl: '.articles-swiper-prev',
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
    
    initFadeInObserver()
     
    const itemsBenefits = document.querySelectorAll(".item-benefits");
     
    const itemsBenefitsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
           entry.target.style.transitionDelay = `${i * 0.3}s`;
           entry.target.classList.add("show-up");
        } else {
           entry.target.classList.remove("show-up");
           entry.target.style.transitionDelay = "0s";
         }
       });
     }, {
       threshold: 0.5 
     });
     
    itemsBenefits.forEach(item => itemsBenefitsObserver.observe(item));
     
    const articleItems = document.querySelectorAll(".items-articles__item");
     
    const articleItemsObserver = new IntersectionObserver(entries => {
         entries.forEach((entry, i) => {
             if (entry.isIntersecting) {
               entry.target.style.transitionDelay = `${i * 0.3}s`;
               entry.target.classList.add("show-up");
             } else {
               entry.target.classList.remove("show-up");
               entry.target.style.transitionDelay = "0s";
             }
           });
         }, {
           threshold: 0.05 
     })
     
    articleItems.forEach(item => articleItemsObserver.observe(item));
     
    initAccordion();   
})

