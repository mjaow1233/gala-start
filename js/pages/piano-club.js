export default async function pianoClub() {

  const events = await (await fetch("http://localhost:3000/events")).json();
  const filteredEvents = events
    .filter((event) => event.clubId === "5")
    .map(
      ({ date, name, description }) => `
      <article class="event-card">
        <h3>${name}</h3>
        <p class="date">${new Date(date).toLocaleDateString()}</p>
        <p>${description}</p>
      </article>
    `
    )
    .join("");

  return `
  <section class="hero">
    <div class="hero-content"></div>
  </section>

  <section class="event-info">
    <h3>Upcoming Events</h3>
    ${filteredEvents}
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