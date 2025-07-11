import { initMenu, initFadeInObserver, initAccordion } from './helpers.js';
initMenu();

const heroArticleSwiper = new Swiper(".hero-article-swiper-container", {
    navigation: {
        nextEl: '.hero-article-swiper-button-next',
        prevEl: '.hero-article-swiper-button-prev',
    },
     pagination: {
        el: '.hero-article-swiper-pagination',
    },    
    loop: false,
    watchOverflow: true,
    centerSlide: "true",
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 800,
})

initFadeInObserver()

function initNewsItemAnimation() {
    const newsItems = document.querySelectorAll(".item-news");
    newsItems.forEach((item, index) => {
        if (index === 0) {
          item.classList.add('slide-in-left');
        } else if (newsItems.length === 2 && index === 1 && window.innerWidth >= 1024) {
            item.style.transitionDelay = "0.2s";
            item.style.transitionDuration = "0.8s";
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
    }, { threshold: 0.1 });
    
    newsItems.forEach(item => observer.observe(item));
}
initNewsItemAnimation();


const trendingItems = document.querySelector(".trending__items");
const showMoreBtn = document.querySelector('.trending__btn');
const tabBtns = document.querySelectorAll(".tabs-trending__btn");
const allItems = [...trendingItems.children];

let expanded = false;
let activeTab = "All"; 

function renderTrendingItems() {
  let visibleItems = allItems.filter(item => {
    const category = item.dataset.tabContent;
    return activeTab === "All" || category === activeTab;
});

allItems.forEach(item => item.style.display = "none"); 

visibleItems.forEach((item, index) => {
    if (!expanded && index >= 3) return;
    item.style.display = "flex";
});

  showMoreBtn.style.display = visibleItems.length > 3 ? "inline-block" : "none";
  showMoreBtn.textContent = expanded ? "Show Less" : "Load More";
}

tabBtns.forEach(tabBtn => {
  tabBtn.addEventListener("click", function () {
    tabBtns.forEach(btn => btn.classList.remove("tab-active"));
    tabBtn.classList.add("tab-active");

    activeTab = tabBtn.textContent.trim();
    expanded = false;
    renderTrendingItems();
  });
});

showMoreBtn.addEventListener("click", () => {
  expanded = !expanded;
  renderTrendingItems();
});

renderTrendingItems();


const trendingItemsObserver = new IntersectionObserver(entries => {
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
    threshold: 0.2 
})

for (const item of trendingItems.children) {
    trendingItemsObserver.observe(item);
}

initAccordion();

