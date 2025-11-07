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

    <section class="clublinks">
    </section>
  `;
}