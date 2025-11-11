import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function jazzClub() {
  const eventsHtml = await clubInfoAndEvents();

  return `
    <section class="hero">
      <video autoplay muted loop playsinline class="hero-video" id="heroVideo">
        <source src="videos/jazz.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>

    <section class="upcoming">
      <h2>Upcoming Events</h2>
      <div class="grid">
        ${eventsHtml}
      </div>
    </section>
  `;
}