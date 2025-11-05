/*
import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function events() {
  const eventsHtml = await clubInfoAndEvents();

  return `
    <section class="hero">
      <img src="images/logo16.png" alt="HeroImage">
    </section>

    <section class="upcoming">
      <h2>Upcoming Events</h2>
      <div class="events-grid">
        ${eventsHtml}
      </div>
    </section>

    <section class="clubs">
      <a href="#jazz-klubben" class="club-btn">Jazz</a>
      <a href="#piano-klubben" class="club-btn">Piano Club</a>
      <a href="#add-club" class="club-btn add">+ Your Club</a>
    </section>
  `;
}
*/

import { getClubInfoAndEvents } from "../utils/club-info-and-events.js";

export default async function events() {
  // Hämta all event-DATA
  const allEvents = await getClubInfoAndEvents();

  // Bygg HTML-strängen manuellt
  const eventsHtml = allEvents
    .toSorted((a, b) => a.date > b.date ? 1 : -1)
    .map(event => `
      <article class="event-card">
        <h3>${event.name}</h3>
        <p>${new Date(event.date).toLocaleDateString('sv-SE')}</p>
      </article>
    `).join('');

  return `
    <section class="hero">
      <img src="httpsGala Emporium://via.placeholder.com/800x200?text=All+Events" alt="HeroImage">
    </section>

    <section class="upcoming">
      <h2>Upcoming Events</h2>
      <div class="events-grid">
        ${eventsHtml}
      </div>
    </section>

    <section class="clubs">
      <a href="#balett-klubben" class="club-btn">Balettklubben</a>
      <a href="#jazz-klubben" class="club-btn">Jazz</a>
      <a href="#metal-klubben" class="club-btn">Metal</a>
    </section>
  `;
}