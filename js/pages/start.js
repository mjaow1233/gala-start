/*
import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function start() {
  const eventsHtml = await clubInfoAndEvents();

  return `
    <section class="hero">
      <img src="images/logo16.png" alt="HeroImage">
    </section>

    <section class="upcoming">
      <h2>Upcoming Events</h2>
      <div class="grid">
        ${eventsHtml}
      </div>
    </section>

    <section class="clubs">
      <a href="#jazz-klubben" class="club-button">Jazz</a>
      <a href="#piano-klubben" class="club-button">Piano Club</a>
      <a href="#add-club" class="club-button">+ Your Club</a>
    </section>
  `;
}
*/
import { getClubInfoAndEvents } from "../utils/club-info-and-events.js"; 

export default async function start() {
  // Hämta all event-DATA (inte HTML)
  const allEvents = await clubInfoAndEvents();

  // Bygg HTML-strängen manuellt
  const eventsHtml = allEvents
    .toSorted((a, b) => a.date > b.date ? 1 : -1) // Sortera efter datum
    .map(event => `
      <article class="event">
        <h3>${event.name} (${event.date})</h3>
        <p>${event.description}</p>
      </article>
    `).join('');

  return `
    <h1>Alla kommande events på Gala</h1>
    <p>Gala är en samlingsplats för olika musikklubbar.</p>
    ${eventsHtml}
  `;
}