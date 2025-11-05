// js/pages/balett-klubben.js
import { getClubInfoAndEvents } from "../utils/club-info-and-events.js"; // Ändra importen
import { getClubDetails } from "../utils/club-info-and-events.js"; // Ny import för klubbdetaljer

export default async function balettKlubben() {
  const clubId = 'b1e2'; // Ditt Balettklubb ID

  // Hämta klubbens information (beskrivning, namn etc.)
  const club = await getClubDetails(clubId); // Använd den nya funktionen

  // Hämta evenemang för Balettklubben
  const events = await getClubInfoAndEvents(clubId);

  // Skapa sidans HTML-struktur
  let html = `
    <section class="club-hero">
      <div class="hero-content">
        <h1>${club.name}</h1>
        <p>${club.description}</p>
      </div>
      <div class="hero-image">
        <img src="https://via.placeholder.com/1200x400?text=Balett+Hero+Image" alt="Elegant balettdansare på scen">
      </div>
    </section>

    <section class="upcoming-events">
      <h2>Kommande Evenemang</h2>
      <div class="events-grid">
        ${events.map(event => `
          <article class="event-card">
            <div class="event-image">
              <img src="https://via.placeholder.com/300x200?text=${event.name.replace(/\s/g, '+')}" alt="Bild för ${event.name}">
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

  document.querySelector('main').innerHTML = html; // Rendera HTML till main-elementet

  // Lägg till eventlyssnare för bokningsknapparna
  document.querySelectorAll('.book-ticket-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const eventId = e.target.dataset.eventId;
      alert(`Du försöker boka biljett till evenemang ${eventId}. Bokningssystemet är under utveckling.`);
      // Här kan ni implementera den faktiska bokningslogiken senare
    });
  });
}