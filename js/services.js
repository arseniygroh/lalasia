import { initMenu, initFadeInObserver, initAccordion } from './helpers.js';

initMenu();
initFadeInObserver();
initAccordion();


const offersItems = document.querySelectorAll(".item-offers");

const offersItemsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
           entry.target.style.transitionDelay = `${i * 0.2}s`;
           entry.target.classList.add("show-up");
        } else {
           entry.target.classList.remove("show-up");
           entry.target.style.transitionDelay = "0s";
        }
       });
    }, {
    threshold: 0.5 
});

offersItems.forEach(item => offersItemsObserver.observe(item));


function initPortfolioAnimation() {
    const items = document.querySelectorAll('.grid-portfolio__item');
    if (items.length === 0) return;
  
    items.forEach((item, index) => {
      if (index === 0) {
        item.classList.add('slide-in-left');
      } else {
        item.classList.add(`delay-${index}`); 
      }
    });
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.3 });
  
    items.forEach(item => observer.observe(item));
  }
  
initPortfolioAnimation();