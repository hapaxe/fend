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


/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
// search all sections and add them to the navbar__list
const sections = document.querySelectorAll('section');
const navbar = document.getElementById("navbar__list");
sections.forEach((item, i) => {
  const node = document.createElement("li");
  a = createLink(item);
  node.appendChild(a);
  navbar.appendChild(node);

});

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



// Add class 'active' to section when near top of viewport


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
