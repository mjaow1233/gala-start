import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function operaClub() {
  return clubInfoAndEvents("7");
}

// opera-club.js

function addBookingListeners() {
  document.querySelectorAll('.book-ticket-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const eventId = e.target.dataset.eventId;
      location.hash = "#bookEvent";
      alert(`Omdirigerar till biljettbokning för evenemang ${eventId}.`);
    });
  });
}

const getEventImagePath = (eventName) => {
  switch (eventName) {
    case 'La Traviata':
      return 'images/opera/la-traviata.jpg';
    case 'Carmen':
      return 'images/opera/carmen.jpg';
    case 'The Magic Flute':
      return 'images/opera/trollflöjten.jpg';
    default:
      return 'https://via.placeholder.com/300x200?text=Opera+Event';
  }
};

export default async function operaClub() {
  const clubId = 'o1a9'; // ID i db.json för opera-klubben

  try {
    const clubRes = await fetch(`http://localhost:3000/clubs/${clubId}`);
    const club = await clubRes.json();

    const eventsRes = await fetch(`http://localhost:3000/events?clubId=${clubId}`);
    const events = await eventsRes.json();

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    let html = `
      <section class="club-hero">
        <div class="hero-content">
          <h1>${club.name}</h1>
          <p>${club.description}</p>
        </div>
        <div class="hero-image">
          <img src="images/opera/opera-hero.jpg" alt="Operasångare på scen under föreställning">
        </div>
      </section>

      <section class="upcoming-events">
        <h2>Kommande Föreställningar</h2>
        <div class="events-grid">
          ${events.map(event => `
            <article class="event-card">
              <div class="event-image">
                <img src="${getEventImagePath(event.name)}" alt="Affisch för ${event.name}">
              </div>
              <div class="event-details">
                <h3>${event.name}</h3>
                <p class="event-date">
                  ${new Date(event.date).toLocaleDateString('sv-SE', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </p>
                <p>${event.description}</p>
                <button class="book-ticket-button" data-event-id="${event.id}">Boka biljett</button>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="about-opera">
        <h2>Om Operaklubben</h2>
        <p>Operaklubben på Gala Emporium är en hyllning till dramat, rösten och känslan. 
        Här möts klassiska mästerverk och nyskapande föreställningar i en värld av passion och elegans.</p>
        <p>Vårt mål är att förena tradition och innovation – att öppna dörren till operans magi för både erfarna besökare och nyfikna nybörjare.</p>
        <p>Upplev storslagna kvällar fyllda med musik, känslor och skönhet!</p>
      </section>
    `;

    setTimeout(addBookingListeners, 0);
    document.body.className = "opera-club"; // för CSS-temat
    return html;

  } catch (err) {
    console.error("Fel vid laddning av Opera Club:", err);
    return `<p>Kunde inte ladda Operaklubben just nu.</p>`;
  }
}

