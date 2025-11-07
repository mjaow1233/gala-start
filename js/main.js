import start from './pages/start.js';
import jazzClub from './pages/jazz-club.js';
import hamzeClub from './pages/hamze-club.js';
import djClub from './pages/dj-club.js';
import pianoClub from './pages/piano-club.js';
import about from './pages/about.js';
import events from './pages/events.js';
import createEvent from './pages/create-event.js';
import clubs from './pages/clubs.js';
import bookEvent from './pages/book-event.js';
import balletClub from './pages/ballet-club.js';

const isAdmin = true;

const Clubmenu = {
  "jazz-klubben": { label: 'Jazz-klubben', function: jazzClub },
  "hamze-klubben": { label: 'Hamze-klubben', function: hamzeClub },
  "dj-klubben": { label: 'DJ-klubben', function: djClub },
  "piano-klubben": { label: 'Piano-klubben', function: pianoClub },
  "ballet-club": { label: 'Ballet-club', function: balletClub }


};
const menu = {
  "start": { label: 'Start', function: start },
  "about": { label: 'About', function: about },
  "events": { label: 'Events', function: events },
  "clubs": { label: 'Clubs', function: clubs },
  "bookEvent": { label: 'Book Event', function: bookEvent },
  "createEvent": { label: 'Create Event', function: createEvent, isAdminPage: true },
};
function createMenu() {

  return Object.entries(menu)
    .map(
      ([urlHash, { label, isAdminPage }]) => {
        if (isAdminPage && isAdmin) {
          return `
      <a href="#${urlHash}" class="${isAdminPage ? 'admin' : ''}">${label}</a>
    `

        }
        else if (!isAdminPage) {
          return `
      <a href="#${urlHash}">${label}</a>
    `
        }
      }
    )
    .join("");
}
//creates a new object that includes both your main pages and your club pages
const allRoutes = { ...menu, ...Clubmenu };

async function loadPageContent() {
  // if no hash redirect to #start
  if (location.hash === "") {
    location.replace("#start");
    return;
  }
  // add a class on body so that we can style differnt pages differently
  document.body.setAttribute("class", location.hash.slice(1));
  
  const route = allRoutes[location.hash.slice(1)];

  // get the correct function to run depending on location.hash
  if (!route) {
    document.querySelector("main").innerHTML = "<p>Page not found.</p>";
    return;
  }
  const functionToRun = route.function;

  const html = await functionToRun();
  // replace the contents of the main element
  document.querySelector("main").innerHTML = html;
  // if the page is bookEvent or createEvent, call updateEventDropdown after a short delay
  if (location.hash === "#bookEvent" || location.hash === "#createEvent") {
    setTimeout(() => {
      if (typeof updateEventDropdown === 'function') {
        updateEventDropdown();
      }
    }, 0);
  }
}

// call loadPageContent once on page load
loadPageContent();

// and then on every hash change of the url/location
window.onhashchange = loadPageContent;

// create the menu and display it
document.querySelector("header nav").innerHTML = createMenu();
