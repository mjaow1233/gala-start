import clubEvents from "../utils/club-events.js";
import clubRatings from "../utils/ratings.js";

import { starSystem } from "../utils/ratings.js";

export default async function pianoClub() {
  const infoHTML = await clubEvents("5");
  const ratingHTML = await clubRatings("5");

  return `
    <section class="hero">
      <div class="hero-content">
    </section>

    <section class="event-info">
      <h3>Upcoming Events</h3>
      ${infoHTML}
    </section>

    <section class="event-ratings">
      <h3>Rate Our Events</h3>
      ${ratingHTML}
    </section>
  `;
}
