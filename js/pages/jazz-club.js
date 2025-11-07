import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function jazzClub() {
  return `
    <section class="hero">
      <img src="images/jazz.png" alt="HeroImage">
    </section>

    <section class="upcoming">
      <h2>Upcoming Events</h2>
      <div class="grid">
        ${eventsHtml}
      </div>
    </section>

    <section class="clublinks">
      <a href="#jazz-klubben" class="club-button">Jazz</a>
      <a href="#piano-klubben" class="club-button">Piano Club</a>
      <a href="#add-club" class="club-button">+ Your Club</a>
    </section>
  `;
}
