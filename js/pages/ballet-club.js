/*
import { getClubInfoAndEvents, getClubDetails } from "../utils/club-info-and-events.js";
function addBookingListeners() {
  document.querySelectorAll('.book-ticket-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const eventId = e.target.dataset.eventId;
      alert(`Du försöker boka biljett till evenemang ${eventId}. Bokningssystemet är under utveckling.`);
    });
  });
}

export default async function balettKlubben() {
  const clubId = 'b1e2'; // Balettklubb ID

  const club = await getClubDetails(clubId);
  const events = await getClubInfoAndEvents(clubId);

  const getEventImagePath = (eventName) => {
    switch (eventName) {
      case 'Svansjön':
        return 'img/balett/svansjon.png';
      case 'Nötknäpparen':
        return 'img/balett/notknapparen.png';
      default:
        return 'https://via.placeholder.com/300x200?text=Balett+Event'; 
    }
  };

  let html = `
    <section class="club-hero">
      <div class="hero-content">
        <h1>${club.name}</h1>
        <p>${club.description}</p>
      </div>
      <div class="hero-image">
        <img src="img/balett/balett-hero.png" alt="Elegant balettdansare på scen">
      </div>
    </section>

    <section class="upcoming-events">
      <h2>Kommande Evenemang</h2>
      <div class="events-grid">
        ${events.map(event => `
          <article class="event-card">
            <div class="event-image">
              <img src="${getEventImagePath(event.name)}" alt="Bild för ${event.name}">
            </div>
            <div class="event-details">
              <h3>${event.name}</h3>
              <p class="event-date">${new Date(event.date).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              <p>${event.description}</p>
              <button class="book-ticket-button" data-event-id="${event.id}">Boka Biljett</button>
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="about-ballet">
      <h2>Vårt uppdrag</h2>
      <p>Balettklubben på Gala Emporium strävar efter att vara en mötesplats för alla som älskar dansens konstform. Vi presenterar ett brett spektrum av föreställningar, från klassiska mästerverk till nyskapande modern balett. Vår scen är en hyllning till gränslösa uttryck, precision och passion.</p>
      <p>Vi tror att balett är för alla och arbetar för att göra den tillgänglig och inspirerande. Kom och upplev magin i varje rörelse!</p>
    </section>
  `;

  setTimeout(addBookingListeners, 0); 
  
  return html;
}
*/
import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function balletclub() {
  return clubInfoAndEvents('b1e2');
}