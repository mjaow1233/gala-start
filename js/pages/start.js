/*
import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function start() {
  const eventHtml = await clubInfoAndEvents();
  return `
    <h1>Alla kommande events på Gala</h1>
    <p>Gala är en samlingsplats för olika musikklubbar.</p>
    ${eventHtml}
  `;
}
*/
import { getClubInfoAndEvents } from "../utils/club-info-and-events.js"; 

export default async function start() {
  // Hämta all event-DATA (inte HTML)
  const allEvents = await getClubInfoAndEvents();

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