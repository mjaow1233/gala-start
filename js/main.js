import start from './pages/start.js';
import jazzClub from './pages/jazz-club.js';
import hamzeClub from './pages/hamze-club.js';
import about from './pages/about.js';
import events from './pages/events.js';
import createEvent from './pages/create-event.js';
import clubs from './pages/clubs.js';
import bookEvent from './pages/book-event.js';
import balettKlubben from './pages/balett-klubben.js';
import pianoClub from './pages/piano-club.js';
import djClub from './pages/dj-club.js';


const isAdmin = true;

const Clubmenu = {
  "jazz-klubben": { label: 'Jazz-klubben', function: jazzClub },
  "hamze-klubben": { label: 'hamze-klubben', function: hamzeClub },
  "piano-klubben": { label: 'Piano-klubben', function: pianoClub },
  "dj-klubben": { label: 'DJ-klubben', function: djClub },
  "balett-klubben": { label: 'Balettklubben', function: balettKlubben }
};

const menu = {
  "start": { label: 'Start', function: start },
  "about": { label: 'About', function: about },
  "events": { label: 'Events', function: events },
  "clubs": { label: 'Clubs', function: clubs },
  "bookEvent": { label: 'Book Event', function: bookEvent },
  "createEvent": { label: 'Create Event', function: createEvent, isAdminPage: true },
  
  ...Clubmenu 
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
  if (location.hash === "") {
    location.replace("#start");
  }
  document.body.setAttribute("class", location.hash.slice(1));

  const page = menu[location.hash.slice(1)];
  if (!page) {
    document.querySelector("main").innerHTML = "<h2>404 - Sidan finns inte</h2>";
    console.warn(`Ingen funktion hittades för hash: ${location.hash}`);
    return;
  }

  const functionToRun = page.function;
  const html = await functionToRun();
  document.querySelector("main").innerHTML = html;
}

window.onhashchange = loadPageContent;
loadPageContent();

document.querySelector("header nav").innerHTML = createMenu();