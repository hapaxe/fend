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
  const res = Array.from(sections).find(isElementInViewport);
  if (res == null) {
    // in case no section is completely in viewport, only the last one will be relevant.
    return Array.from(sections)[sections.length - 1];
  }
  else {
    return res;
  }
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
let isStillScrolling= false;

runAfterScroll = function() {
  newSection = checkVisible(sections);
  currentSection.classList.remove("your-active-class");
  newSection.classList.add("your-active-class");
  currentSection = newSection;

  Array.from(navbar.children).forEach((item) => {
    if (item.children[0].innerHTML == currentSection.dataset.nav) {
      item.classList.add("active");
    }
    else {
      item.classList.remove("active");
    }
  });
}

// in order to prevent the page to be repainted in the middle of a scroll,
// we setup a timeout before executing the update.
// we also need to clear the timeout function when scroll is running.
var isScrolling;

window.addEventListener('scroll', function(e) {
    window.clearTimeout( isScrolling );
    isScrolling = setTimeout(runAfterScroll, 66);

});
