import start from './pages/start.js';
import jazzClub from './pages/jazz-club.js';
import hamzeClub from './pages/hamze-club.js';
import about from './pages/about.js';
import events from './pages/events.js';
import createEvent from './pages/create-event.js';
import clubs from './pages/clubs.js';
import bookEvent from './pages/book-event.js';


const isAdmin = true;

const Clubmenu = {
  "jazz-klubben": { label: 'Jazz-klubben', function: jazzClub },
  "hamze-klubben": { label: 'hamze-klubben', function: hamzeClub }


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
      <a href="#${urlHash}">${label}</a>
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

async function loadPageContent() {
  // if no hash redirect to #start
  if (location.hash === "") {
    location.replace("#start");
  }
  // add a class on body so that we can style differnt pages differently
  document.body.setAttribute("class", location.hash.slice(1));
  // get the correct function to run depending on location.hash
  const functionToRun = menu[location.hash.slice(1)].function;
  // run the function and expect it return a html string
  const html = await functionToRun();
  // replace the contents of the main element
  document.querySelector("main").innerHTML = html;
}

// call loadPageContent once on page load
loadPageContent();

// and then on every hash change of the url/location
window.onhashchange = loadPageContent;

// create the menu and display it
document.querySelector("header nav").innerHTML = createMenu();
