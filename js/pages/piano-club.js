import clubEvents from "../utils/club-events.js";
import clubRatings from "../utils/ratings.js";

export default async function pianoClub() {
  const infoHTML = await clubEvents("5");
  const ratingHTML = await clubRatings("5");

  return `
    <section class="hero">
      <div class="hero-content"></div>
    </section>

      <section class="event-info">
        <h3>Upcoming Events</h3>
        ${infoHTML}
      </section>

      <section class="event-ratings">
        <h3>Rate Our Events</h3>
        ${ratingHTML}
      </section>

    <section class="about-club">
      <h3>About the Piano Club</h3>
      <div class="about-content">
        <p>
          The Piano Club is a dedicated community created exclusively for piano players.
          Whether you enjoy classical masterpieces, modern compositions, improvisation, or simply the joy of playing,
          this club brings pianists together to share their passion.
        </p>

        <p>
          Since 2012, we've provided a welcoming space where beginners, intermediate players,
          and advanced pianists can grow, exchange ideas, and support each other.
        </p>
      </div>
    </section>
  `;
}
