import { initMenu, initFadeInObserver, initAccordion, initCountingAnimation } from './helpers.js';
initMenu();
initAccordion();
initFadeInObserver();

initCountingAnimation({
    selector: ".list-numbers__number",
    interval: 5000,
    threshold: 1
});

const missionItems = document.querySelectorAll(".mission-list-items__item");

const missionItemsObserver = new IntersectionObserver(entries => {
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
})

for (let item of missionItems) {
    missionItemsObserver.observe(item);
}

const teamItems = document.querySelectorAll(".grid-team__item");

const teamItemsObserver = new IntersectionObserver(entries => {
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
})

for (let item of teamItems) {
    missionItemsObserver.observe(item);
}