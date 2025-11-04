import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function start() {
  const eventsHtml = await clubInfoAndEvents();

  return `
    <section class="hero">
      <img src="images/logo5.png" alt="heroimage">
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