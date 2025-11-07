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

   
    </section>
  `;
}
