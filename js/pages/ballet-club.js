function addBookingListeners() {
  document.querySelectorAll('.book-ticket-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const eventId = e.target.dataset.eventId;

      location.hash = "#bookEvent"; 

      alert(`Omdirigerar för att boka biljett till evenemang ${eventId}.`);
    });
  });
}


const getEventImagePath = (eventName) => {
  switch (eventName) {
    case 'Svansjön':

      return 'images/balett/svansjon.png';
    case 'Nötknäpparen':

      return 'images/balett/notknapparen.png';
    default:
      return 'https.via.placeholder.com/300x200?text=Balett+Event';
  }
};

export default async function balletClub() {
  const clubId = 'b1e2'; 


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
        <img src="images/balett/balett-hero.png" alt="Elegant balettdansare på scen">
      </div>
    </section>

    <section class="upcoming-events">
      <h2>Upcoming Events</h2>
      <div class="events-grid">
        ${events.map(event => `
          <article class="event-card">
            <div class="event-image">
              <img src="${getEventImagePath(event.name)}" alt="Bild för ${event.name}">
            </div>
            <div classevent-details">
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
      <h2>Our Mission</h2>
      <p>The Ballet Club at Gala Emporium strives to be a meeting place for all who love the art of dance. We present a wide spectrum of performances, from classical masterpieces to innovative modern ballet. Our stage is a celebration of boundless expression, precision, and passion.</p>
      <p>We believe ballet is for everyone and work to make it accessible and inspiring. Come and experience the magic in every movement!</p>
    </section>
  `;

  setTimeout(addBookingListeners, 0); 
  
  return html;
}