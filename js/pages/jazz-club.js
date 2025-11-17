export default async function jazzClub() {
  const res = await fetch("http://localhost:3000/events");
  const events = await res.json();

  const filteredEvents = events
    .filter(event => event.clubId === "1")
    .map(({ date, name, description }) => `
      <article class="jazzevents">
        <h3>${name}</h3>
        <p class="date">${new Date(date).toLocaleDateString()}</p>
        <p>${description}</p>
      </article>
    `)
    .join("");

  return `
    <section class="hero">
      <video autoplay muted loop playsinline class="hero-video" id="heroVideo">
        <source src="videos/jazz4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>

    <div class="jazz-wrapper">
      <section class="jazzevents">
        <h3>Upcoming events</h3>
        <div class="events-grid">${filteredEvents}</div>
      </section>

      <section class="jazzabout">
        <h3>About the jazz club</h3>
        <p>Welcome to the jazz club. Lorem ipsum ipsum lorem and all that.Lorem ipsum ipsum lorem and all thatLorem ipsum ipsum lorem and all thatLorem ipsum ipsum lorem and all that</p>

          <section class="jazzimage">
      <img src="images/jazz5.png" alt="JazzBand">
    </section>
      </section>
    </div>
  `;
}