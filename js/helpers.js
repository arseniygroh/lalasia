export function initMenu() {
    const menuBtn = document.querySelector(".icon-menu");
    if (!menuBtn) return;
    menuBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("open-menu");
    });
}

export function initFadeInObserver() {
    const elementsToAnim = document.querySelectorAll(".fade-in");
  
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          if (el.classList.contains("hero__image")) {
            el.classList.add("show-image");
          }
          el.classList.add("visible");
        } else {
          el.classList.remove("visible");
          if (el.classList.contains("hero__image")) {
            el.classList.remove("show-image");
          }
        }
      });
    });
  
  elementsToAnim.forEach((el) => fadeInObserver.observe(el));
}

export function initAccordion() {
  const mobileBreakPoint = 767.98;
  const footerCategories = document.querySelectorAll(".footer__category");
  let listenersAttached = false; 
  function accordion() {
      if (window.innerWidth <= mobileBreakPoint) {
          footerCategories.forEach((btn) => {
              btn.classList.add("show-category-arrow");

              if (!listenersAttached) {
                  btn.addEventListener("click", function (e) {
                      const clickedBtn = e.currentTarget; 
                      footerCategories.forEach(otherBtn => {
                          const otherContent = otherBtn.nextElementSibling;
                          if (otherBtn !== clickedBtn) {
                              otherBtn.classList.remove("active-category-arrow");
                              if (otherContent) {
                                  otherContent.style.maxHeight = null;
                              }
                          }
                      });

                      clickedBtn.classList.toggle("active-category-arrow");
                      const listToShow = clickedBtn.nextElementSibling;

                      if (listToShow) {
                          if (listToShow.style.maxHeight) {
                              listToShow.style.maxHeight = null;
                          } else {
                              listToShow.style.maxHeight = listToShow.scrollHeight + "px";
                          }
                      }
                  });
              }
          });
          listenersAttached = true;
      } else {
          footerCategories.forEach(item => {
              item.classList.remove("show-category-arrow", "active-category-arrow");
              const content = item.nextElementSibling;
              if (content) {
                  content.style.maxHeight = null;
              }
          });
      }
  }

  window.addEventListener("resize", accordion);
  window.addEventListener("load", accordion);
}

export function initCountingAnimation({
  selector,
  interval = 5000,
  threshold = 1
}) {
  const valueDisplays = document.querySelectorAll(selector);

  if (!valueDisplays.length) return;

  function countingAnimation() {
      valueDisplays.forEach((valueDisplay, index) => {
          let start = 0;
          let end = parseInt(valueDisplay.getAttribute("data-val"));
          if (isNaN(end) || end <= 0) return;

          let duration = Math.floor(interval / end);
          let counter = setInterval(() => {
              start++;
              if (index === 0 || index === valueDisplays.length - 1) {
                  valueDisplay.textContent = start + "+";
              } else {
                  valueDisplay.textContent = start;
              }
              if (start === end) {
                  clearInterval(counter);
              }
          }, duration);
      });
  }

  const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
          countingAnimation();
          observer.disconnect();
      }
  }, {
      threshold: threshold
  });

  observer.observe(valueDisplays[0]);
}

