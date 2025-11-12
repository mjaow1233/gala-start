// Funktion för länk som hanterar biljettbokning
function addBookingListeners() {
  document.querySelectorAll('.book-ticket-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const eventId = e.target.dataset.eventId;
      location.hash = "#bookEvent";
      alert(`Omdirigerar till biljettbokning för evenemang ${eventId}.`);
    });
  });
}

const getEventImagePath = (eventName) => {  // Funktion för att hämta bildväg baserat på evenemangsnamn
  switch (eventName) {
    case 'Opera Gala Night':
      return 'images/Opera Gala Night.png';
    default:
      return 'https://via.placeholder.com/300x200?text=Opera+Event';
  }
};
 // Huvudfunktion för Opera Club-sidan
export default async function operaClub() {
  const clubId = '7';
 
  try {   // Hämtar klubb- och evenemangsdata från servern
    const clubRes = await fetch(`http://localhost:3000/clubs/${clubId}`);
    const club = await clubRes.json();
 
    const eventsRes = await fetch(`http://localhost:3000/events?clubId=${clubId}`);
    const events = await eventsRes.json();
 
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
 
    let html = `  
<section class="club-hero">  
<div class="hero-image">
<img src="images/Opera Club.png" alt="Opera Club Logotyp">
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
<h2>About Opera Club</h2>
<p>The Opera Club at Gala Emporium is a celebration of drama, voice and emotion.
Here, classic masterpieces and innovative performances meet in a world of passion and elegance.</p>
<p>Our goal is to unite tradition and innovation to open the door to the magic of opera for both experienced visitors and curious beginners.</p>
<p>Experience magnificent evenings filled with music, emotions and beauty!</p>
</section>
    `;
 
    setTimeout(addBookingListeners, 0); // Lägg till lyssnare för bokningsknappar efter att HTML har renderats
    document.body.className = "opera-club";
    return html;
 
  } catch (err) {
    console.error("Fel vid laddning av Opera Club:", err);
    return `<p>Kunde inte ladda Operaklubben just nu.</p>`;
  }
}