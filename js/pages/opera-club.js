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
    case 'Opera Gala Night': 
      return 'images/Opera Gala Night.jpg'; 
    default:
      return 'https://via.placeholder.com/300x200?text=Opera+Event';
  }
};
 
export default async function operaClub() {
  const clubId = '7'; // ID i db.json för opera-klubben
 
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
<img src="images/Opera Club.jpg" alt="Operasångare på scen under föreställning">
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
<p>The Opera Club at Gala Emporium is a celebration of drama, voice and emotion. 
Here, classic masterpieces and innovative performances meet in a world of passion and elegance.</p>
<p>Our goal is to unite tradition and innovation – to open the door to the magic of opera for both experienced visitors and curious beginners.</p>
<p>Experience magnificent evenings filled with music, emotions and beauty!</p>
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
