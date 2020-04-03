/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/



function createLink(item){
  a = document.createElement('a');
  a.href =  '#' + item.id;
  a.innerHTML = item.dataset.nav;
  a.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
  return a;
}

function isElementInViewport (element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0
    );
}

function checkVisible(sections) {
  return Array.from(sections).find(isElementInViewport);

}

const sections = document.querySelectorAll('section');
const navbar = document.getElementById("navbar__list");

sections.forEach((item, i) => {
  const node = document.createElement("li");
  a = createLink(item);
  node.appendChild(a);
  navbar.appendChild(node);
});

let currentSection = sections[0];

window.addEventListener('scroll', function(e) {
    newSection = checkVisible(sections);
    currentSection.classList.remove("your-active-class");
    newSection.classList.add("your-active-class");
    currentSection = newSection;
});
